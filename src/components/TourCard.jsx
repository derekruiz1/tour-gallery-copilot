import React from 'react';

const TourCard = ({ id, name, info, image, price, onRemove }) => {
  return (
    <div className="tour-card">
      {/* Display the tour image */}
      <img src={image} alt={name} className="tour-image" />
      <div className="tour-details">
        {/* Display the tour name */}
        <h2>{name}</h2>
        {/* Display the tour information */}
        <p>{info}</p>
        {/* Display the tour price */}
        <h4>${price}</h4>
        {/* Button to remove the tour, calls onRemove with the tour ID */}
        <button onClick={() => onRemove(id)} className="btn-not-interested">
          Not Interested
        </button>
      </div>
    </div>
  );
};

export default TourCard;