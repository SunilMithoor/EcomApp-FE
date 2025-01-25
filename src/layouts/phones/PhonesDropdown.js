import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import message from "../../constants/message.js";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  popover: {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(96, 125, 139, 0.5)",
    border: "1px solid #ddd",
    fontSize: "90%",
    padding: "4px 8px",
    borderRadius: "4px",
    boxSizing: "border-box",
    width: "max-content",
    maxWidth: "calc(100vw - 15px)",
  },
  closeButton: {
    marginTop: "8px",
  },
});

function PhonesDropdown() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // Use `useFloating` for positioning and `useHover` for hover interaction.
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const hover = useHover(context, { delay: { open: 100, close: 100 } }); // Add delay for smoother interaction.
  const interactions = useInteractions([hover]);
  const triggerRef = useMergeRefs([refs.setReference]);
  const contentRef = useMergeRefs([refs.setFloating]);

  const closeDropdown = () => {
    setOpen(false); // Close the dropdown when this function is called
  };

  const handleViewAllClick = () => {
    setOpen(false); // Close the dropdown
    // Navigate to the notifications page
    navigate("/phones");
  };

  return (
    <div className="App">
      <Typography
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        className="PopoverTrigger"
        onClick={handleViewAllClick}
        sx={{
          cursor: "pointer",
          display: "inline-block", // Ensures the hover effect is limited to the text
          position: "relative",
          fontWeight: "bold",
          backgroundColor: "transparent", // Default background
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
        }}
      >
        {message.phones}
      </Typography>
      {open && (
        <FloatingPortal>
          <div
            ref={contentRef}
            style={{
              ...floatingStyles,
              border: "40px",
              marginTop: "25px",
              maxHeight: "500px",
              minHeight: "300px",
              width: "100%",
              background: "#fff",
            }}
            {...interactions.getFloatingProps()}
            className={classes.popover}
          >
            <Box></Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default PhonesDropdown;
