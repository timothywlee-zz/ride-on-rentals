/* eslint-disable no-unused-vars */
import React from 'react';
import UserLogIn from './user-login';
import CreateAccount from './create-user-account';
import UserLoginSignUpPage from './user-login-signup-page';

class NavMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false, // hard code this for now.
      view: {
        name: 'default',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.displayPage = this.displayPage.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  displayPage() {
    const { view } = this.state;
    if (view.name === 'default') {
      return (
        <UserLoginSignUpPage
          drawerOpen={this.props.drawerOpen}
          show={this.props.show}
          setView={this.setView} />);
    } else if (view.name === 'login') {
      return (
        <UserLogIn
          setView={this.setView} />
      );
    } else if (view.name === 'signup') {
      return (
        <CreateAccount
          setView={this.setView} />
      );
    }
  }

  render() {
    const { userLoggedIn } = this.state;
    const displayContent = this.displayPage();
    return (
      <nav
        className={`side-drawer ${this.props.show ? 'side-drawer-open' : null}`}>
        <div
          className='exitNavLogin far fa-arrow-alt-circle-right'
          onClick={this.props.drawerOpen}
          style={{ color: 'black', fontSize: '5vh' }} />
        <div
          className='displayContentInNavMenu'
          style={{ height: '100%' }}> {displayContent}
        </div>
      </nav>
    );
  }
}

export default NavMenu;
