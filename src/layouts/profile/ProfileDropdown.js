import React, { useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { blueGrey, red, grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { CloseOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
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

import ProfilePopUpCard from "./ProfilePopUpCard.js";
import { useNavigate } from "react-router-dom";
import { ProfileDropDownUseStyles } from "../../styles/DropdownStyles.js";
const initials = ""; //SG

function ProfileDropdown({ signInSinUpClick, logoutClick }) {
  const classes = ProfileDropDownUseStyles();
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

  const closeDropdown = () => {
    setOpen(false); // Close the dropdown when this function is called
  };

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
        <Avatar
          variant="circular"
          sx={{
            bgcolor: blueGrey[900],
            cursor: "pointer",
            width: 36, // Reduced width
            height: 36, // Reduced height
            fontSize: 16, // Adjust font size for initials
          }}
          onClick={signInSinUpClick}
        >
          {initials ? initials : <PersonIcon fontSize="small" />}
        </Avatar>
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
                  {message.profile}
                </Typography>

                <Tooltip title={message.close}>
                  <IconButton
                    onClick={closeDropdown}
                    aria-label="Close"
                    size="small"
                    sx={{ color: blueGrey[900] }}
                  >
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider sx={{ my: 1 }} />

              <ProfilePopUpCard
                closeDropdown={closeDropdown}
                signInSinUpClick={signInSinUpClick}
                logoutClick={logoutClick}
                // signInSinUpClick={() => console.log("Sign In/Sign Up Clicked")}
                // logoutClick={() => console.log("Logout Clicked")}
              />
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default ProfileDropdown;
