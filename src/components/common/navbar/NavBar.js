import React, { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import { useMediaQuery } from "@mui/material";
import SignInSignUp from "../../../layouts/signinsignup/SignInSignUp";
import CartDropdown from "../../../layouts/cart/CartDropdown";
import SearchDropdown from "../../../layouts/search/SearchDropdown";
import ProfileDropdown from "../../../layouts/profile/ProfileDropdown";
import WishlistDropdown from "../../../layouts/wishlist/WishlistDropdown";
import NotificationsDropdown from "../../../layouts/notifications/NotificationsDropdown";
import CustomDrawer from "../drawer/CustomDrawer";
import { CardMedia } from "@mui/material";
import MenuTextDropDown from "../../dropdowns/web/MenuTextDropDown";
import FloatingUiCard from "../../dropdowns/example/FloatingUiCard";
import LogoutDialog from "../../../layouts/profile/Logout";

function NavBar() {
  const [isSignInSignUpPopupOpen, setSignInSignUpPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleSignInSignUpPopup = () =>
    setSignInSignUpPopupOpen(!isSignInSignUpPopupOpen);
  const toggleLogoutPopup = () => setLogoutPopupOpen(!isLogoutPopupOpen);

  const toggleDrawer = (open) => {
    setDrawerOpen(open); // Update state to open/close the drawer
  };

  const handleOpenPage = (item) => {
    console.log(`Navigating to ${item}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", color: "black" }}
      >
        <Toolbar>
          {/* Logo */}
          <Link to="/">
            <CardMedia
              component="img"
              image={require("../../../assets/logo/mg_app_brand_trans.png")}
              alt="Logo"
              sx={{
                cursor: "pointer",
                maxWidth: isMobile ? 60 : 80,
                maxHeight: isMobile ? 60 : 80,
                objectFit: "cover",
                mr: 2,
                // transition: "transform 0.3s ease-in-out",
                // "&:hover": {
                //   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                //   transform: "scale(1.5)",
                // },
              }}
            />
          </Link>

          {/* Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <MenuTextDropDown type="1" />
              <MenuTextDropDown type="2" />
              <MenuTextDropDown type="3" />
              <MenuTextDropDown type="4" />
              <MenuTextDropDown type="5" />
            </Box>
          )}

          {/* Right Actions */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SearchDropdown />
              <NotificationsDropdown />
              <WishlistDropdown />
              <CartDropdown />
              <ProfileDropdown
                signInSinUpClick={toggleSignInSignUpPopup}
                logoutClick={toggleLogoutPopup}
              />
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
              <h3 style={{ flexGrow: 1 }}>{}</h3>
              <CustomDrawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                signInSinUpClick={() => {
                  toggleSignInSignUpPopup(); // Toggle popup
                  toggleDrawer(false); // Close the drawer
                }}
                logoutClick={() => {
                  toggleLogoutPopup(); // Toggle popup
                  toggleDrawer(false); // Close the drawer
                }}
              />
            </Box>
          )}
        </Toolbar>

        {/* SignInSignUp Dialog */}
        <SignInSignUp
          isOpen={isSignInSignUpPopupOpen}
          onClose={toggleSignInSignUpPopup}
          isLogin={isLogin}
          toggleForm={() => setIsLogin(!isLogin)}
        />

        {/* logout Dialog */}
        <LogoutDialog
          isOpen={isLogoutPopupOpen}
          onClose={toggleLogoutPopup}
          fullScreen={false}
        />
      </AppBar>
    </Box>
  );
}

export default NavBar;
