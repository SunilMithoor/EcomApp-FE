import React from "react";
import { Box, Typography } from "@mui/material";

const DividerWithText = () => {
  return (
    <Box display="flex" alignItems="center" width="100%" margin="8px 0">
      <Box flexGrow={1} height="1px" bgcolor="lightgray" />
      <Typography variant="body2" sx={{ padding: "0 8px", color: "gray" }}>
        OR
      </Typography>
      <Box flexGrow={1} height="1px" bgcolor="lightgray" />
    </Box>
  );
};

export default DividerWithText;
