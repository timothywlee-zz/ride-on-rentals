/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="container-vertical">
        <div className="home-title">DISCOVER</div>
        <div className="carousel">CAROUSEL</div>
        <Link to="/cars">
          <button id="view-cars">VIEW CARS</button>
        </Link>
      </div>
    );
  }
}

export default Home;
