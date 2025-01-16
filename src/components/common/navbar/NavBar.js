import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import SignInSignUp from "../../../layouts/signinsignup/SignInSignUp";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const togglePopup = () => setPopupOpen(!isPopupOpen);
  const toggleForm = () => setIsLogin(!isLogin);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-hidden" : ""}`}>
      {/* <div className="navbar-logo">ItineraryDoneRight</div> */}
      <div className="navbar-logo">
        <span className="logo-text">Ecomm App</span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
        <li>
          <Link to="/phones" onClick={handleMenuClose}>
            Phones
          </Link>
        </li>

        <li>
          <Link to="/wearables" onClick={handleMenuClose}>
            Wearables
          </Link>
        </li>

        <li>
          <Link to="/audio" onClick={handleMenuClose}>
            Audio
          </Link>
        </li>

        <li>
          <Link to="/accessories" onClick={handleMenuClose}>
            Accessories
          </Link>
        </li>
        <li>
          <Link to="/tablets" onClick={handleMenuClose}>
            Tablets
          </Link>
        </li>

        <li>
          <Link to="/search" onClick={handleMenuClose}>
            Search
          </Link>
        </li>

        <li>
          <Link to="/cart" onClick={handleMenuClose}>
            Cart
          </Link>
        </li>

        <li>
          {/* Trigger the SignIn/SignUp popup when clicked */}
          <Link to="#" onClick={togglePopup}>
            Profile
          </Link>
        </li>

        {/* Pass necessary props to SignInSignUp dialog */}
        <SignInSignUp
          isOpen={isPopupOpen}
          onClose={togglePopup}
          isLogin={isLogin}
          toggleForm={toggleForm}
        />
      </ul>
      {/* <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button> */}

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </nav>
  );
}

export default NavBar;
