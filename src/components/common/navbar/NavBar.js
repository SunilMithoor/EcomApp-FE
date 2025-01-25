import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
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
import FloatingTextDropDown from "../../dropdowns/FloatingTextDropDown";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";

function NavBar() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const togglePopup = () => setPopupOpen(!isPopupOpen);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

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
              image="logo/logo_new_square.png"
              alt="Logo"
              sx={{
                cursor: "pointer",
                maxWidth: isMobile ? 80 : 100,
                maxHeight: isMobile ? 80 : 100,
                objectFit: "cover",
                mr: 2,
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
              <ProfileDropdown onClick={togglePopup} />
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
              <h3 style={{ flexGrow: 1 }}>{}</h3>
              <CustomDrawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer}
              />
            </Box>
          )}
        </Toolbar>

        {/* SignInSignUp Dialog */}
        <SignInSignUp
          isOpen={isPopupOpen}
          onClose={togglePopup}
          isLogin={isLogin}
          toggleForm={() => setIsLogin(!isLogin)}
        />
      </AppBar>
    </Box>
  );
}

export default NavBar;
