import React from 'react';
import NavMenu from './nav-menu';

class HeaderTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerClicked: false
    };
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
  }

  drawerToggleClickHandler() {
    this.setState(prevState => { return { drawerClicked: !prevState.drawerClicked }; });
  }

  render() {
    const { drawerClicked } = this.state;
    return (
      <nav className="navbar navbar-dark bg-dark justify-content-center text-light py-2">
        <div className="title">Super Car Experience</div>
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
            <i
              className = "nav-btn fas fa-bars pr-3"
              style = {{ cursor: 'pointer' }}
              onClick={this.drawerToggleClickHandler}>
            </i>
          )
        }
      </nav>
    );
  }
}

const Backdrop = () => <div className='backdrop' />;

export default HeaderTitle;
