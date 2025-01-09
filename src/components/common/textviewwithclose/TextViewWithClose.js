import React, { useState } from 'react';
import './TextViewWithClose.css'; // Optional: For styling

const TextViewWithClose = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="text-view">
        <span className="text-content">{text}</span>
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
      </div>
    )
  );
};

export default TextViewWithClose;
