import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import message from "../../../constants/message";

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
      alignItems="flex-start"
      gap={1}
      fontFamily="Roboto, sans-serif"
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Typography variant="body1" fontWeight="bold" color="#555">
        {rating}
      </Typography>
      <Box display="flex">
        {Array.from({ length: 5 }, (_, index) => renderStar(index))}
      </Box>
      <Typography variant="body2" color="#555">
        ({totalRatings} {message.ratings})
      </Typography>
    </Box>
  );
};

Rating.propTypes = {
  totalRatings: PropTypes.number,
  rating: PropTypes.number,
};

export default Rating;
