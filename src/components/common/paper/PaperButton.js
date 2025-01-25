import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import Paper from "@mui/material/Paper";

function PaperButton({
  leftIcon: LeftIcon,
  onClick,
  text,
  rightIcon: RightIcon,
}) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        paddingY: 1,
        paddingX: 2,
        "&:hover": {
          backgroundColor: blueGrey[50],
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          {LeftIcon && (
            <IconButton size="small" sx={{ color: blueGrey[900] }}>
              <LeftIcon fontSize="small" />
            </IconButton>
          )}
          <Typography
            variant="subtitle1"
            fontWeight="normal"
            sx={{ color: "black", fontSize: "1em" }}
          >
            {text}
          </Typography>
        </Box>
        {RightIcon && (
          <IconButton size="small" sx={{ color: blueGrey[900] }}>
            <RightIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
}

export default PaperButton;
