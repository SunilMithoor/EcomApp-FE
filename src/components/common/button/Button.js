import React from "react";
import "./Button.css"; // Optional: If you want to add custom styles

const Button = ({ text, onClick, className, disabled }) => {
  return (
    <button
      className={`button ${className}`} // Allow custom classes to be added
      onClick={onClick}
      disabled={disabled} // Disable the button if the disabled prop is true
    >
      {text}
    </button>
  );
};

export default Button;
