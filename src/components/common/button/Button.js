import React from "react";
import { Button as MuiButton } from "@mui/material";
import { Box } from "@mui/material";

const Button = ({ text, onClick, disabled }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        minWidth: "300px",
        backgroundColor: "#f9f9f9",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <MuiButton
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        sx={{
          flex: 1,
          overflow: "hidden",
          padding: "10px 10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          borderRadius: "3px",
          backgroundColor: "#e9333c",
          color: "white", // Ensure the text color is white
          "&:hover": {
            backgroundColor: "#d42e35", // Slightly darker on hover
          },
          "&:disabled": {
            backgroundColor: "#cccccc",
            cursor: "not-allowed",
          },
          transition: "background-color 0.3s ease",
        }}
      >
        {text}
      </MuiButton>
    </Box>
  );
};

export default Button;
