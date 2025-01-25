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
import { blueGrey, red } from "@mui/material/colors";
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
    width: "400px", // Set a fixed width for the dropdown
    zIndex: 1300, // Ensure it appears above other content
    // width: "max-content",
    // maxWidth: "calc(100vw - 10px)",

    marginTop: "12px",
    maxHeight: "500px",
    minWidth: "400px",
    maxWidth: "500px",
    background: "#fff",
  },
  icon_hover: {
    backgroundColor: red[50],
    borderRadius: "4px",
  },
});

function FloatingDropDown() {
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
        <SearchOutlinedIcon
          sx={{
            color: open ? red[500] : blueGrey[900], // Icon color changes when open
            transition: "filter 0.3s ease, color 0.3s ease", // Smooth transitions
            "&:hover": {
              filter: "brightness(1.5)", // Brightness effect on hover
            },
          }}
        />
      </IconButton>

      {open && (
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
      )}
    </div>
  );
}

// function FloatingDropDown() {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);

//   const { refs, floatingStyles, context } = useFloating({
//     open,
//     onOpenChange: setOpen,
//     placement: "bottom-start", // Dropdown opens below the trigger
//     middleware: [
//       offset(8), // Space between trigger and dropdown
//       flip({
//         fallbackPlacements: ["top-start"], // Flip to top if necessary
//         padding: 5,
//       }),
//       shift({ padding: 5 }), // Prevent overflow
//     ],
//   });

//   const hover = useHover(context);
//   const interactions = useInteractions([hover]);
//   const triggerRef = useMergeRefs([refs.setReference]);

//   return (
//     <div>
//       <IconButton
//         ref={triggerRef}
//         {...interactions.getReferenceProps()}
//         sx={{ backgroundColor: "transparent" }}
//       >
//         <SearchOutlinedIcon />
//       </IconButton>
//       {open && (
//         <div
//           ref={refs.setFloating}
//           style={{
//             ...floatingStyles,
//             zIndex: 1300,
//             position: "absolute", // Ensure proper positioning
//             backgroundColor: "#fff",
//             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//             border: "1px solid #ddd",
//             borderRadius: "4px",
//           }}
//           className={classes.popover}
//         >
//           {/* Dropdown Content */}
//           <TextField
//             placeholder="Search..."
//             variant="outlined"
//             fullWidth
//             size="small"
//           />
//           <Box>
//             <Typography variant="body2">Result 1</Typography>
//             <Typography variant="body2">Result 2</Typography>
//           </Box>
//         </div>
//       )}
//     </div>
//   );
// }

export default FloatingDropDown;
