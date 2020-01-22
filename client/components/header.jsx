import React from 'react';

function HeaderTitle(props) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="col"> {props.text}</a>
    </nav>
  );
}

export default HeaderTitle;
