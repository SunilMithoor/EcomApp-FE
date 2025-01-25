import React, { useState, useEffect } from "react";
import message from "../../constants/message.js";
import {
  CardMedia,
  Typography,
  Box,
  Card,
  CardActionArea,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { calculateTimeDifference } from "../../utils/DateTimeUtils.js";
import { useNavigate } from "react-router-dom";

function NotificationPopUpCard({ data, closeDropdown }) {
  const navigate = useNavigate();
  const items = Array.isArray(data) ? data : [];

  const handleCardClick = (itemId) => {
    // Close dropdown before navigating
    closeDropdown();
    // Navigate to the notification page and pass the itemId
    navigate(`/notifications/${itemId}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={0.3} // Add spacing between cards
    >
      {items.map((item) => (
        <Card
          elevation="0"
          sx={{ boxShadow: 0, cursor: "pointer", backgroundColor: "#fff" }}
          key={item.id}
          onClick={() => handleCardClick(item.id)}
        >
          <CardActionArea
            variant="outlined"
            sx={{
              "&[data-active]": {
                backgroundColor: "#fff", // Active background color
                "&:hover": {
                  backgroundColor: blueGrey[50], // Darker hover color
                },
              },
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center" // Center the image and text container vertically
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: 1,
                borderBottom: "1px solid #ddd",
                "&:last-child": { borderBottom: "none" },
              }}
            >
              {/* Centered Image */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: "flex",
                  alignItems: "center", // Center image vertically
                  justifyContent: "center", // Center image horizontally
                  borderRadius: 1, // Optional: Add rounded corners
                  overflow: "hidden", // Optional: Clip image to container size
                  marginRight: 2, // Space between image and text
                }}
              >
                <CardMedia
                  component="img"
                  image={item.imgUrl}
                  alt={item.name || "No image available"}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ensures the image covers the entire box
                  }}
                />
              </Box>

              {/* Left-Aligned Text */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // Align text to the left
                  justifyContent: "center", // Center the text vertically
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="normal"
                  sx={{
                    fontSize: "1.2em",
                    textAlign: "left", // Align text to the left
                    lineHeight: 1.2,
                  }}
                >
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: "0.9em",
                    textAlign: "left",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // Limit to 2 lines
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.description || message.no_desc_available}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: blueGrey[900],
                    textAlign: "left", // Align text to the left
                    fontSize: "1em",
                    marginTop: 0.5,
                  }}
                >
                  {calculateTimeDifference(item.dateTime)}
                </Typography>
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default NotificationPopUpCard;
