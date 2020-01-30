import React from 'react';
import { Link } from 'react-router-dom';
import Header from './header';
import AppContext from '../lib/context';

class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { car: null, video: false };
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    const { id } = this.props.match.params;
    fetch(`/api/cars/${id}`)
      .then(res => res.json())
      .then(car => this.setState({ car }))
      .catch(err => console.error(err));
  }

  viewVideo() {
    const { video, car } = this.state;
    return !video
      ? <img
        src={car.image}
        className="img-fluid list-img"
        style={{ objectFit: 'cover' }}
      />
      : <div className="iframe-container controls" >
        <iframe
          src={car.video}>
        </iframe>
      </div>;
  }

  render() {
    const { car } = this.state;
    return !car
      ? <div>Loading...</div>
      : <div
        style={{ paddingTop: '2.9em' }}
        className="container bg-list px-0">
        <Header
          user={true}
          back={true}
          linkTo={'/cars'}
          title={this.state.car.make}
          history={this.props.history}/>
        <div
          className="d-flex flex-column justify-content-center"
          style={{ minHeight: '17em', background: 'black' }}>
          {this.viewVideo()}
        </div>
        <div
          style={{ borderRadius: '.25em' }}
          className="card m-3 card-filter">
          <div className="card-body">
            <div
              style={{ fontSize: '1.1rem' }}
              className="my-2">
              <p
                style={{ fontSize: '1.25rem' }}
                className="card-title">{car.availability ? 'Available' : 'Unavailable'}</p>
              <p className="card-text">{car.shortDescription}</p>
            </div>
            <div
              className="mt-2"
              style={{ fontSize: '1.15rem' }}>
              <div className="d-flex row">
                <div className="col-6 px-0">
                  <p className="card-text">Top Speed:</p>
                  <p className="card-text">Horse Power:</p>
                  <p className="card-text">Rate:</p>
                </div>
                <div className="col-6 text-right px-0">
                  <p className="card-text">{car.topSpeed} mph</p>
                  <p className="card-text">{car.horsePower} BHP</p>
                  <p className="card-text">${car.rate} / day</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-center mt-2" >
              <div
                className="btn-group text-center mb-2">
                <button
                  type="button"
                  className="btn btn-outline-dark mr-1">
                  <Link
                    to="/cars"
                    style={{ color: 'inherit' }}>
                    Back
                  </Link>
                </button>
                <button
                  type="button"
                  style={
                    !this.context.user
                      ? { pointerEvents: 'none' }
                      : {}
                  }
                  className={`btn ${this.context.user ? 'btn-outline-dark' : 'btn-outline-danger'}`}>
                  <Link
                    style={{ color: 'inherit' }}
                    to={`/cars/reservations/${car.carId}`}>
                    Book Now
                  </Link>
                </button>
                <button
                  type="button"
                  onClick={() => this.setState({ video: !this.state.video })}
                  className="btn btn-outline-dark ml-1">
                  {this.state.video ? 'Image' : 'Video'}
                </button>
              </div>
              <p className={this.context.user ? 'd-none' : 'card-text'}>Please login to make a reservation</p>
            </div>
          </div>
        </div>
      </div>;
  }
}

CarDetails.contextType = AppContext;

export default CarDetails;
