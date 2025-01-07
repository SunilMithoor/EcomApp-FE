import React, { useState } from "react";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./NavbarHook.css";

const NavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
=======
import { IoClose, IoMenu, IoSearch, IoCart, IoPerson } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "../navbarhook/NavBarHook.css";

const NavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [dropdownVisible, setDropdownVisible] = useState({
  //   search: false,
  //   cart: false,
  //   profile: false,
  // });
>>>>>>> development
  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

<<<<<<< HEAD
  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";
=======
  // Click handler functions
  const handleSearchClick = () => {
    // Implement search functionality here
    console.log("Search icon clicked");
  };

  const handleCartClick = () => {
    // Implement cart functionality here
    console.log("Cart icon clicked");
  };

  const handleProfileClick = () => {
    // Implement profile functionality here
    console.log("Profile icon clicked");
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
>>>>>>> development

    return (
      <ul className={listClassName}>
        <li>
<<<<<<< HEAD
          <NavLink to="/" className={linkClassName} onClick={closeMobileMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            News
=======
          <NavLink
            to="/phones"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Phones
>>>>>>> development
          </NavLink>
        </li>
        <li>
          <NavLink
<<<<<<< HEAD
            to="/about-us"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            About Us
=======
            to="/tablets"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Tablets
>>>>>>> development
          </NavLink>
        </li>
        <li>
          <NavLink
<<<<<<< HEAD
            to="/favorite"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Favorite
=======
            to="/wearables"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Wearables
>>>>>>> development
          </NavLink>
        </li>
        <li>
          <NavLink
<<<<<<< HEAD
            to="/location"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Location
=======
            to="/audio"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Audio
>>>>>>> development
          </NavLink>
        </li>
        <li>
          <NavLink
<<<<<<< HEAD
            to="/get-started"
            className={`${linkClassName} ${buttonClassName}`}
            onClick={closeMobileMenu}
          >
            Get Started
=======
            to="/accessories"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Accessories
>>>>>>> development
          </NavLink>
        </li>
      </ul>
    );
  };

<<<<<<< HEAD
=======
  // const renderIcons = () => (
  //   <div className="nav__icons">
  //     <IoSearch className="nav__icon" title="Search" />
  //     <IoCart className="nav__icon" title="Cart" />
  //     <IoPerson className="nav__icon" title="Profile" />
  //   </div>
  // );

  const renderIcons = () => (
    <div className="nav__icons">
      <button className="nav__icon-button" onClick={handleSearchClick}>
        <IoSearch className="nav__icon" title="Search" />
      </button>
      <button className="nav__icon-button" onClick={handleCartClick}>
        <IoCart className="nav__icon" title="Cart" />
      </button>
      <button className="nav__icon-button" onClick={handleProfileClick}>
        <IoPerson className="nav__icon" title="Profile" />
      </button>
    </div>
  );

>>>>>>> development
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
<<<<<<< HEAD
          Navigation Bar
=======
          <img
            src="/ecom192.png" /* Replace with your logo path */
            alt="Logo"
            className="nav__logo-image"
          />
>>>>>>> development
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
<<<<<<< HEAD
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
=======
            className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
            {renderNavLinks()}
            {renderIcons()}
          </div>
        ) : (
          <>
            {renderNavLinks()}
            {renderIcons()}
          </>
>>>>>>> development
        )}
      </nav>
    </header>
  );
};

export default NavbarHook;
