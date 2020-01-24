/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import CarListItem from './car-list-item';

export default class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    fetch('/api/cars')
      .then(response => response.json())
      .then(cars => {
        this.setState({ cars });
      })
      .catch(error => console.error(error));
  }

  displayCars() {
    const { cars } = this.state;
    return cars.map(car => {
      return <CarListItem key={car.carId} {...car}/>;
    });
  }

  render() {
    return (
      <div className="container-fluid mt-5 px-0"
        style={{ height: '90vh', overflow: 'auto' }}>
        <div className="container flex-column px-2">
          {this.displayCars()}
        </div>
      </div>
    );
  }
}
