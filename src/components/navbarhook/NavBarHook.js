import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

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

    return (
      <ul className={listClassName}>
        <li>
          <NavLink
            to="/phones"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tablets"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wearables"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Wearables
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/audio"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Audio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    );
  };

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

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <img
            src="/ecom192.png" /* Replace with your logo path */
            alt="Logo"
            className="nav__logo-image"
          />
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div
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
        )}
      </nav>
    </header>
  );
};

export default NavbarHook;
