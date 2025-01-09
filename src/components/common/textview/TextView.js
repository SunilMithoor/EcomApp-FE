import React from "react";
import PropTypes from "prop-types";
import "./TextView.css";

const TextView = ({ text, color, size, textStyle }) => {
  return (
    <div
      className="text_view"
      style={{
        background: "#fff",
        color: color,
        fontSize: `${size}px`,
        fontStyle: textStyle,
      }}
    >
      {text}
    </div>
  );
};

// Define prop types for better validation
TextView.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOf(["normal", "italic", "bold"]),
};

// Default props for optional values
TextView.defaultProps = {
  color: "#000", // Default color: black
  size: 16, // Default size: 16px
  style: "normal", // Default style: normal
};

export default TextView;
