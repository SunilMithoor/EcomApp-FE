import React, { useState, useEffect, useRef } from "react";
import message from "../../constants/message";
import {
  CardContent,
  Card,
  Stack,
  IconButton,
  Typography,
  Box,
  Grid2,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blueGrey, red } from "@mui/material/colors";
import ExpandUi from "../../components/common/expandui/ExpandUi";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomeReviews({ data }) {
  const items = Array.isArray(data) ? data : [];
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (event) => {
    isDragging.current = true;
    startX.current = event.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isDragging.current) return;
    event.preventDefault();
    const x = event.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

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

  const handleCardClick = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "calc(100vw - 15px)",
          overflow: "hidden", // Prevents horizontal scrollbar
          flexWrap: "nowrap", // Ensures items stay in one row
        }}
      >
        <Typography
          variant="h1"
          sx={{
            textAlign: "left",
            padding: 1,
            whiteSpace: "nowrap",
          }}
        >
          {message.reviews}
        </Typography>

        <ExpandUi data="/" />
      </Box>

      <Box>
        <Box sx={{ mt: 3, textAlign: "start" }}>
          <Stack
            direction="row"
            spacing={2}
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            sx={{
              overflowX: "auto",
              px: 2,
              py: 2,
              marginTop: 1,
              marginBottom: 2,
            }}
          >
            {items.map((review, index) => (
              <Card
                key={index}
                sx={{
                  maxWidth: 300,
                  minWidth: 200,
                  maxHeight: 300,
                  minHeight: 200,
                  borderRadius: 2,
                  p: 0.5,
                  boxShadow: 2,
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => handleCardClick(review)}
              >
                <CardContent>
                  <Box sx={{ mb: 1 }}>{renderStars(review.rating)}</Box>
                  <Typography variant="h6" fontWeight="bold">
                    {review.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {review.location}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>{review.comments}</Typography>
                </CardContent>

                {/* Image Thumbnails */}

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 1,
                    overflowX: "auto",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {review.imgUrls?.slice(0, 3).map((image, i) => (
                    <Box key={i} sx={{ position: "relative" }}>
                      {/* Show Skeleton while the image is loading */}
                      {loadingStates[index] && (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="80px"
                          sx={{ borderRadius: "4px" }}
                        />
                      )}

                      {/* Image */}
                      <img
                        src={image}
                        alt={"Images"}
                        style={{
                          display: loadingStates[index] ? "none" : "block",
                          maxWidth: "80px",
                          maxHeight: "80px", // Ensure the image height doesn't exceed this value
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
                  ))}
                  {review.imgUrls?.length > 3 && (
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        backgroundColor: blueGrey[200],
                        borderRadius: 4,
                        fontWeight: "bold",
                      }}
                    >
                      +{review.imgUrls.length - 3}
                    </Box>
                  )}
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Modal */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          disableAutoFocus={true}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "90%",
              maxWidth: 700,
              bgcolor: "background.paper",
              boxShadow: 1,
              p: 4,
              borderRadius: 1,
              outline: "none",
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Grid2 container spacing={2}>
              {/* Left Side - Swiper Image Slider */}
              <Grid2 item xs={12} md={6}>
                {selectedReview?.imgUrls?.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                    style={{ width: "100%", height: "100%" }}
                  >
                    {selectedReview.imgUrls.map((image, i) => (
                      <SwiperSlide key={i}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <img
                            src={image}
                            alt={`Review ${i}`}
                            style={{
                              width: "100%",
                              maxHeight: "300px",
                              objectFit: "contain",
                              borderRadius: "2px",
                            }}
                          />
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  ""
                  // <Typography>No Images Available</Typography>
                )}
              </Grid2>

              {/* Right Side - Review Details */}
              <Grid2 item xs={12} md={6}>
                <Box sx={{ mb: 1 }}>{renderStars(selectedReview?.rating)}</Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedReview?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedReview?.location}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {selectedReview?.comments}
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default HomeReviews;
