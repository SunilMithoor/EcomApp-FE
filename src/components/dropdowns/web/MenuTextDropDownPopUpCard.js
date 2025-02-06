import React, { useState, useEffect } from "react";
import message from "../../../constants/message.js";
import { Typography, Box, Grid2, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blueGrey, red } from "@mui/material/colors";

function MenuTextDropDownPopUpCard({ data, type, closeDropdown }) {
  const items = Array.isArray(data) ? data : [];
  const navigate = useNavigate();

  // Manage individual loading states for each image
  const [loadingStates, setLoadingStates] = useState(
    items.map(() => true) // Initialize all as true (loading)
  );

  const handleImageLoad = (index) => {
    // Update the loading state for the specific image
    setLoadingStates((prev) =>
      prev.map((loading, i) => (i === index ? false : loading))
    );
  };

  const handleImageError = (index) => {
    // Fallback for image errors: Update the loading state
    setLoadingStates((prev) =>
      prev.map((loading, i) => (i === index ? false : loading))
    );
  };

  const handleClick = (itemId) => {
    closeDropdown();
    switch (type) {
      case "1":
        navigate(`/phones/${itemId}`);
        break;
      case "2":
        navigate(`/tablets/${itemId}`);
        break;
      case "3":
        navigate(`/wearables/${itemId}`);
        break;
      case "4":
        navigate(`/audio/${itemId}`);
        break;
      case "5":
        navigate(`/accessories/${itemId}`);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={0.3}
      paddingX={2}
      paddingY={2}
      justifyContent="flex-start" // Aligns grid items to the left
      alignItems="flex-start"
      textAlign="left"
    >
      <Grid2
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {items.map((item, index) => (
          <Grid2 xs={6} sm={3} key={index}>
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: 1,
                minHeight: "200px", // Increased minHeight to accommodate name at the bottom
                minWidth: "150px",
                maxWidth: "150px",
                margin: "0 auto",
                overflow: "hidden",
                display: "flex",
                cursor: "pointer",
                flexDirection: "column",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.1)",
                },
              }}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              {item.isNew && (
                <Box
                  sx={{
                    position: "absolute",
                    color: "white",
                    top: 8,
                    left: 8,
                    backgroundColor: red[900],
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "4px 8px",
                    borderRadius: "0px",
                  }}
                >
                  {message.new}
                </Box>
              )}

              {/* Image Box */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1, // Ensures the image container fills the available space
                  justifyContent: "center", // Vertically centers the image within the box
                  alignItems: "center", // Horizontally centers the image
                  padding: 0.5,
                  borderRadius: "2px",
                  background: blueGrey[50],
                  transition: "transform 0.3s ease-in-out", // Smooth zoom effect
                  "&:hover img": {
                    transform: "scale(1.1)", // Zoom-in effect on hover (increase scale value for stronger zoom)
                  },
                }}
              >
                {/* Show Skeleton while the image is loading */}
                {loadingStates[index] && (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100px"
                    sx={{ borderRadius: "4px" }}
                  />
                )}

                {/* Image */}
                <img
                  src={item.imgUrl}
                  alt={item.name || "Image"}
                  style={{
                    display: loadingStates[index] ? "none" : "block",
                    maxWidth: "150px",
                    maxHeight: "150px", // Ensure the image height doesn't exceed this value
                    width: "100%",
                    height: "auto", // Prevent the image from stretching
                    objectFit: "contain", // Prevent zooming and preserve aspect ratio
                    borderRadius: "4px",
                    transition: "transform 0.3s ease-in-out", // Smooth zoom transition
                  }}
                  onLoad={() => handleImageLoad(index)}
                  onError={() => handleImageError(index)}
                />
              </Box>

              {/* Name */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: 1, // Add some space below the name if needed
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default MenuTextDropDownPopUpCard;
