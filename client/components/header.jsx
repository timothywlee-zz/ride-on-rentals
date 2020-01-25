import React from 'react';
import NavLoginSignUp from './navbar-login-signup';

class HeaderTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerClicked: false
    };
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-center text-light py-2">
        <div className="title">Super Car Experience</div>
        {this.state.drawerClicked
          ? (
            <NavLoginSignUp/>
          )
          : (
            <i
              className = "nav-btn fas fa-bars pr-3"
              style = {{ cursor: 'pointer' }}
              onClick={() => this.setState({ drawerClicked: true })}>
            </i>
          )
        }
      </nav>
    );
  }
}

export default HeaderTitle;
