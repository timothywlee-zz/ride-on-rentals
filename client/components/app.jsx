import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './home-page';
import CarList from './car-list';
import HeaderTitle from './header';
import Details from './car-details';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid p-0 bg-img" >
          <div className="container-fluid p-0 bg-filter">
            <HeaderTitle text="Super Cars Experience"/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/cars" component={CarList}/>
              <Route exact path="/cars/:id" component={Details}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
