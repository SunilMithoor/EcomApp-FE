import React from "react";
import { Box, Typography } from "@mui/material";
import NoDataImage from "@mui/icons-material/ErrorOutline"; // You can use a Material-UI icon
import messages from "../../../constants/message";

function NoData({ message = messages.no_data_available }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ textAlign: "center", padding: 2 }}
    >
      <NoDataImage sx={{ fontSize: 50, marginBottom: 2 }} />{" "}
      {/* Material-UI icon */}
      <Typography variant="body1" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
}

export default NoData;
