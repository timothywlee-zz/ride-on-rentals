/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import HomePageCarousel from './main-carousel';
import Header from './header';

class Home extends React.Component {

  render() {
    return (
      <div className="home-bg-img">
        <div className="bg-filter">
          <Header title="Super Car Experience" history={this.props.history} user={true}/>
          <div className="container-vertical pt-5">
            <div
              className="home-title">
              DISCOVER
              <p
                style={{ fontSize: '1.6rem' }}
                className="text-right m-0">
                YOUR
              </p>
            </div>
            <div className="carousel"> <HomePageCarousel/> </div>
            <Link to="/cars">
              <button id="view-cars">VIEW CARS</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
