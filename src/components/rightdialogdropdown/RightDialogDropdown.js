import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../rightdialogdropdown/RightDialogDropdown.css";

const renderSubScreen = (activeSubScreen, onMouseEnter, onMouseLeave) => {
  const subScreens = {
    search: (
      <div
        className="sub-screen"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Search</h3>
        <p>Explore items or search for specific products.</p>
        {/* Add more content or a search form here */}
      </div>
    ),
    cart: (
      <div
        className="sub-screen"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Your Cart</h3>
        <p>View the items in your cart and proceed to checkout.</p>
        {/* Add cart items or a checkout button here */}
      </div>
    ),
    profile: (
      <div
        className="sub-screen"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3>Your Profile</h3>
        <p>Manage your profile, orders, and account settings.</p>
        {/* Add profile management options here */}
      </div>
    ),
  };

  return activeSubScreen ? (
    <div className="sub-screen">{subScreens[activeSubScreen]}</div>
  ) : null;
};

export default renderSubScreen;
