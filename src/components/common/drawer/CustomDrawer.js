import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Divider from "../divider/Divider";
import message from "../../../constants/message";
import DefaultAvatar from "../avatar/DefaultAvatar";
import { blueGrey, blue } from "@mui/material/colors";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PaperButton from "../../common/paper/PaperButton";
import SignInSignUp from "../../../layouts/signinsignup/SignInSignUp";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  drawerPaper: {
    // paddingTop: "40px", // Push drawer below the AppBar
    width: "100%",
    height: "calc(100% - 64px)", // Adjust height to fill remaining screen
    backgroundColor: "#f9f9f9",
  },
  listItem: {
    padding: "16px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  menuIcon: {
    transition: "transform 0.3s ease-in-out",
  },
  drawerTransition: {
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  },
  rotateIcon: {
    transform: "rotate(180deg)", // Rotate the icon for animation
  },

  flipIcon: {
    transform: "rotateY(180deg)", // Flip the icon on the Y-axis
    transition: "transform 0.3s ease-in-out", // Smooth flip transition
  },
});

function CustomDrawer() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Track current menu view
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const menuItems = [
    { label: "Phones", to: "/phones", subItems: ["Android", "iOS"] },
    { label: "Tablets", to: "/tablets", subItems: ["Windows", "iPad"] },
    { label: "Wearables", to: "/wearables", subItems: ["Watches", "Bands"] },
    { label: "Audio", to: "/audio", subItems: ["Headphones", "Speakers"] },
    {
      label: "Accessories",
      to: "/accessories",
      subItems: ["Cables", "Chargers"],
    },
  ];

  const togglePopup = () => setPopupOpen(!isPopupOpen);

  function toggleDrawer(open) {
    setDrawerOpen(open);
    // setMenuRotated(open);
    if (!open) setCurrentMenu("main"); // Reset to main menu on close
  }

  function openSubMenu(menuIndex) {
    setCurrentMenu(menuIndex); // Set submenu index
  }

  function goBackToMainMenu() {
    setCurrentMenu("main");
  }

  function handleCardClick(itemId) {
    // Close dropdown before navigating
    toggleDrawer(false);
    if (itemId === 1) {
      navigate("/orders");
    } else if (itemId === 2) {
      navigate("/profile");
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          flexGrow: 1,
          padding: "10px", // Adjust padding for proper alignment
        }}
      >
        <h3 style={{ display: "flex", flexGrow: 1 }}>
          {/* Placeholder for title if needed */}
        </h3>

        {/* Menu Button */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
          sx={{
            marginLeft: "auto", // Push the button to the right
            color: blueGrey[900],
            transform: isDrawerOpen ? "rotateY(180deg)" : "rotateY(0deg)", // Flip on toggle
            transition: "transform 0.3s ease-in-out", // Smooth transition
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Drawer Component */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%", // Full screen height for the drawer
            transform: isDrawerOpen
              ? "translateY(0)" // Open from top to bottom
              : "translateY(-100%)", // Initially hidden above the screen
            transition: "transform 0.3s ease-in-out", // Smooth transition
          },
        }}
      >
        <div style={{ width: "100%" }}>
          {currentMenu === "main" ? (
            // Main Menu
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <h3 style={{ flexGrow: 1 }}>{}</h3>

                <IconButton
                  onClick={() => toggleDrawer(false)}
                  color="inherit"
                  aria-label="close"
                  sx={{
                    transform: isDrawerOpen
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)", // Flip the close icon on open
                    transition: "transform 0.3s ease-in-out", // Smooth flip transition
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <Divider sx={{ my: 0.5 }} />
              <List>
                {menuItems.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => openSubMenu(index)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText primary={item.label} />
                    <ChevronRightIcon />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 0.5 }} />
              <div style={{ marginTop: "auto", padding: "10px" }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={0.3} // Add spacing between cards
                >
                  <Card display="flex" elevation={0} sx={{ paddingY: 0.5 }}>
                    <CardHeader
                      avatar={
                        <DefaultAvatar
                        // initials="SG"
                        ></DefaultAvatar>
                      }
                      title={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {message.welcome_msg}
                        </Typography>
                      }
                      subheader={
                        <Typography
                          variant="body2"
                          sx={{
                            color: blue[500],
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                          onClick={togglePopup}
                        >
                          {message.signin_signup_msg}
                        </Typography>
                      }
                    />
                  </Card>

                  <PaperButton
                    leftIcon={ArticleOutlinedIcon}
                    onClick={() => handleCardClick(1)}
                    text={message.orders}
                    rightIcon={ChevronRightOutlinedIcon}
                  />
                  <PaperButton
                    leftIcon={AccountCircleOutlinedIcon}
                    onClick={() => handleCardClick(2)}
                    text={message.account}
                    rightIcon={ChevronRightOutlinedIcon}
                  />
                  <PaperButton
                    leftIcon={LogoutOutlinedIcon}
                    onClick={() => handleCardClick(3)}
                    text={message.logout}
                    rightIcon={ChevronRightOutlinedIcon}
                  />
                </Box>
              </div>
            </>
          ) : (
            // Submenu View
            <>
              <div
                style={{
                  padding: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={goBackToMainMenu}
                  color="inherit"
                  aria-label="back"
                  sx={{
                    transition: "transform 0.3s ease-in-out", // Smooth transitions
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <h3 style={{ margin: "0 16px", flexGrow: 1 }}>
                  {menuItems[currentMenu].label}
                </h3>
                <IconButton
                  onClick={() => toggleDrawer(false)}
                  color="inherit"
                  aria-label="close"
                  sx={{
                    transform: isDrawerOpen
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)", // Flip the close icon on open
                    transition: "transform 0.3s ease-in-out", // Smooth flip transition
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <Divider sx={{ my: 0.5 }} />
              <List>
                {menuItems[currentMenu].subItems.map((subItem, index) => (
                  <ListItem
                    button
                    onClick={() => toggleDrawer(false)}
                    key={index}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText primary={subItem} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </div>
      </Drawer>
      {/* SignInSignUp Dialog */}
      <SignInSignUp
        isOpen={isPopupOpen}
        onClose={togglePopup}
        isLogin={isLogin}
        toggleForm={() => setIsLogin(!isLogin)}
      />
    </div>
  );
}

export default CustomDrawer;
