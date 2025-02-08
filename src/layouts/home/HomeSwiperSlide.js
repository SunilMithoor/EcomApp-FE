import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { Box, Card, Skeleton, CardContent, Typography } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import message from "../../constants/message";
import Button from "../../components/common/button/Button";

// Import Swiper modules
import {
  EffectCreative,
  Pagination,
  Navigation,
  Keyboard,
  Autoplay,
  Parallax,
  Mousewheel,
} from "swiper/modules";

const effects = ["flyeye", "morph-x", "peel-x", "pixelize", "ripple"];

const handleNavigate = (itemId) => {};

function HomeSwiperSlide({ data }) {
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

  return (
    <Box
      sx={{
        width: "100%", // Ensure it takes full width
        maxWidth: { xs: "calc(100vw - 15px", md: "auto" },
        display: "flex",
        justifyContent: "center",
        position: "relative",
        padding: { xs: 1, md: 3 }, // Reduce padding for small screens
      }}
    >
      <Swiper
        spaceBetween={30}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        parallax={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1} // Ensures full width on mobile
        breakpoints={{
          768: {
            slidesPerView: "auto", // Auto layout for tablets and desktops
          },
        }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, -400],
            opacity: 0,
          },
          next: {
            translate: [0, 0, 0],
            opacity: 1,
          },
        }}
        modules={[
          Parallax,
          Keyboard,
          EffectCreative,
          Pagination,
          Navigation,
          Mousewheel,
          Autoplay,
        ]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} style={{ position: "relative" }}>
            <Card
              sx={{
                width: "100%", // Ensures full width
                maxWidth: "100%",
                height: "auto",
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#FADF8D",
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack items vertically on mobile
                alignItems: "center",
                justifyContent: "center", // Ensures center alignment
                padding: { xs: 1, md: 3 }, // Reduce padding on small screens
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  color: "white",
                  display: "flex",
                  paddingX: 5,
                  paddingY: 5,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%", // Ensures it takes full width
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    padding: { xs: 1, md: 3 },
                    boxSizing: "border-box", // Prevents unwanted spacing issues
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      paddingX: 3,
                      display: "flex",
                      textAlign: "flex-start",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div data-swiper-parallax="-300">
                      <Typography variant="h1">{item.name}</Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {item.description}
                      </Typography>

                      <MuiButton
                        variant="contained"
                        onClick={handleNavigate(item.id)}
                        sx={{
                          flex: 1,
                          overflow: "hidden",
                          padding: "10px 10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "20px",
                          marginBottom: "20px",
                          minWidth: "300px",
                          fontSize: "16px",
                          borderRadius: "3px",
                          backgroundColor: "secondary-main",
                          color: "white", // Ensure the text color is white
                          "&:hover": {
                            backgroundColor: "secondary-main", // Slightly darker on hover
                          },
                          "&:disabled": {
                            backgroundColor: "#cccccc",
                            cursor: "not-allowed",
                          },
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {message.explore_item(item.name)}
                      </MuiButton>
                    </div>
                  </Box>

                  <h3 style={{ width: 200 }}>{}</h3>

                  <Box
                    sx={{
                      maxHeight: { xs: "250px", md: "350px" }, // Reduce height for mobile
                      maxWidth: { xs: "100%", md: 350 }, // Ensure full width on mobile
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1, // Ensures the image container fills the available space
                      justifyContent: "center", // Vertically centers the image within the box
                      alignItems: "center", // Horizontally centers the image
                      padding: 0.5,
                      borderRadius: "2px",
                      transition: "transform 0.3s ease-in-out", // Smooth zoom effect
                      "&:hover img": {
                        transform: "scale(1.1)", // Zoom-in effect on hover (increase scale value for stronger zoom)
                      },
                    }}
                    data-swiper-parallax-scale="0.3"
                  >
                    {/* Show Skeleton while the image is loading */}
                    {loadingStates[index] && (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="300px"
                        sx={{ borderRadius: "4px" }}
                      />
                    )}

                    {/* Image */}
                    <img
                      src={item.imgUrl}
                      alt={item.name || "Image"}
                      style={{
                        display: loadingStates[index] ? "none" : "block",
                        maxWidth: "300px",
                        maxHeight: "300px", // Ensure the image height doesn't exceed this value
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
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default HomeSwiperSlide;
