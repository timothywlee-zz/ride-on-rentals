import React from 'react';

function CarListItem(props) {
  const status = props.availability ? 'Available' : 'Unavailable';
  return (
    <div
      className="card mb-2 p-2"
      style={{ height: '100%' }}>
      <img
        src={props.image}
        className="card-img-top"
        style={{
          objectFit: 'contain',
          height: '15em'
        }}>
      </img>
      <div className="card-body">
        <div className="row">
          <h6 className="card-title col-6">
            {props.make}
          </h6>
          <h6 className="card-title text-right col-6" style={props.availability ? { color: 'green' } : { color: 'red' }}>
            {status}
          </h6>
        </div>
        <div className="card-text">
          {props.shortDescription}
        </div>
      </div>
    </div>
  );
}

export default CarListItem;
