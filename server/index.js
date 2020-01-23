require('dotenv/config');
const express = require('express');

const db = require('./database');
const format = require('pg-format');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/cars', (req, res, next) => {
  const { category, orderBy } = req.query;
  if (category && !orderBy) {
    const sql = format(
      'select * from %I where %I = %L;',
      'cars', 'category', category
    );
    db.query(sql)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  } else if (!category && orderBy) {
    const sql = format(
      'select * from %I order by %I desc;',
      'cars', orderBy
    );
    db.query(sql)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  } else if (category && orderBy) {
    const sql = format(
      'select * from "cars" where "category" = %L order by %I desc;',
      category, orderBy
    );
    db.query(sql)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  } else {
    const sql = 'select * from "cars";';
    db.query(sql)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  }
});

app.get('/api/cars/:carId', (req, res, next) => {
  const { carId } = req.params;
  const idIsValid = typeof parseInt(carId) === 'number' && carId > 0;
  if (idIsValid) {
    const sql = format(
      'select * from %I where %I = %L;',
      'cars', 'carId', carId
    );
    db.query(sql)
      .then(result => {
        const car = result.rows[0];
        if (!car) {
          return Promise.reject(new ClientError(`Cannot find a car with Id ${carId}`, 404));
        }
        return res.status(200).json(car);
      })
      .catch(err => next(err));
  } else {
    return next(new ClientError('Id must be a positive integer.', 400));
  }
});

app.get('/api/rentals', (req, res, next) => {
  const { userId } = req.session;

  if (userId) {
    const pastRentalSql = `
      SELECT "p"."rentalId",
            "p"."userId",
            "p"."carId",
            "p"."total",
            "p"."startDate",
            "p"."endDate",
            "c"."make",
            "c"."availability",
            "c"."image"
        FROM "cars" as "c"
        JOIN "rentals" as "p" using ("cartId")
      WHERE "p"."userId" = $1
    `;
    const params = [userId];

    db.query(pastRentalSql, params)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  } else {
    throw (new ClientError(`Cannot find ${userId} in database`, 400));
  }
});

app.post('/api/rentals', (req, res, next) => {
  const { userId } = req.session;
  const { carId, total, startDate, endDate } = req.body;
  if (!userId) {
    throw new ClientError('User must have a valid Id to make a reservation.', 400);
  } else if (!carId || !total || !startDate || !endDate) {
    throw new ClientError('User must fill all available fields to make a reservation.', 400);
  } else {
    const columns = ['rentalId', 'userId', 'carId', 'total', 'startDate', 'endDate'];
    const values = [userId, carId, total, startDate, endDate];
    const sql = format(`
      insert into %I (%I)
      values (default, %L)
      returning *;`,
    'rentals', columns, values
    );
    db.query(sql)
      .then(response => {
        res.status(201).json(response.rows[0]);
      })
      .catch(err => next(err));
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
