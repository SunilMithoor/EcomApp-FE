import React from "react";
import { NavLink } from "react-router-dom";
import "../dropdowns/DialogDropDown.css";

const renderDialog = (activeDialog, onMouseEnter, onMouseLeave) => {
  const dialogContent = {
    phones: (
      <div
        className="dialog__content"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Phones</h3>
        <p>Explore the latest smartphones and feature phones.</p>
        <NavLink to="/phones" className="dialog__link">
          View All Phones
        </NavLink>
      </div>
    ),
    tablets: (
      <div
        className="dialog__content"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Tablets</h3>
        <p>Explore the latest tablets and devices.</p>
        <NavLink to="/tablets" className="dialog__link">
          View All Tablets
        </NavLink>
      </div>
    ),
    wearables: (
      <div
        className="dialog__content"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Wearables</h3>
        <p>Discover smartwatches and fitness bands.</p>
        <NavLink to="/wearables" className="dialog__link">
          View All Wearables
        </NavLink>
      </div>
    ),
    audio: (
      <div
        className="dialog__content"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Audio</h3>
        <p>Check out the latest headphones and speakers.</p>
        <NavLink to="/audio" className="dialog__link">
          View All Audio
        </NavLink>
      </div>
    ),
    accessories: (
      <div
        className="dialog__content"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Accessories</h3>
        <p>Explore the latest accessories and gadgets.</p>
        <NavLink to="/accessories" className="dialog__link">
          View All Accessories
        </NavLink>
      </div>
    ),
  };

  return activeDialog ? (
    <div className="dialog">{dialogContent[activeDialog]}</div>
  ) : null;
};

export default renderDialog;
