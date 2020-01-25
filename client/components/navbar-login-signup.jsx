import React from 'react';

class NavLoginSignUp extends React.Component {

  render() {
    return (
      <nav className='side-drawer'>
        {/* <ul>
          <li><a href='/'>Log in</a></li>
          <li><a href='/'>Sign Up</a></li>
        </ul> */}
        <div className='NavBarContainer container'>
          <div className='NavBarUpperText'> Sign in to have access to pricing or book a rental. </div>
          <div className='NavBarMiddleText'> First time? Sign up, and book your Super Car experience today. </div>
        </div>
        <div className='NavBarButtonContainer'>
          <div className='logIn my-3'> LOG IN </div>
          <div className='signUp'> SIGN UP </div>
        </div>
        <div className='NavBarLowerText my-2'> We will never share your data with a third party </div>
      </nav>
    );
  }
}

export default NavLoginSignUp;
