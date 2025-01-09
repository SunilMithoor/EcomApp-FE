import React from "react";
import "./Divider.css"; // Optional: Add custom styles if needed

const Divider = ({ className }) => {
  return <hr className={`divider ${className}`} />;
};

export default Divider;
