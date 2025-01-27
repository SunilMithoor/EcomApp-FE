import React, { useState, useMemo } from "react";
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

import Divider from "../divider/Divider";
import message from "../../../constants/message";
import DefaultAvatar from "../avatar/DefaultAvatar";
import { blueGrey, blue } from "@mui/material/colors";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PaperButton from "../../common/paper/PaperButton";
import { useNavigate } from "react-router-dom";
import { useFetchMenuDropDowns } from "../../../hooks/home.js";
import ListSubItemPopUpCard from "../../dropdowns/mobile/ListSubItemPopUpCard.js";
import PropagateLoaders from "../loaders/PropagateLoader.js";

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

function CustomDrawer({ signInSinUpClick, logoutClick }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main"); // Track current menu view
  const { data, isLoading, error } = useFetchMenuDropDowns();

  // Memoize dataItems to prevent unnecessary re-calculations on every render
  const dataItems = useMemo(() => {
    if (data?.success === true) {
      return data.data || [];
    }
    return [];
  }, [data]); // Only recompute when 'data' changes

  // Memoize menuItems to optimize recomputations
  const menuItems = useMemo(() => {
    return Object.keys(dataItems).map((key) => ({
      index: key || 0,
      label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize category names
      subItems: (dataItems[key] || []).map((item) => item), // Keep full item object
    }));
  }, [dataItems]); // Only recompute when 'dataItems' changes

  function toggleDrawer(open) {
    setDrawerOpen(open);
    // setMenuRotated(open);
    if (!open) setCurrentMenu("main"); // Reset to main menu on close
  }

  const handleSignInSignUpClick = () => {
    toggleDrawer(false); // Close the drawer
    signInSinUpClick(); // Execute passed function
  };

  const handleLogoutClick = () => {
    toggleDrawer(false); // Close the drawer
    logoutClick(); // Execute passed function
  };

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
          <Box
            sx={{
              height: "auto",
              width: "100vw", // Full screen width
              overflowY: "auto", // Enable vertical scrolling if content exceeds the height
              justifyContent:
                isLoading || error || menuItems.length === 0
                  ? "center"
                  : "flex-start", // Center for loader, error, or empty states
              alignItems:
                isLoading || error || menuItems.length === 0
                  ? "center"
                  : "flex-start", // Center for loader, error, or empty states, // Center horizontally
            }}
          >
            {/* Display CircularProgress while loading */}
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Ensure the loader occupies the full height of its container
                  width: "100%", // Ensure the loader occupies the full width of its container
                }}
              >
                <PropagateLoaders loading={isLoading} />
              </Box>
            )}

            {/* Error UI */}
            {!isLoading && error && (
              <Typography variant="body2" color="text.secondary">
                {data.message ||
                  "Something went wrong. Please try again later."}
              </Typography>
            )}

            {/* No Data UI */}
            {!isLoading && !error && menuItems.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                {message.no_data_available}
              </Typography>
            )}

            {/* Success UI */}
            {!isLoading && !error && menuItems.length > 0 && (
              <>
                {currentMenu === "main" ? (
                  // Main Menu
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 5,
                      }}
                    >
                      <h3 style={{ flexGrow: 1, textAlign: "left" }}>{}</h3>
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

                    <List sx={{ width: "100%" }}>
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
                  </>
                ) : (
                  // Submenu View
                  <>
                    <div
                      style={{
                        padding: 5,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                        <h3 style={{ margin: "0 16px", textAlign: "left" }}>
                          {menuItems[currentMenu].label}
                        </h3>
                      </div>
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
                    {/* <List sx={{ width: "100%" }}>
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
                    </List> */}

                    <ListSubItemPopUpCard
                      button
                      key={currentMenu}
                      sx={{
                        cursor: "pointer",
                      }}
                      type={menuItems[currentMenu].label} // Use id or index as string
                      data={menuItems[currentMenu].subItems}
                      index={menuItems[currentMenu].index}
                      closeMenu={() => toggleDrawer(false)}
                    />
                  </>
                )}
              </>
            )}
          </Box>

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
                      onClick={handleSignInSignUpClick}
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
                onClick={handleLogoutClick}
                text={message.logout}
                rightIcon={ChevronRightOutlinedIcon}
              />
            </Box>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default CustomDrawer;
