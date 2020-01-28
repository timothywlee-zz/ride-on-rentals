import React from 'react';
import Header from './header';
import AppContext from '../lib/context';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      verified: ''
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { firstName, lastName, email, verified } = this.context.user;
    this.setState({ firstName, lastName, email, verified });
  }

  verifyUser() {
    const { verified } = this.state;
    return verified
      ? <h5>Verified <i style={{ color: 'green' }} className="fas fa-check"/></h5>
      : <React.Fragment>
        <h5>Add photo Id to get verified <i style={{ color: 'red' }} className="fas fa-times"/></h5>
        <button className="btn btn-outline-secondary">UPLOAD</button>
        <div style={{ width: '70%', textAlign: 'center' }}>
          <p>Verification allows us to approve you for a rental in record time.</p>
        </div>
      </React.Fragment>;
  }

  logout() {
    fetch('/api/auth', { method: 'DELETE' })
      .then(res => {
        this.props.logout(null);
        return this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div
        style={{ paddingTop: '45px', height: '100%' }}
        className="container px-0 bg-account">
        <Header title="Your Account" history={this.props.history} back={true}/>
        <div
          style={{ height: '100%' }}
          className="d-flex flex-column justify-content-between align-items-center py-4">
          <div className="d-flex flex-column justify-content-between align-items-center py-2">
            <h5>Welcome back {firstName}!</h5>
            <i className="fas fa-user fa-7x mb-2"/>
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
            <button
              onClick={this.logout}
              className="btn btn-danger">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

UserAccount.contextType = AppContext;

export default UserAccount;
