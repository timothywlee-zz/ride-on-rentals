import React from 'react';
import {
  Link
} from 'react-router-dom';

class NavMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false, // hard code this for now.
      logInClicked: false,
      signUpClicked: false
    };
    this.logInClickHandler = this.logInClickHandler.bind(this);
    this.signUpClickHandler = this.signUpClickHandler.bind(this);
  }

  logInClickHandler() {
    event.preventDefault();
    this.setState(prevState => { return { logInClicked: !prevState.logInClicked }; });
  }

  signUpClickHandler() {
    event.preventDefault();
    this.setState(prevState => { return { signUpClicked: !prevState.signUpClicked }; });
  }

  render() {
    const { userLoggedIn, logInClicked, signUpClicked } = this.state;
    return (
      <nav
        className={this.props.show ? 'side-drawer open' : 'side-drawer'}>
        {userLoggedIn
          ? <UserIsLoggedIn drawerOpen={this.props.drawerOpen} show={this.props.show}/>
          : <UserLoginSignUpPage drawerOpen={this.props.drawerOpen} show={this.props.show} logInClickHandler={this.logInClickHandler} signUpClickHandler={this.signUpClickHandler}/>
        }
      </nav>
    );
  }
}

function UserLoginSignUpPage(props) {
  return (
    <>
      <div
        className='exitNavLogin far fa-arrow-alt-circle-right'
        onClick={props.drawerOpen}
        style={{ color: 'black', fontSize: '5vh' }} />
      <div className='NavBarContainer container'>
        <div className='NavBarUpperText'> Sign in to have access to pricing or book a rental. </div>
        <div className='NavBarMiddleText'> First time? Sign up, and book your Super Car experience today. </div>
      </div>
      <div className='NavBarButtonContainer'>
        <Link to='/userlogin' className='logIn my-3'>
          <div
            onClick={props.logInClickHandler}>
            LOG IN
          </div>
        </Link>
        <Link to='/createaccount' className='signUp'>
          <div
            onClick={props.signUpClickHandler}>
          SIGN UP
          </div>
        </Link>
      </div>
      <div className='NavBarLowerText my-2'> We will never share your data with a third party </div>
    </>
  );
}

// add function when user is logged in here
function UserIsLoggedIn(props) {
  return (
    <div>
      <div
        className='exitNavLogin far fa-arrow-alt-circle-right'
        onClick={props.drawerOpen}
        style={{ color: 'black', fontSize: '5vh' }} />
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div style={{ color: 'black' }}> User is logged in </div>
        <div style={{ color: 'black' }}> Insert links here to other pages </div>
      </div>
    </div>
  );
}

export default NavMenu;
