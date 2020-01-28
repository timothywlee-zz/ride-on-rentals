import React from 'react';
import UserLogIn from './user-login';
import CreateAccount from './user-create-account';


class NavMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false, // hard code this for now.
      // logInClicked: false,
      // signUpClicked: false,
      view: {
        name: 'default',
        params: {}
      }
    };
    // this.logInClickHandler = this.logInClickHandler.bind(this);
    // this.signUpClickHandler = this.signUpClickHandler.bind(this);
    this.setView = this.setView.bind(this);
    this.displayPage = this.displayPage.bind(this);
  }

  // logInClickHandler() {
  //   event.preventDefault();
  //   this.setState(prevState => { return { logInClicked: !prevState.logInClicked }; });
  // }

  // signUpClickHandler() {
  //   event.preventDefault();
  //   this.setState(prevState => { return { signUpClicked: !prevState.signUpClicked }; });
  // }

  setView(name, params) {
    this.setState({ view: { name: name , params: params}})
  }

  displayPage() {
    const {view} = this.state;
    if (view.name === 'default') {
      return (
      <UserLoginSignUpPage
        drawerOpen={this.props.drawerOpen}
        show={this.props.show}
        logInClickHandler={this.logInClickHandler}
        signUpClickHandler={this.signUpClickHandler}
        setView={this.setView} />)
    } else if (view.name === 'login') {
      return (
        <UserLogIn
          setView={this.setView} />
      )
    } else if (view.name === 'signup') {
      return(
        <CreateAccount
          setView={this.setView} />
      )
    }
  }



  render() {
    // const { userLoggedIn, logInClicked, signUpClicked } = this.state;
    const { userLoggedIn } = this.state;
    const displayContent = this.displayPage();
    return (
      <nav
        className={this.props.show ? 'side-drawer open' : 'side-drawer'}>
        <div
          className='exitNavLogin far fa-arrow-alt-circle-right'
          onClick={this.props.drawerOpen}
          style={{ color: 'black', fontSize: '5vh' }} />
        <div
          className='displayContentInNavMenu'
          style={{height: '100%'}}> {displayContent}
        </div>
      </nav>
    );
  }
}

function UserLoginSignUpPage(props) {
  return (
    <>
      <div className='NavBarContainer container'>
        <div className='NavBarUpperText'> Sign in to have access to pricing or book a rental. </div>
        <div className='NavBarMiddleText'> First time? Sign up, and book your Super Car experience today. </div>
      </div>

      <div className='NavBarButtonContainer'>
          <div
            className='logIn my-3'
            onClick={() => props.setView('login', {})}>
            LOG IN
          </div>
          <div
            className='signUp'
            onClick={() => props.setView('signup', {})}>
            SIGN UP
          </div>
      </div>

      <div className='NavBarLowerText my-2'> We will never share your data with a third party. </div>
    </>
  );
}

export default NavMenu;
