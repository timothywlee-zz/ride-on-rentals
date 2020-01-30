/* eslint-disable no-console */

import React from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppContext from '../lib/context';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Header from './header';
import { Link } from 'react-router-dom';

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      carId: '',
      total: '',
      startDate: new Date(),
      endDate: new Date(),
      car: [],
      modal: false,
      fade: true

    };
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.reservationInput = this.reservationInput.bind(this);
    this.submitReservationInformation = this.submitReservationInformation.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
  }

  componentDidMount() {
    const { userId } = this.context.user;
    this.setState({ userId });
    this.getCarOverview();
  }

  getCarOverview() {
    const { id } = this.props.match.params;
    fetch(`/api/cars/${id}`)
      .then(res => res.json())
      .then(car => this.setState({ car, carId: car.carId }))
      .catch(err => console.error(err));
  }

  reservationInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitReservationInformation() {
    event.preventDefault();
    const { carId, car, startDate, endDate } = this.state;
    const total = this.calculateDaysLeft(startDate, endDate) * car.rate;
    fetch('/api/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carId, total, startDate, endDate })
    })
      .then(response => response.json())
      .then(data => this.toggleClickHandler())
      .catch(err => console.error(err));
  }

  handleChangeStart(date) {
    this.setState(
      {
        startDate: date
      },
      () => this.calculateDaysLeft()
    );
  }

  handleChangeEnd(date) {
    this.setState(
      {
        endDate: date
      },
      () => this.calculateDaysLeft()
    );
  }

  calculateDaysLeft(startDate, endDate) {
    if (!moment.isMoment(startDate)) startDate = moment(startDate);
    if (!moment.isMoment(endDate)) endDate = moment(endDate);

    return endDate.diff(startDate, 'days');
  }

  calculateTotal() {
    const { startDate, endDate, car } = this.state;
    const daysLeft = this.calculateDaysLeft(startDate, endDate);
    const rate = daysLeft * car.rate;
    this.setState({
      total: rate
    });
  }

  // handleChangeTotal(total) {
  //   this.setState(
  //     {
  //       total: rate
  //     },
  //     () => this.calculateTotal()
  //   );
  //   console.log('endDate: ', this.state.endDate);

  // }

  toggleClickHandler() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade
    });
  }

  render() {
    const { userId, carId, total, startDate, endDate, car, modal, fade } = this.state;
    const { firstName, lastName } = this.context.user;
    const daysLeft = this.calculateDaysLeft(startDate, endDate);
    const rate = daysLeft * car.rate;
    return !userId
      ? <div>Loading...</div>
      : <div className="container bg-list">
        <Header
          title={'Reservation'}
          back={true}
          user={true}
          history={this.props.history}
          linkTo={`/cars/${carId}`}
        />
        <div className="row text-white bg-dark mt-5">
        </div>
        <form className="card" onSubmit={this.submitreservationInformation}>
          <div className="rectangle">
            <h4 className="vehicle-overview text-center ">Vehicle Overview</h4>
            <div className="vehicle">
              <img src={car.image} className="img-fluid card-top"
                style={{
                  objectFit: 'cover'
                }} />
            </div>
            <div className="card-container">
              <h6 className="vehicle-name text-center" value={carId} onChange={this.reservationInput}>{car.make}</h6>
              <div className="date-row"> Choose Your Date!</div>
              <h4 className="rates">Rates</h4>
              <h6 className="rates-per-day">${car.rate}/day</h6>
              <h6 className="estimated-days">Number of day(s):{daysLeft || 0} </h6>
              <h6 className="estimated-rates" value={total} onChange={this.reservationInput}>Total: ${rate || 0}</h6>
            </div>
          </div>
          <div className="date-pickers col">
            <div>
              <b>Start Date</b>:
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeStart}
                minDate={moment().toDate()}
                placeholderText="Select a day"
              />
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <b>End Date</b>:
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChangeEnd}
                minDate={this.state.startDate}
                placeholderText="Select a day"
              />
            </div>
          </div>

          <div className="col-md-4 text-center fixed-bottom mb-5">
            <div className="btn btn-secondary btn-sm" value="submit" onClick={this.toggleClickHandler}>Reserve Now</div>
            <Modal
              isOpen={modal}
              toggle={this.toggleClickHandler}
              fade={fade}
              centered>
              <ModalHeader toggle={this.toggleClickHandler}> Confirm Your Reservation </ModalHeader>
              <ModalBody>
                <div className='infoContainer d-flex flex-row'>
                  <div className='d-flex flex-column'>
                    <div
                      className='d-flex justify-content-center align-items-center'
                      style={{ height: '50px' }}>
                      <h2
                        className='modalCarMake'
                        style={{ height: '40px' }}>{car.make}</h2>
                    </div>
                    <div className='d-flex flex-row'>
                      <div className='d-flex flex-column justify-content-center'>
                        <h5>{firstName} {lastName}</h5>
                        <h6>Start Date: {startDate.toLocaleDateString()}</h6>
                        <h6>End Date: {endDate.toLocaleDateString()} </h6>
                      </div>
                      <div className='shadow-sm rounded'>
                        <img
                          style={{ objectFit: 'contain', height: '175px', width: '200px' }}
                          src={car.image} />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className='d-flex align-items-center' style={{ borderTop: 'none' }}>
                <h4 className='modalTotal mr-1'>Total: ${rate} </h4>
                <Link to={'/'}>
                  <Button color='danger' onClick={this.submitReservationInformation}> CONFIRM </Button>
                </Link>
              </ModalFooter>
            </Modal>
          </div>
        </form>
      </div>
    ;
  }
}

Reservation.contextType = AppContext;
