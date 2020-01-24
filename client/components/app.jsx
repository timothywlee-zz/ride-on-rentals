import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HeaderTitle from './header';
import CarList from './car-list';
import Home from './home-page';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid p-0" >
          <HeaderTitle text="Super Cars Experience"/>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/cars">
              <CarList />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
