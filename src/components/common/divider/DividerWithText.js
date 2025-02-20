import React from "react";
import { Box, Typography } from "@mui/material";
import message from "../../../constants/message";

function DividerWithText() {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      margin="4px 0"
      flexDirection="row"
    >
      <Box flexGrow={1} height="1px" bgcolor="lightgray" />
      <Typography variant="body2" sx={{ padding: "0 8px", color: "gray" }}>
        {message.or}
      </Typography>
      <Box flexGrow={1} height="1px" bgcolor="lightgray" />
    </Box>
  );
}

export default DividerWithText;
