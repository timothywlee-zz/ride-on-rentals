import React from 'react';

function RentalListItem(props) {
  const date = new Date(props.startDate);
  const availability = props.availability ? 'Available' : 'Unavailable';
  const buttonState = () => {
    return props.availability
      ? <button
        style={{ width: '100%', fontSize: '.85em' }}
        onClick={() => props.history.push(`/cars/${props.carId}`)}
        className="btn btn-sm btn-outline-secondary">
        BOOK AGAIN
      </button>
      : <button
        style={{ width: '100%', fontSize: '.85em' }}
        onClick={() => props.history.push('/cars')}
        className="btn btn-sm btn-outline-secondary">
        AVAILABLE CARS
      </button>;
  };
  return (
    <div className="card p-1 mb-2">
      <div className="row">
        <img
          src={props.image}
          className="col-7 px-1"
          style={{ objectFit: 'contain' }}/>
        <div className="col-5 px-1">
          <div className="p-1 text-center">
            <div className="card-title">
              {props.make}
            </div>
            <div className="card-text">
              Date Rented: {date.toLocaleDateString()}
            </div>
            <div className="card-text">
              Status:
              <p
                style={props.availability ? { color: 'green' } : { color: 'red' }}>
                {availability}
              </p>
            </div>
            {buttonState()}
          </div>
        </div>
      </div>
    </div>
  );
}

class PastRentals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentals: [
        {
          availability: true,
          carId: 1,
          endDate: '2020-01-10T20:00:00.000Z',
          image: '/images/porsche-918.jpg',
          make: 'Porsche 918',
          rentalId: 4,
          startDate: '2020-01-08T20:00:00.000Z',
          total: 2000,
          userId: 13
        },
        {
          availability: false,
          carId: 3,
          endDate: '2020-01-21T20:00:00.000Z',
          image: '/images/pagani-huayra.jpg',
          make: 'Pagani Huayra',
          rentalId: 5,
          startDate: '2020-01-20T20:00:00.000Z',
          total: 2000,
          userId: 13
        },
        {
          availability: false,
          carId: 5,
          endDate: '2020-01-27T20:00:00.000Z',
          image: '/images/ford-gt.jpg',
          make: 'Ford GT',
          rentalId: 6,
          startDate: '2020-01-25T20:00:00.000Z',
          total: 2000,
          userId: 13
        }
      ]
    };
  }

  componentDidMount() {
    // fetch('/api/rentals')
    //   .then(res => res.json())
    //   .then(rentals => this.setState({ rentals }))
    //   .catch(err => console.error(err));
  }

  displayPastRentals() {
    const { rentals } = this.state;
    return rentals.length === 0
      ? <h4>No rental history found</h4>
      : rentals.map(car => {
        return <RentalListItem key={car.carId} history={this.props.history} {...car} />;
      });
  }

  render() {
    return (
      <div className="container">
        {this.displayPastRentals()}
      </div>
    );
  }
}

export default PastRentals;
