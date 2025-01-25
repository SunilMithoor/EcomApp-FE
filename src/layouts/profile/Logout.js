import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LogoutDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    console.log("Logged out");
    setOpen(false);
  };

  return (
    <div>
      {/* Trigger Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Logout Dialog
      </Button>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            You are attempting to log out of Elegant Themes.
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            Are you Sure?
          </DialogContentText>
          <Typography variant="subtitle2" align="center" color="textSecondary">
            Logged in as <strong>estev</strong>
          </Typography>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", paddingBottom: "16px" }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleLogout}
            style={{ width: "80%" }}
          >
            LOG OUT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutDialog;
