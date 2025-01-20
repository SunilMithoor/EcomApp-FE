import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery } from "@mui/material";
import SignInSignUp from "../../../layouts/signinsignup/SignInSignUp";
import CartDropdown from "../../../layouts/cart/CartDropdown";
import SearchDropdown from "../../../layouts/search/SearchDropdown";
import ProfileDropdown from "../../../layouts/profile/ProfileDropdown";
import WishlistDropdown from "../../../layouts/wishlist/WishlistDropdown";
import NotificationsDropdown from "../../../layouts/notifications/NotificationsDropdown";
import Popovers from "../../dropdowns/Popover";

import FloatingPopover from "../floatingui/FloatingUi";

const useStyles = makeStyles({
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 2.5,
    alignItems: "center",
    boxShadow: "0px 4px 6px rgba(96, 125, 139, 0.5)", // Custom shadow
  },
  navContent: {
    flex: "1 1 auto",
    display: "flex",
    justifyContent: "flex-start", // Align to the left
    "& ul": {
      display: "flex",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    "& li": {
      margin: "0 10px",
    },
  },
  end: {
    display: "flex",
    justifyContent: "flex-end",
    "& ul": {
      display: "flex",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    "& li": {
      margin: "0 8px",
      display: "flex",
      alignItems: "center",
    },
  },
  text_link: {
    textDecoration: "none",
    color: "black", // Default text color
    fontWeight: "bold", // Default font weight
    display: "inline-block", // Ensures the hover effect is limited to the text
    position: "relative", // Needed for positioning the underline
    "&:hover": {
      color: "red", // Change text color to red on hover
      fontWeight: "bold", // Make text bold on hover
    },
    "&:hover::after": {
      content: '""',
      position: "absolute",
      bottom: -10, // Slightly below the text
      left: 0,
      width: "100%", // Matches the width of the text
      height: "2px", // Thickness of the line
      backgroundColor: "red", // Line color
    },
  },
  img_link: {
    textDecoration: "none",
    color: "black", // Default text color
    fontWeight: "bold", // Default font weight
    display: "inline-block", // Ensures the hover effect is limited to the text
  },
});

function NavBar() {
  const classes = useStyles();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const togglePopup = () => setPopupOpen(!isPopupOpen);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const closeDrawerMenu = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <AppBar position="static" color="#fff">
      <Toolbar className={classes.navBar}>
        {/* Logo */}
        <Link to="/">
          <img
            src="images/logo_new.png"
            alt="Logo"
            width={isMobile ? "80px" : "100px"}
          />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box className={classes.navContent}>
            <ul>
              <li>
                <Link
                  to="/phones"
                  className={classes.text_link}
                  onClick={closeDrawerMenu}
                >
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/tablets" className={classes.text_link}>
                  Tablets
                </Link>
              </li>
              <li>
                <Link to="/wearables" className={classes.text_link}>
                  Wearables
                </Link>
              </li>
              <li>
                <Link to="/audio" className={classes.text_link}>
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/accessories" className={classes.text_link}>
                  Accessories
                </Link>
              </li>
            </ul>
          </Box>
        )}

        {/* Desktop Right Section */}
        {!isMobile && (
          <Box className={classes.end}>
            <ul>
              <li>
                <SearchDropdown />
              </li>
              <li>
                <NotificationsDropdown />
              </li>
              <li>
                <WishlistDropdown />
              </li>
              <li>
                <CartDropdown />
              </li>
              {/* <li>
                <Link to="/profile" className={classes.img_link}>
                  <ProfileDropdown onClick={togglePopup} />
                </Link>
              </li> */}
              <li>
                <Link to="/profile" className={classes.img_link}>
                  <Avatar
                    variant="circular"
                    sx={{
                      bgcolor: blueGrey[900],
                      cursor: "pointer",
                      paddingY: 0,
                    }}
                    onClick={togglePopup}
                  >
                    SG
                  </Avatar>
                </Link>
              </li>
            </ul>
          </Box>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                padding="8px 16px"
              >
                <IconButton onClick={toggleDrawer}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                <ListItem
                  button
                  component={Link}
                  to="/phones"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Phones" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/tablets"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Tablets" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/wearables"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Wearables" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/audio"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Audio" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/accessories"
                  onClick={toggleDrawer}
                >
                  <ListItemText primary="Accessories" />
                </ListItem>
              </List>
            </Drawer>
          </>
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
  );
}

export default NavBar;
