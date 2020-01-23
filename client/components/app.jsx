import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import HeaderTitle from './header';
import CarList from './car-list';
import Home from './home-page';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/cars">
            <CarList />
          </Route>
        </Switch>
      </Router>
    );
  }
}
