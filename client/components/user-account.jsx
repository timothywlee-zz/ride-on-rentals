import React from 'react';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Ethan',
      lastName: 'Cordes',
      email: 'ethancordes7@gmail.com',
      verified: false
    };
  }

  verifyUser() {
    const { verified } = this.state;
    return verified
      ? <React.Fragment>
        <h5>Verified <i style={{ color: 'green' }} className="fas fa-check"></i></h5>
      </React.Fragment>
      : <React.Fragment>
        <h5>Add photo Id to get verified <i style={{ color: 'red' }} className="fas fa-times"></i></h5>
        <button className="btn btn-outline-secondary">UPLOAD</button>
        <div style={{ width: '70%', textAlign: 'center' }}>
          <p>Verification allows us to approve you for a rental in record time.</p>
        </div>
      </React.Fragment>;
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div
        style={{ height: '94%' }}
        className="container">
        <div
          style={{ height: '100%' }}
          className="d-flex flex-column justify-content-between align-items-center py-4">
          <div className="d-flex flex-column justify-content-between align-items-center py-2">
            <h5>Welcome back {firstName}!</h5>
            <i className="fas fa-user fa-7x mb-2"></i>
            <h5>{firstName} {lastName}</h5>
            {this.verifyUser()}
          </div>
          <div className="d-flex flex-column align-items-center py-2">
            <button className="btn btn-outline-secondary">
              UPDATE ACCOUNT INFO
            </button>
            <button className="btn btn-outline-secondary">
              UPDATE PAYMENT INFO
            </button>
            <button
              onClick={() => this.props.history.push('/user/rentals')}
              className="btn btn-outline-secondary">
              VIEW PAST RENTALS
            </button>
            <button className="btn btn-danger">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserAccount;
