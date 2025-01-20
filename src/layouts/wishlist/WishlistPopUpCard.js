import React, { useState, useEffect } from "react";
import message from "../../constants/message.js";
import {
  CardMedia,
  Typography,
  Button,
  Box,
  Card,
  CardActionArea,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function WishlistPopUpCard({ data, closeDropdown, onItemRemove }) {
  const navigate = useNavigate();
  const items = Array.isArray(data) ? data : [];

  const handleAddToCart = (e, itemId) => {
    e.stopPropagation();
    onItemRemove(itemId); // Call the parent function to remove the item
    console.log("Add to cart clicked for item:", itemId);
  };

  const handleCardClick = (itemId) => {
    closeDropdown(); // Close the dropdown
    navigate(`/wishlist/${itemId}`); // Navigate with the itemId
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={0.3} // Add spacing between cards
    >
      {items.map((item) => (
        <Card
          sx={{ boxShadow: 0, cursor: "pointer", backgroundColor: "#F8F8F8" }}
          key={item.id}
          onClick={() => handleCardClick(item.id)}
        >
          <CardActionArea
            variant="outlined"
            sx={{
              "&[data-active]": {
                backgroundColor: "#F8F8F8", // Active background color
                "&:hover": {
                  backgroundColor: "#CFCFCF", // Darker hover color
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
                  backgroundColor: blueGrey[50], // Optional: Placeholder background color
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

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 0.5, // Add some spacing above the button
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: "200px",
                      width: "100%", // Ensure it takes full width up to the max width
                      textTransform: "none", // Keep button text capitalization
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      // Add your add-to-cart logic here
                      handleAddToCart(e, item.id);
                    }}
                  >
                    {message.add_to_cart}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default WishlistPopUpCard;
