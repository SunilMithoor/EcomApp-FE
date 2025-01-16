import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { Typography, Box } from "@mui/material";
import message from "../../../constants/message";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import EmailIcon from "@mui/icons-material/Email";
import Divider from "../divider/Divider";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: theme.spacing(0.5),
    border: 0,
    borderRadius: theme.shape.borderRadius,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: 0,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));

function ToggleButtonCustomize({ alignment, handleAlignment }) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      sx={{ gap: 0, padding: 0 }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <StyledToggleButtonGroup
          size="medium"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value={0} // Corresponds to "Email"
            aria-label="left aligned"
            sx={{
              paddingX: 1,
              paddingY: 1,
            }}
          >
            <EmailIcon />
            <Typography
              variant="inherit"
              fontWeight="small"
              color="#000"
              sx={{
                paddingX: 1,
                paddingY: 0,
                textTransform: "none",
              }}
            >
              {message.email}
            </Typography>
          </ToggleButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginX: 1,
              backgroundColor: (theme) => theme.palette.divider,
            }}
          />

          <ToggleButton
            value={1} // Corresponds to "Mobile"
            aria-label="right aligned"
            sx={{
              paddingX: 1,
              paddingY: 1,
            }}
          >
            <AdUnitsIcon />
            <Typography
              variant="inherit"
              fontWeight="small"
              color="#000"
              sx={{
                paddingX: 1,
                paddingY: 0,
                textTransform: "none",
              }}
            >
              {message.mobile}
            </Typography>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </Box>
  );
}

export default ToggleButtonCustomize;
