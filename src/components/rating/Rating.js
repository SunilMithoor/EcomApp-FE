// import React from "react";
// import "./Rating.css";

// const Rating = ({ totalRatings = 0, rating = 0 }) => {
//   const renderStar = (index) => {
//     const isFull = index + 1 <= Math.floor(rating);
//     const isHalf =
//       index + 1 === Math.ceil(rating) && rating % 1 !== 0;

//     return (
//       <div
//         key={index}
//         className={`star ${isFull ? "full" : isHalf ? "half" : "empty"}`}
//       >
//         ★
//       </div>
//     );
//   };

//   return (
//     <div className="rating-container">
//       <div className="rating-count">{rating}</div>
//       <div className="stars">
//         {Array.from({ length: 5 }, (_, index) => renderStar(index))}
//       </div>
//       <div className="total-count">({totalRatings} Ratings)</div>
//     </div>
//   );
// };

// export default Rating;

import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Rating = ({ totalRatings = 0, rating = 0 }) => {
  const renderStar = (index) => {
    const isFull = index + 1 <= Math.floor(rating);
    const isHalf = index + 1 === Math.ceil(rating) && rating % 1 !== 0;

    return (
      <Box key={index} display="inline-block">
        {isFull ? (
          <StarIcon sx={{ color: "#efb923" }} />
        ) : isHalf ? (
          <StarHalfIcon sx={{ color: "#efb923" }} />
        ) : (
          <StarOutlineIcon sx={{ color: "#ddd" }} />
        )}
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      fontFamily="Arial, sans-serif"
    >
      <Typography variant="body1" fontWeight="bold" color="#555">
        {rating}
      </Typography>
      <Box display="flex">
        {Array.from({ length: 5 }, (_, index) => renderStar(index))}
      </Box>
      <Typography variant="body2" color="#555">
        ({totalRatings} Ratings)
      </Typography>
    </Box>
  );
};

Rating.propTypes = {
  totalRatings: PropTypes.number,
  rating: PropTypes.number,
};

export default Rating;
