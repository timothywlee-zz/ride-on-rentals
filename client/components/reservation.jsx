import React from 'react';
export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      car: null,
      user: null,
      isBooked: false
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    // const { id } = this.props.match.params;
    fetch('/api/users/13')
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch(err => console.error(err));
  }

  render() {
    const { user } = this.state;
    return !user
      ? <div>Loading...</div>
      : <div className="container">
        <div className="row text-white bg-dark mt-5">
          <h6
            className="reservation-opener text-center col-12"
            style= {{ color: 'white' }}>
           Book Your Reservation, {user.firstName}!
          </h6>
        </div>
        <form>
          <div className="form-check mb-2 mr-sm-2">
            <input className="form-check-input" type="checkbox" id="inlineFormCheck"></input>
            <label className="form-check-label" htmlFor="inlineFormCheck">
              Drop-off location is the same
            </label>
          </div>
          <div className="form-group">
            <div className="input-group-prepend">
              <div className="input-group-text fas fa-search-location"></div>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Pick-Up Location"></input>
            </div>
          </div>
          <form className="form-inline">
            <div className="form-group">
              <div className="input-group-prepend">
                <div className="input-group-text fas fa-calendar-alt"></div>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Pick-Up Date"></input>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group-prepend">
                <div className="input-group-text fas fa-clock"></div>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Pick-Up Time"></input>
              </div>
            </div>
            <form className="form-inline">
              <div className="form-group">
                <div className="input-group-prepend">
                  <div className="input-group-text fas fa-calendar-alt"></div>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Drop-Off Date"></input>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group-prepend">
                  <div className="input-group-text fas fa-clock"></div>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Drop-Off Time"></input>
                </div>
              </div>

            </form>

          </form>
        </form>
      </div>
    ;
  }
}
