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
import Header from './header';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      orderBy: ''
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value }, () => {
      this.props.filterCars(this.state);
    });
  }

  handleOrderByChange(event) {
    this.setState({ orderBy: event.target.value }, () => {
      this.props.filterCars(this.state);
    });
  }

  render() {
    return (
      <div
        style={{ background: '#aaa69d' }}
        className="container-fluid py-2">
        <div className="d-flex align-items-center">
          <div className="mr-1">View</div>
          <select
            style={{ background: 'white' }}
            className="btn btn-sm mr-1"
            value={this.state.category}
            onChange={this.handleCategoryChange}>
            <option value="All">All</option>
            <option value="Hypercar">Hyper cars</option>
            <option value="Supercar">Super cars</option>
            <option value="Muscle">Muscle cars</option>
          </select>
          <div className="mr-1">Sort by</div>
          <select
            style={{ background: 'white' }}
            className="btn btn-sm ml-1"
            value={this.state.orderBy}
            onChange={this.handleOrderByChange}>
            <option value=''></option>
            <option value="topSpeed">Top Speed</option>
            <option value="horsePower">Horse Power</option>
            <option value="mpg">Mpg</option>
            <option value="availability">Availability</option>
          </select>
        </div>
      </div>
    );
  }
}

export default class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
    this.filterCars = this.filterCars.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    const { search } = this.props.location;
    fetch(`/api/cars${search}`)
      .then(response => response.json())
      .then(cars => this.setState({ cars }))
      .catch(error => console.error(error));
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.getCars();
    }
  }

  filterCars(filterParams) {
    const { category, orderBy } = filterParams;
    const params = new URLSearchParams();
    if (orderBy) {
      params.append('orderBy', orderBy);
    }
    if (category && category !== 'All') {
      params.append('category', category);
    }
    this.props.history.push(`/cars?${params.toString()}`);
  }

  displayCars() {
    const { cars } = this.state;
    return cars.map(car => {
      return <CarListItem
        key={car.carId} {...car}
        history={this.props.history}/>;
    });
  }

  render() {
    return (
      <div className="bg-list">
        <Header title="All Cars" history={this.props.history} back={true} user={true}/>
        <div
          className="container-fluid px-0"
          style={{ overflow: 'auto', paddingTop: '45px' }}>
          <SearchFilter filterCars={this.filterCars}/>
          <div className="container">
            {this.displayCars()}
          </div>
        </div>
      </div>
    );
  }
}
