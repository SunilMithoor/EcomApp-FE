import React, { useState } from "react";
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
import TextField from "@mui/material/TextField";

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

function FloatingTextDropDown() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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

  return (
    <div>
      <Typography
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        className="PopoverTrigger"
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
        Phones
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
            <TextField
              placeholder="Search..."
              variant="outlined"
              fullWidth
              size="small"
            />
            <Box>
              <Typography variant="body2">Result 1</Typography>
              <Typography variant="body2">Result 2</Typography>
              <Typography variant="body2">Result 1</Typography>
              <Typography variant="body2">Result 2</Typography>
              <Typography variant="body2">Result 1</Typography>
              <Typography variant="body2">Result 2</Typography>
              <Typography variant="body2">Result 1</Typography>
              <Typography variant="body2">Result 2</Typography>
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default FloatingTextDropDown;
