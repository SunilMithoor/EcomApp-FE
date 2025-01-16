import React from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";

function TextView({ text, color, size, textStyle, onClick }) {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        color: color,
        borderRadius: "4px",
        padding: "0px 0px 8px 0px",
        textAlign: "start",
        transition: "all 0.3s ease",
      }}
      onClick={onClick}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: `${size}px`,
          fontStyle: textStyle === "italic" ? "italic" : "normal",
          fontWeight: textStyle === "bold" ? "bold" : "normal",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

// Define prop types for better validation
TextView.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  textStyle: PropTypes.oneOf(["normal", "italic", "bold"]),
  onClick: PropTypes.func,
};

// Default props for optional values
TextView.defaultProps = {
  color: "#000", // Default color: black
  size: 16, // Default size: 16px
  textStyle: "normal", // Default style: normal
  onClick: null, // Default is no click handler
};

export default TextView;
