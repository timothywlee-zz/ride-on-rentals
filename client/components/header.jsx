import React from 'react';

function HeaderTitle(props) {
  return (
    <nav className="navbar fixed-top navbar-dark">
      <a className="navbar-brand" style={{ color: 'white' }}>{props.text}</a>
      <a className="col-1 fas fa-bars" style={{ color: 'white', width: '2rem' }}></a>
    </nav>);

}

export default HeaderTitle;
