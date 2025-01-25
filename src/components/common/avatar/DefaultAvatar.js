import React from "react";
import { Avatar } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person"; // Default user icon

function DefaultAvatar({ initials }) {
  return (
    <Avatar sx={{ bgcolor: blueGrey[900] }} aria-label="user">
      {initials ? initials : <PersonIcon fontSize="small" />}
    </Avatar>
  );
}

export default DefaultAvatar;
