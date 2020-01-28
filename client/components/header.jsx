import React from 'react';
import NavMenu from './nav-menu';
import AppContext from '../lib/context';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerClicked: false
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  drawerToggleClickHandler() {
    this.setState(prevState => { return { drawerClicked: !prevState.drawerClicked }; });
  }

  goBack() {
    this.props.history.goBack();
  }

  isUserAuthenticated() {
    if (!this.context.user) {
      return this.drawerToggleClickHandler();
    }
    return this.props.history.push('/user');
  }

  render() {
    const { drawerClicked } = this.state;
    const displayBackButton = this.props.back ? '' : 'd-none';
    const displayUserButton = this.props.user ? '' : 'd-none';
    return (
      <nav className="navbar fixed-top justify-content-center text-light header">
        <i
          onClick={this.goBack}
          className={`back-btn fas fa-chevron-left pl-3 ${displayBackButton}`}>
        </i>
        <div className="title">{this.props.title}</div>
        <i
          className={`account-btn fas fa-user pr-3 ${displayUserButton}`}
          style = {{ cursor: 'pointer' }}
          onClick={this.isUserAuthenticated}>
        </i>
        {drawerClicked
          ? (
            <div>
              <NavMenu
                drawerOpen={this.drawerToggleClickHandler}
                show={drawerClicked} />
              <Backdrop />
            </div>
          )
          : (
            <div className='d-none'></div>
          )
        }
      </nav>
    );
  }
}

const Backdrop = () => <div className='backdrop' />;

Header.contextType = AppContext;

export default Header;
