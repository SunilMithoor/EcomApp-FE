// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { IoClose, IoMenu, IoSearch, IoCart, IoPerson } from "react-icons/io5";
// import { useMediaQuery } from "react-responsive";
// import "../navbarhook/NavBarHook.css";
// import renderDialog from "../dropdowns/DialogDropDown.js";
// import renderSubScreen from "../rightdialogdropdown/RightDialogDropdown.js";
// import CartPopUp from "../cartpopup/CartPopUp.js";
// import SignInSignUp from "../../layouts/signinsignup/SignInSignUp.js";

// const NavbarHook = () => {
//   const isMobile = useMediaQuery({ maxWidth: "1150px" });
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const closeMobileMenu = () => {
//     if (isMobile) {
//       setIsMenuOpen(false);
//     }
//   };

//   const [activeDialog, setActiveDialog] = useState(null);
//   const [isDialogHovered, setIsDialogHovered] = useState(false);
//   const showDialog = (dialog) => setActiveDialog(dialog);

//   const hideDialog = () => {
//     if (!isDialogHovered) {
//       setActiveDialog(null);
//     }
//   };

//   const handleDialogMouseEnter = () => setIsDialogHovered(true);
//   const handleDialogMouseLeave = () => {
//     setIsDialogHovered(false);
//     if (!activeDialog) {
//       setActiveDialog(null);
//     }
//   };

//   const [activeSubScreenDialog, setActiveSubScreenDialog] = useState(null);
//   const [isSubScreenDialogHovered, setIsSubScreenDialogHovered] =
//     useState(false);
//   const showSubScreenDialog = (dialog) => setActiveSubScreenDialog(dialog);

//   const hideSubScreenDialog = () => {
//     if (!isSubScreenDialogHovered) {
//       setActiveSubScreenDialog(null);
//     }
//   };

//   const handleSubScreenDialogMouseEnter = () =>
//     setIsSubScreenDialogHovered(true);
//   const handleSubScreenDialogMouseLeave = () => {
//     setIsSubScreenDialogHovered(false);
//     if (!activeSubScreenDialog) {
//       setActiveSubScreenDialog(null);
//     }
//   };

//   // const [popup, setPopup] = useState({ visible: false, text: "" });

//   const [popup, setPopup] = useState({
//     visible: false,
//     text: "",
//     x: 0,
//     y: 0,
//   });

//   const showPopup = (text, event) => {
//     const rect = event.target.getBoundingClientRect();
//     setPopup({
//       visible: true,
//       text,
//       x: rect.left + window.scrollX, // X position of the icon
//       y: rect.bottom + window.scrollY, // Y position below the icon
//     });
//   };

//   // const showPopup = (text) => {
//   //   setPopup({ visible: true, text });
//   // };

//   // const hidePopup = () => {
//   //   setPopup({ visible: false, text: "" });
//   // };

//   const hidePopup = () => {
//     setPopup({ visible: false, text: "", x: 0, y: 0 });
//   };

//   // const [isPopupOpen, setIsPopupOpen] = useState(false);
//   // const [popupMode, setPopupMode] = useState("login");

//   // const handleOpenPopup = (mode) => {
//   //   setPopupMode(mode);
//   //   setIsPopupOpen(true);
//   // };

//   // const handleClosePopup = () => {
//   //   setIsPopupOpen(false);
//   // };

//   const [isPopupOpen, setPopupOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const togglePopup = () => setPopupOpen(!isPopupOpen);
//   const toggleForm = () => setIsLogin(!isLogin);

//   const renderNavLinks = () => {
//     const listClassName = isMobile ? "nav__list" : "nav__list__web";
//     const linkClassName = "nav__link";

//     return (
//       <ul className={listClassName}>
//         <li>
//           <NavLink
//             to="/phones"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             onMouseEnter={() => showDialog("phones")}
//             onMouseLeave={hideDialog}
//           >
//             Phones
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/tablets"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             onMouseEnter={() => showDialog("tablets")}
//             onMouseLeave={hideDialog}
//           >
//             Tablets
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/wearables"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             onMouseEnter={() => showDialog("wearables")}
//             onMouseLeave={hideDialog}
//           >
//             Wearables
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/audio"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             onMouseEnter={() => showDialog("audio")}
//             onMouseLeave={hideDialog}
//           >
//             Audio
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/accessories"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             onMouseEnter={() => showDialog("accessories")}
//             onMouseLeave={hideDialog}
//           >
//             Accessories
//           </NavLink>
//         </li>
//       </ul>
//     );
//   };

//   const renderIcons = () => {
//     const listClassName = isMobile ? "nav__list__mobile" : "nav__list__web";
//     const linkClassName = "nav__link";

//     return (
//       <ul
//         className={listClassName}
//         style={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginRight: "30px",
//         }}
//       >
//         <li>
//           <NavLink
//             to="/search"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             // onMouseEnter={() => showSubScreenDialog("search")}
//             // onMouseLeave={hideSubScreenDialog}
//           >
//             {isMobile ? "Search" : <IoSearch className="nav__icon" />}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/cart"
//             className={linkClassName}
//             onClick={closeMobileMenu}
//             // onMouseEnter={() => showSubScreenDialog("cart")}
//             // onMouseLeave={hideSubScreenDialog}
//           >
//             {isMobile ? "Cart" : <IoCart className="nav__icon" />}
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/profile"
//             className={linkClassName}
//             onClick={togglePopup}

//             // onMouseEnter={() => showSubScreenDialog("profile")}
//             // onMouseLeave={hideSubScreenDialog}
//           >
//             {isMobile ? "Profile" : <IoPerson className="nav__icon" />}
//           </NavLink>
//         </li>
//       </ul>
//     );
//   };

//   return (
//     <header className="header">
//       <nav className="nav container">
//         <NavLink to="/" className="nav__logo">
//           <img
//             src="images/ecom_logo.png" /* Replace with your logo path */
//             alt="Logo"
//             className="nav__logo-image"
//           />
//         </NavLink>

//         {isMobile && (
//           <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
//             <IoMenu />
//           </div>
//         )}

//         {isMobile ? (
//           <div
//             className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`}
//             id="nav-menu"
//           >
//             <div className="nav__close" id="nav-close" onClick={toggleMenu}>
//               <IoClose />
//             </div>
//             {renderNavLinks()}
//             {renderIcons()}
//           </div>
//         ) : (
//           <>
//             {renderNavLinks()}
//             {renderIcons()}
//           </>
//         )}
//         {/* {renderDialog(activeDialog)} */}
//         {renderDialog(
//           activeDialog,
//           handleDialogMouseEnter,
//           handleDialogMouseLeave
//         )}
//         {renderSubScreen(
//           activeSubScreenDialog,
//           handleSubScreenDialogMouseEnter,
//           handleSubScreenDialogMouseLeave
//         )}
//         {
//           // <SignInSignUp
//           //   isOpen={isPopupOpen}
//           //   onClose={togglePopup}
//           //   isLogin={isLogin}
//           //   toggleForm={toggleForm}
//           // />

//           <SignInSignUp
//             isOpen={isPopupOpen}
//             onClose={togglePopup}
//             isLogin={isLogin}
//             toggleForm={toggleForm}
//           />
//         }
//         {popup.visible && (
//           <CartPopUp text={popup.text} closePopup={hidePopup} />
//         )}
//       </nav>
//     </header>
//   );
// };

// export default NavbarHook;
