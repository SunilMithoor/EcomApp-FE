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
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { blueGrey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    maxWidth: "calc(100vw - 10px)",
  },
  closeButton: {
    marginTop: "8px",
  },
});

function FloatingPopover() {
  const classes = useStyles();
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

  return (
    <div className="App">
      <IconButton
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        className="PopoverTrigger"
      >
        <SearchOutlinedIcon sx={{ color: blueGrey[900] }} />{" "}
      </IconButton>
      {open && (
        <FloatingPortal>
          <div
            ref={contentRef}
            style={{
              ...floatingStyles,
              marginTop: "20px",
            }}
            {...interactions.getFloatingProps()}
            className={classes.popover}
          >
            <Box>
              <h2 className="PopoverHeading">My popover heading</h2>
              <p className="PopoverDescription">My popover description</p>
              <Typography variant="subtitle1" gutterBottom>
                Search
              </Typography>
              <Typography variant="body2">Item 1 - $20</Typography>
              <Typography variant="body2">Item 2 - $15</Typography>
              <Typography variant="body2">Item 3 - $10</Typography>
              <Typography
                variant="body2"
                className="PopoverClose"
                onClick={() => setOpen(false)}
                type="button"
                sx={{
                  textAlign: "right",
                  marginTop: "8px",
                  fontWeight: "bold",
                  color: "#0288d1",
                  cursor: "pointer",
                }}
              >
                View Cart
              </Typography>
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default FloatingPopover;
