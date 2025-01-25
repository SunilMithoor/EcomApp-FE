import React, { useState, useCallback, useMemo } from "react";
import { makeStyles } from "@mui/styles";
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import message from "../../../constants/message.js";
import urls from "../../../constants/urls.js";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import {
  useFetchMenuDropDowns,
  useFetchNotifications,
} from "../../../hooks/home.js";
import MenuTextDropDownPopUpCard from "./MenuTextDropDownPopUpCard.js";
import Divider from "../../common/divider/Divider.js";

const useStyles = makeStyles({
  popover: {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(96, 125, 139, 0.5)",
    border: "1px solid #ddd",
    fontSize: "90%",
    padding: "4px 8px",
    borderRadius: "4px",
    boxSizing: "border-box",
    position: "absolute", // Positioning the dropdown absolutely
    top: "100%", // Align below the AppBar
    left: 0,
    // width: "400px", // Set a fixed width for the dropdown
    zIndex: 1300, // Ensure it appears above other content
    // width: "max-content",
    // maxWidth: "calc(100vw - 10px)",

    marginTop: "20px",
    maxHeight: "500px",
    minWidth: "400px",
    maxWidth: "calc(100vw - 15px)",
    background: "#fff",

    minHeight: "300px",
    width: "100%",
  },
});

function MenuTextDropDown({ type }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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

  const { data, isLoading, error } = useFetchMenuDropDowns();
  const dataItems = useMemo(() => {
    if (data?.success) {
      switch (type) {
        case "1":
          return data?.data?.phones || [];
        case "2":
          return data?.data?.tablets || [];
        case "3":
          return data?.data?.wearables || [];
        case "4":
          return data?.data?.audio || [];
        case "5":
          return data?.data?.accessories || [];
        default:
          return [];
      }
    }
    return [];
  }, [data, type]);

  const title = useMemo(() => {
    switch (type) {
      case "1":
        return message.phones;
      case "2":
        return message.tablets;
      case "3":
        return message.wearables;
      case "4":
        return message.audio;
      case "5":
        return message.accessories;
      default:
        return "";
    }
  }, [type]);

  const text = useMemo(() => {
    switch (type) {
      case "1":
        return message.explore_all(message.phones);
      case "2":
        return message.explore_all(message.tablets);
      case "3":
        return message.explore_all(message.wearables);
      case "4":
        return message.explore_all(message.audio);
      case "5":
        return message.explore_all(message.accessories);
      default:
        return "";
    }
  }, [type]);

  const closeDropdown = () => {
    setOpen(false); // Close the dropdown when this function is called
  };

  const handleClick = useCallback(() => {
    closeDropdown();
    switch (type) {
      case "1":
        navigate("/phones");
        break;
      case "2":
        navigate("/tablets");
        break;
      case "3":
        navigate("/wearables");
        break;
      case "4":
        navigate("/audio");
        break;
      case "5":
        navigate("/accessories");
        break;
      default:
        break;
    }
  }, [type, navigate]);

  return (
    <div>
      <Typography
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        className="PopoverTrigger"
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          display: "inline-block", // Limits the hover effect to the text
          fontWeight: "bold", // Bold when open
          marginRight: 3,
          color: open ? "red" : "inherit", // Red when open
          position: "relative", // Ensures pseudo-element is positioned relative to the text
          "&:hover, &:focus-visible, &:focus-within": {
            color: "red", // Change text color to red on hover or focus
            fontWeight: "bold", // Make text bold on hover or focus
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -2, // Slightly below the text
            left: 0,
            width: open ? "100%" : "0%", // Full width when open or hovered
            height: "2px", // Thickness of the line
            backgroundColor: "red", // Line color
            transition: "width 0.2s ease", // Smooth transition for the underline
          },
          "&:hover::after, &:focus-visible::after, &:focus-within::after": {
            width: "100%", // Show the underline on hover or focus
          },
        }}
      >
        {title}
      </Typography>

      {open && (
        <FloatingPortal>
          <div
            // ref={refs.setFloating}
            ref={contentRef}
            style={{
              ...floatingStyles,
            }}
            className={classes.popover}
            {...interactions.getFloatingProps()}
          >
            {/* Dropdown Content */}

            <Box>
              <Box
                sx={{
                  mt: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold", // Make the text bold
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {text}
                </Typography>
                <TrendingFlatOutlinedIcon
                  sx={{
                    ml: 1,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box
                sx={{
                  padding: 0.5,
                  maxHeight: "400px", // Limit the maximum height
                  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
                  display: "flex", // Use flex for center alignment
                  flexDirection: "column", // Stack elements vertically
                  justifyContent:
                    isLoading || error || dataItems.length === 0
                      ? "center"
                      : "flex-start", // Center for loader, error, or empty states
                  alignItems:
                    isLoading || error || dataItems.length === 0
                      ? "center"
                      : "flex-start", // Center for loader, error, or empty states
                  textAlign: "center", // Center align text
                }}
              >
                {/* Display CircularProgress while loading */}
                {isLoading && (
                  <CircularProgress
                    justifyContent="center" // Aligns grid items to the left
                    alignItems="center"
                    textAlign="center"
                    color="inherit"
                    size={30}
                  />
                )}

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
                    {message.no_data_available}
                  </Typography>
                )}

                {/* Success UI */}
                {!isLoading && !error && dataItems.length > 0 && (
                  <>
                    <MenuTextDropDownPopUpCard
                      type={type}
                      data={dataItems}
                      closeDropdown={closeDropdown}
                    />
                  </>
                )}
              </Box>
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default MenuTextDropDown;
