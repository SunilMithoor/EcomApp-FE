import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import message from "../../constants/message";

const LogoutDialog = ({ isOpen, onClose, fullScreen }) => {
  const handleLogout = () => {
    console.log("Logged out");
    onClose(); // Close the dialog after logout
  };

  return (
    <Dialog fullScreen={fullScreen} open={isOpen} onClose={onClose}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: "#252829",
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 0,
            boxShadow: 0,
            textAlign: "center",
            mt: 1,
            p: 1,
            maxWidth: "300px",
            minWidth: "250px",
            minHeight: "80px",
            maxHeight: "auto",
          }}
        >
          <Typography
            variant="body1"
            color="#252829"
            style={{ fontWeight: "bold", fontSize: 20 }}
          >
            {message.logout_msg}
          </Typography>

          <Typography
            variant="subtitle1"
            style={{ fontWeight: "normal", fontSize: 16 }}
            sx={{
              mt: 1,
            }}
          >
            {message.logout_confirm}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "center", paddingBottom: "16px" }}
      >
        <Button
          variant="contained"
          backgroundColor="#E63329"
          color="#E63329"
          onClick={handleLogout}
          style={{
            width: "70%",
            textTransform: "none",
            background: "#E63329",
            color: "#fff",
          }}
        >
          {message.logout}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
