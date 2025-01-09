import React from "react";
import "./Rating.css";

const Rating = ({ totalRatings = 0, rating = 0 }) => {
  const renderStar = (index) => {
    const isFull = index + 1 <= Math.floor(rating);
    const isHalf =
      index + 1 === Math.ceil(rating) && rating % 1 !== 0;

    return (
      <div
        key={index}
        className={`star ${isFull ? "full" : isHalf ? "half" : "empty"}`}
      >
        ★
      </div>
    );
  };

  return (
    <div className="rating-container">
      <div className="rating-count">{rating}</div>
      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => renderStar(index))}
      </div>
      <div className="total-count">({totalRatings} Ratings)</div>
    </div>
  );
};

export default Rating;
