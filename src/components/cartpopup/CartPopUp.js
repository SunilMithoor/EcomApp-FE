import React from "react";
import "../cartpopup/CartPopUp.css";

const cartPopup = ({ text, closePopup }) => {
  return (
    <div className="popup-container">
      {" "}
      <div className="popup-body">
        {" "}
        <h1>{text}</h1> <button onClick={closePopup}>Close X</button>{" "}
      </div>{" "}
    </div>
  );
};

export default cartPopup;
