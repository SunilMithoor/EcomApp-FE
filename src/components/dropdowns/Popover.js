import React, { useState } from "react";
import "./Popover.css";

function Popover({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true); // Show the popover
  };

  const handleMouseLeave = () => {
    setIsVisible(false); // Hide the popover
  };

  return (
    <div
      className="popover-container"
      onMouseEnter={handleMouseEnter} // Open on mouse enter
      onMouseLeave={handleMouseLeave} // Close on mouse leave
    >
      <button
        className="popover-trigger"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content"
      >
        {children}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          className="popover-content"
          role="dialog"
          aria-modal="true"
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Popover;
