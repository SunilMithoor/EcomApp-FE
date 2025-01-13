import React from "react";
import { CircularProgress, Box } from "@mui/material";

function CircularProgressLoading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress color="inherit" size="3rem" />
    </Box>
  );
}

export default CircularProgressLoading;
