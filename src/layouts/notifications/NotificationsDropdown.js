import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { blueGrey, red, grey } from "@mui/material/colors";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import message from "../../constants/message.js";
import Divider from "../../components/common/divider/Divider.js";
// import BackDropLoader from "../../components/common/loaders/BackDropLoader";
import { useFetchNotifications } from "../../hooks/home.js";
import NotificationPopUpCard from "./NotificationPopUpCard.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { IconDropDownUseStyles } from "../../styles/DropdownStyles.js";

function NotificationsDropdown() {
  const classes = IconDropDownUseStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  // Use `useFloating` for positioning and `useHover` for hover interaction.
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start", // Dropdown opens below the trigger
    middleware: [
      offset(8), // Space between trigger and dropdown
      flip({
        fallbackPlacements: ["top-start"], // Flip to top if necessary
        padding: 5,
      }),
      shift({ padding: 5 }), // Prevent overflow
    ],
  });

  const hover = useHover(context, { delay: { open: 100, close: 100 } });
  const interactions = useInteractions([hover]);
  const triggerRef = useMergeRefs([refs.setReference]);
  const contentRef = useMergeRefs([refs.setFloating]);

  const { data, isLoading, error } = useFetchNotifications();

  // Normalize cartItems to an empty array if null
  let dataItems = [];
  if (data.success === true) {
    dataItems = data.data || [];
  }

  const closeDropdown = () => {
    setOpen(false); // Close the dropdown when this function is called
  };

  const handleViewAllClick = () => {
    setOpen(false); // Close the dropdown
    // Navigate to the notifications page
    navigate("/notifications");
  };

  const badgeCount = dataItems.length || 0;

  return (
    <div>
      <IconButton
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        sx={{
          backgroundColor: open ? red[50] : "transparent", // Background color when open
          borderRadius: "4px", // Ensures square shape
          "&:hover": {
            backgroundColor: red[50], // Same hover color
            borderRadius: "4px", // Ensure consistent border-radius on hover
          },
        }}
        className="PopoverTrigger"
      >
        <Badge
          badgeContent={badgeCount}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: blueGrey[900], // Set badge background to red
              color: "white", // Set badge content color to white
            },
          }}
        >
          <NotificationsNoneOutlinedIcon
            onClick={handleViewAllClick} // Close and navigate
            sx={{
              color: open ? red[500] : blueGrey[900], // Icon color changes when open
              transition: "filter 0.3s ease", // Smooth transition
              "&:hover": {
                filter: "brightness(1.5)", // Increase brightness for a tinted effect
              },
            }}
          />{" "}
        </Badge>
      </IconButton>
      {open && (
        <FloatingPortal>
          <div
            ref={contentRef}
            style={{
              ...floatingStyles,
            }}
            className={classes.popover}
            {...interactions.getFloatingProps()}
          >
            <Box>
              <Box
                sx={{
                  mt: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold", // Make the text bold
                    display: "flex",
                    flex: 1,
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {message.notifications}
                </Typography>

                {/* <Typography
                  variant="subtitle1"
                  sx={{
                    cursor: "pointer",
                    color: red[500],
                    justifyContent: "end",
                    alignItems: "end",
                    textAlign: "end",
                  }}
                >
                  {message.settings}
                </Typography> */}

                <Tooltip title={message.settings}>
                  <IconButton
                    aria-label="Settings"
                    size="small"
                    sx={{ color: blueGrey[900] }}
                  >
                    <SettingsOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box
                sx={{
                  padding: 0.5,
                  maxHeight: "300px", // Limit the maximum height
                  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
                  display: "flex", // Use flex for center alignment
                  flexDirection: "column", // Stack elements vertically
                  justifyContent:
                    isLoading || error || dataItems.length === 0
                      ? "center"
                      : "flex-start", // Center for loader, error, or empty states
                  alignItems: "center", // Center horizontally
                  textAlign: "center", // Center align text
                }}
              >
                {/* Display CircularProgress while loading */}
                {isLoading && <CircularProgress color="inherit" size={30} />}

                {/* Error UI */}
                {!isLoading && error && (
                  <Typography variant="body2" color="text.secondary">
                    {data.message ||
                      "Something went wrong. Please try again later."}
                  </Typography>
                )}

                {/* No Data UI */}
                {!isLoading && !error && dataItems.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {message.no_notifications}
                  </Typography>
                )}

                {/* Success UI */}
                {!isLoading && !error && dataItems.length > 0 && (
                  <>
                    <NotificationPopUpCard
                      data={dataItems}
                      closeDropdown={closeDropdown}
                    />
                  </>
                )}
              </Box>

              {/* View All Button */}
              {!isLoading && !error && dataItems.length > 0 && (
                <Button
                  variant="body2"
                  className="PopoverClose"
                  onClick={handleViewAllClick} // Close and navigate
                  type="button"
                  sx={{
                    textTransform: "none",
                    display: "block", // Ensures it's treated as a block element for centering
                    margin: "8px auto", // Center horizontally with margin
                    fontWeight: "normal",
                    backgroundColor: "#0288d1", // Blue background
                    color: "#ffffff", // White text
                    cursor: "pointer",
                    textAlign: "center", // Center align the text
                    paddingX: 1.5, // Add padding for better appearance
                    paddingY: 0.3,
                    borderRadius: "2px", // Add rounded corners
                    "&:hover": {
                      backgroundColor: "#0277bd", // Slightly darker blue on hover
                    },
                  }}
                >
                  {message.view_notifications}
                </Button>
              )}
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default NotificationsDropdown;
