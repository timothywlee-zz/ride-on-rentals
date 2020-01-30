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
    console.log('userId: ', this.context.user.userId);
    this.setState({ userId });
    this.getCarOverview();
  }

  getCarOverview() {
    const { id } = this.props.match.params;
    console.log('carId: ', id);
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
    const { carId, total, startDate, endDate } = this.state;
    console.log(this.state);
    fetch('/api/rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ carId, total, startDate, endDate })
    })
      .then(response => response.json())
      .then(data => { console.log('data: ', data); })
      .catch(err => console.error(err));
  }

  handleChangeStart(date) {
    this.setState(
      {
        startDate: date
      },
      () => this.calculateDaysLeft()
    );
    console.log('startDate: ', this.state.startDate);
  }

  handleChangeEnd(date) {
    this.setState(
      {
        endDate: date
      },
      () => this.calculateDaysLeft()
    );
    console.log('endDate: ', this.state.endDate);
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
        <div className="row text-white bg-dark mt-5">
          <h6
            className="reservation-opener text-center col-12"
            style={{ color: 'white' }}>
            Book Your Reservation, {userId.firstName}!
          </h6>
        </div>
        <form className="date-form" onSubmit={this.submitreservationInformation}>
          <div className="date-row"> Choose Your Date!</div>
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
                minDate={moment().toDate()}
                placeholderText="Select a day"
              />
            </div>
          </div>
          <div className="rectangle">
            <h4 className="vehicle-overview text-center ">Vehicle Overview</h4>
            <div className="vehicle">
              <img src={car.image} className="img-fluid"
                style={{
                  objectFit: 'cover'
                }} />
            </div>
            <h6 className="vehicle-name text-center" value={carId} onChange={this.reservationInput}>{car.make}</h6>
            <h4 className="rates">Rates</h4>
            <h6 className="rates-per-day">${car.rate}/day</h6>
            <h6 className="estimated-days">Number of day(s):{daysLeft}</h6>
            <h6 className="estimated-rates" value={total} onChange={this.reservationInput}>Total: ${rate}</h6>
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
                      className='d-flex justify-content-center align-items-center border'
                      style={{ height: '50px' }}>
                      <h2
                        className='modalCarMake border'
                        style={{ height: '40px' }}>{car.make}</h2>
                    </div>
                    <div className='d-flex flex-row'>
                      <div className='d-flex flex-column justify-content-center'>
                        <h5 className='border'>{firstName} {lastName}</h5>
                        <h6 className='border'>Start Date: {startDate.toLocaleDateString()}</h6>
                        <h6 className='border'>End Date: {endDate.toLocaleDateString()} </h6>
                      </div>
                      <div >
                        <img
                          className='shadow-md'
                          style={{ objectFit: 'contain', height: '200px', width: '200px' }}
                          src={car.image} />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className='d-flex align-items-center'>
                <h3 className='modalTotal border mr-1'>Total: ${rate} </h3>
                <Button color='danger' onClick={this.submitReservationInformation}> CONFIRM </Button>
              </ModalFooter>
            </Modal>
          </div>
        </form>
      </div>
    ;
  }
}

Reservation.contextType = AppContext;
