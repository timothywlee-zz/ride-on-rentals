import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import CarList from './car-list';

class Home extends React.Component {
  render() {
    return (
      <>
        <h1>Home Page</h1>
        <button>
          <Link to="/cars">Cars</Link>
        </button>
      </>
    );
  }
}

export default Home;
