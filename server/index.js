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
    const dbRentalsColumns = ['rentalId', 'userId', 'carId', 'total', 'startDate', 'endDate'];
    const dbCarsColumns = ['make', 'availability', 'image'];
    const userId = [req.session.userId];
    const sql = format(`
        SELECT "r".%I,
               "c".%I
          FROM "cars" as "c"
          JOIN "rentals" as "r" using (%I)
         WHERE "r".%I = %L;`,
    dbRentalsColumns, dbCarsColumns, 'carId', 'userId', userId
    );

    db.query(sql)
      .then(result => {
        const userRentals = [];
        userRentals.push(result.rows);
        res.status(200).json(userRentals);
      })
      .catch(err => next(err));
  } else {
    throw (new ClientError(`Cannot find ${userId} in database`, 400));
  }
});

app.post('/api/users', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName && lastName && email && password) {
    const dbColumns = ['firstName', 'lastName', 'email', 'password'];
    const accountDetails = [firstName, lastName, email, password];
    const sql = format(`
         INSERT INTO %I (%I)
              VALUES (%L)
           RETURNING "userId";`,
    'users', dbColumns, accountDetails
    );
    db.query(sql)
      .then(result => {
        if (!result.rows[0]) {
          next(new ClientError('Cannot find the created account details'), 404);
        } else {
          return res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => next(err));
  } else {
    throw (new ClientError(`Cannot find all of ${firstName}, ${lastName}, ${email}, and ${password} in database`, 400));
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
