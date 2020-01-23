import React from 'react';

function CarListItem(props) {
  const rate = `$${(props.rate)}`;
  return (
    <div className="card" style={{ width: '23rem' }} >
      <img src={props.image} className="card-img-top img-responsive fit-image"></img>
      <div className="card-body">
        <p className="rate-text">{rate}</p>
        <h5 className="card-title">{props.make}</h5>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );
}

export default CarListItem;
