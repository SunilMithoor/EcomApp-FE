import React, { useState } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { blueGrey, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
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

// function ProfileDropdown() {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMouseEnter = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMouseLeave = () => {
//     setAnchorEl(null);
//   };

//   const isOpen = Boolean(anchorEl);

//   return (
//     <Box
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       sx={{ display: "inline-block" }}
//     >
//       <IconButton>
//         <AccountCircleOutlinedIcon sx={{ color: blueGrey[900] }} />{" "}
//       </IconButton>

//       <Popover
//         open={isOpen}
//         anchorEl={anchorEl}
//         onClose={handleMouseLeave}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         disableRestoreFocus
//         sx={{
//           pointerEvents: "none", // Prevents focus issues
//           mt: 3,
//         }}
//         PaperProps={{
//           onMouseEnter: () => setAnchorEl(anchorEl), // Keep popover open when hovering over it
//           onMouseLeave: handleMouseLeave, // Close popover when mouse leaves
//         }}
//       >
//         <Box sx={{ padding: "16px", width: "250px", pointerEvents: "auto" }}>
//           <Typography variant="subtitle1" gutterBottom>
//             Your Cart
//           </Typography>
//           <Typography variant="body2">Item 1 - $20</Typography>
//           <Typography variant="body2">Item 2 - $15</Typography>
//           <Typography variant="body2">Item 3 - $10</Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               textAlign: "right",
//               marginTop: "8px",
//               fontWeight: "bold",
//               color: "#0288d1",
//               cursor: "pointer",
//             }}
//             onClick={() => {
//               // Navigate to cart page
//               console.log("Go to cart");
//             }}
//           >
//             View Cart
//           </Typography>
//         </Box>
//       </Popover>
//     </Box>
//   );
// }

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

function ProfileDropdown() {
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
        sx={{
          backgroundColor: "transparent", // Default background
          "&:hover": {
            backgroundColor: red[50], // Light red background on hover
            borderRadius: "4px", // Square shape (4px border radius for slight rounding)
          },
        }}
      >
        {/* <AccountCircleOutlinedIcon
          sx={{
            color: blueGrey[900], // Default icon color
            transition: "filter 0.3s ease", // Smooth transition
            "&:hover": {
              filter: "brightness(1.5)", // Increase brightness for a tinted effect
            },
          }}
        /> */}

        <Avatar
          variant="circular"
          sx={{
            bgcolor: blueGrey[900],
            cursor: "pointer",
            transition: "filter 0.3s ease", // Smooth transition
            "&:hover": {
              filter: "brightness(1.5)", // Increase brightness for a tinted effect
            },
          }}
        >
          SG
        </Avatar>
      </IconButton>
      {open && (
        <FloatingPortal>
          <div
            ref={contentRef}
            style={{
              ...floatingStyles,
              marginTop: "10px",
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

export default ProfileDropdown;
