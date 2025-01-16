import React from "react";
import { CircularProgress, Box, Fade } from "@mui/material";
import { useState, useEffect } from "react";

function BouncingDotsLoader() {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVisible(false);
  //   }, 3000); // Loader disappears after 3 seconds for demo purposes
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Fade in={visible}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgcolor="rgba(255, 255, 255, 0.7)"
        zIndex={9999}
      >
        <CircularProgress color="primary" size={40} />
      </Box>
    </Fade>
  );
}

export default BouncingDotsLoader;
