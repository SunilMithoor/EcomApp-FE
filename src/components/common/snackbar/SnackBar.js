import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackBar({ handleOpen, handleClose, severity, message }) {
  return (
    <Snackbar
      open={handleOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity} //error,info,success,warning
        // variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
