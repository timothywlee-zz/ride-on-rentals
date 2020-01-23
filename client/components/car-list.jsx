import React from 'react';
import CarListItem from './car-list-item';

export default class CarList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    };
    this.getCars = this.getCars.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    fetch('/api/cars')
      .then(response => response.json())
      .then(data => {
        this.setState({ cars: data });
      })
      .catch(error => console.error(error));
  }

  render() {
    const arrayOfCars = this.state.cars;
    return (
      <div className="row mt-5">{
        arrayOfCars.map(car => {
          return (
            <div key={car.carId} className="card col-4">
              <CarListItem
                productId={car.carId}
                make={car.make}
                rate={car.rate}
                year={car.year}
                image={car.image}
                shortDescription={car.shortDescription}
                topSpeed={car.topSpeed}
                availability={car.availability}
                mpg={car.mpg}
              />
            </div>
          );
        })
      }
      </div>
    );
  }
}
