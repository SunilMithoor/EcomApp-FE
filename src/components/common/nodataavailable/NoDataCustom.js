import React from "react";
import { Box, Typography } from "@mui/material";
import messages from "../../../constants/message";

const NoDataCustom = ({ message = messages.no_data_available }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ textAlign: "center", padding: 2 }}
    >
      <img
        src="/svgs/no_data_available.svg"
        alt="No Data"
        style={{ minWidth: 250, minHeight: 250, marginBottom: 16 }} // Style the image
      />
      <Typography variant="h6" color="textSecondary">
        {message}
      </Typography>
    </Box>
  );
};

export default NoDataCustom;
