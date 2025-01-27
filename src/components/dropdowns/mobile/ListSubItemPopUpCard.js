import React, { useState, useEffect } from "react";
import message from "../../../constants/message.js";
import { Typography, Box, Grid2, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blueGrey, red } from "@mui/material/colors";
import Divider from "../../common/divider/Divider.js";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";

function ListSubItemPopUpCard({ data, type, closeMenu, index }) {
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
    closeMenu();
    switch (index) {
      case "phones":
        navigate(`/phones/${itemId}`);
        break;
      case "tablets":
        navigate(`/tablets/${itemId}`);
        break;
      case "wearables":
        navigate(`/wearables/${itemId}`);
        break;
      case "audio":
        navigate(`/audio/${itemId}`);
        break;
      case "accessories":
        navigate(`/accessories/${itemId}`);
        break;
      default:
        break;
    }
  };

  const handlePageClick = () => {
    closeMenu();
    switch (index) {
      case "phones":
        navigate(`/phones`);
        break;
      case "tablets":
        navigate(`/tablets`);
        break;
      case "wearables":
        navigate(`/wearables`);
        break;
      case "audio":
        navigate(`/audio`);
        break;
      case "accessories":
        navigate(`/accessories`);
        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: 0.5,
          padding: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handlePageClick}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold", // Make the text bold
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            textAlign: "left", // Align text to the left
          }}
        >
          {message.explore_all(type)}
        </Typography>
        <TrendingFlatOutlinedIcon
          sx={{
            ml: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box
        display="flex"
        flexDirection="row"
        gap={0.3}
        padding={1}
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
            <Grid2 xs={12} sm={6} md={4} key={item.id || index}>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: 1,
                  minHeight: "150px", // Increased minHeight to accommodate name at the bottom
                  maxHeight: "150px",
                  minWidth: "120px",
                  maxWidth: "120px",
                  margin: "0 auto",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.1)",
                  },
                  cursor: "pointer",
                }}
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                {item.isNew && (
                  <Box
                    sx={{
                      position: "absolute",
                      color: "whitesmoke",
                      top: 8,
                      left: 8,
                      backgroundColor: red[900],
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "2px 4px",
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
                      maxWidth: "120px",
                      maxHeight: "100px", // Ensure the image height doesn't exceed this value
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
    </Box>
  );
}

export default ListSubItemPopUpCard;
