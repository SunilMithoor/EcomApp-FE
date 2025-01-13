import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TextViewWithClose = ({ text, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose(); // Optional: Notify parent component
  };

  return (
    isVisible && (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "2px dashed #ccc",
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <Typography
          variant="body1"
          noWrap
          sx={{
            fontSize: "16px",
            color: "#333",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            color: "black",
            fontSize: "20px",
            fontWeight: "bold",
            marginLeft: "10px",
            "&:hover": {
              color: "#000", // Keep hover color black
            },
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Box>
    )
  );
};

export default TextViewWithClose;
