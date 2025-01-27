import React, { useState, useEffect } from "react";
import message from "../../constants/message.js";
import { Box, Card, CardHeader, Avatar, Typography } from "@mui/material";
import { blueGrey, blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import PaperButton from "../../components/common/paper/PaperButton.js";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Divider from "../../components/common/divider/Divider.js";
import DefaultAvatar from "../../components/common/avatar/DefaultAvatar.js";

function ProfilePopUpCard({ closeDropdown, signInSinUpClick, logoutClick }) {
  const navigate = useNavigate();

  function handleCardClick(itemId) {
    // Close dropdown before navigating
    closeDropdown();
    // Navigate to the notification page and pass the itemId
    // navigate(`/profile/${itemId}`);
    if (itemId === 1) {
      navigate("/orders");
    } else if (itemId === 2) {
      navigate("/profile");
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={0.3} // Add spacing between cards
    >
      <Card display="flex" elevation={0} sx={{ paddingY: 0.5 }}>
        <CardHeader
          avatar={
            <DefaultAvatar
            // initials="SG"
            ></DefaultAvatar>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {message.welcome_msg}
            </Typography>
          }
          subheader={
            <Typography
              variant="body2"
              sx={{
                color: blue[500],
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={signInSinUpClick}
            >
              {message.signin_signup_msg}
            </Typography>
          }
        />
      </Card>

      <Divider sx={{ my: 0.5 }} />

      <PaperButton
        leftIcon={ArticleOutlinedIcon}
        onClick={() => handleCardClick(1)}
        text={message.orders}
        rightIcon={ChevronRightOutlinedIcon}
      />
      <PaperButton
        leftIcon={AccountCircleOutlinedIcon}
        onClick={() => handleCardClick(2)}
        text={message.account}
        rightIcon={ChevronRightOutlinedIcon}
      />
      <PaperButton
        leftIcon={LogoutOutlinedIcon}
        onClick={logoutClick}
        text={message.logout}
        rightIcon={ChevronRightOutlinedIcon}
      />
    </Box>
  );
}

export default ProfilePopUpCard;
