import React, { useState, useEffect } from "react";
import { Typography, Box, Grid2, Skeleton } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import messages from "../../constants/message";

function ContactUsAlternatingLayout({ data }) {
  const [items, setDataItems] = useState(Array.isArray(data) ? data : []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDataItems(data);
    }
  }, [data]); // This ensures `items` updates when `data` changes.

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
    <Box>
      {items.map((item, index) => (
        <Grid2 container spacing={3} alignItems="center" key={item.id}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              flexGrow: 1,
            }}
          >
            {index % 2 === 0 ? (
              <>
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    paddingY: 1,
                    flexGrow: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Grid2
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      paddingY: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // Center the content
                      justifyContent: "center", // Vertically center content
                      flexGrow: 1,
                      width: "100%",
                    }}
                  >
                    {/* Image Box */}
                    <Box
                      sx={{
                        width: "100%", // Full width for responsiveness
                        // maxWidth: { xs: "300px", sm: "400px", md: "500px" }, // Adjust for different screens
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", // Vertically center the image
                        alignItems: "center", // Horizontally center the image
                        background: blueGrey[50],
                        transition: "transform 0.3s ease-in-out", // Smooth zoom effect
                        "&:hover img": {
                          // transform: "scale(1.1)", // Zoom-in effect on hover
                        },
                      }}
                    >
                      {/* Show Skeleton while the image is loading */}
                      {loadingStates[index] && (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="auto"
                          sx={{ borderRadius: "4px" }}
                        />
                      )}

                      {/* Image */}
                      <img
                        src={item.imgUrl}
                        alt={item.name || "Image"}
                        style={{
                          display: loadingStates[index] ? "none" : "block",
                          width: "100%", // Ensure image fills the container
                          height: "auto", // Maintain aspect ratio
                          objectFit: "contain", // Prevent cropping/stretching
                          transition: "transform 0.3s ease-in-out", // Smooth zoom transition
                        }}
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                      />
                    </Box>
                  </Grid2>

                  <Grid2
                    item
                    xs={8}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // Center the entire content block
                      justifyContent: "center", // Vertically center the content
                      flexGrow: 1,
                      paddingX: 3,
                      width: "100%", // Ensures text doesn't collapse in the center
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      {/* Centering Box */}
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          color: "#10414b",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: 2,
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          color: "#10414b",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {messages.address}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Open Sans, sans-serif",
                          color: "#43676e",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: 2,
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          color: "#10414b",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {messages.phone}
                      </Typography>
                      {item.phoneNoData.map((contact, contactIndex) => (
                        <Typography
                          key={contactIndex}
                          variant="body2"
                          sx={{
                            mt: 1,
                            textAlign: "left",
                            width: "100%",
                            fontFamily: "Lexend Deca",
                            color: "#43676e",
                          }}
                        >
                          <strong
                            style={{
                              color: "#0068b1",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            {contact.phoneNo}
                          </strong>{" "}
                          ({contact.language})
                        </Typography>
                      ))}
                    </Box>
                  </Grid2>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    paddingY: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Grid2
                    item
                    xs={8}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // Center the entire content block
                      justifyContent: "center", // Vertically center the content
                      flexGrow: 1,
                      paddingX: 3,
                      width: "100%", // Ensures text doesn't collapse in the center
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      {/* Centering Box */}
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          color: "#10414b",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: 2,
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          color: "#10414b",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {messages.address}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Open Sans, sans-serif",
                          color: "#43676e",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {item.Address}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          marginTop: 2,
                          fontFamily: "Raleway, sans-serif",
                          fontWeight: "bold",
                          color: "#10414b",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        {messages.phone}
                      </Typography>
                      {item.phoneNoData.map((contact, contactIndex) => (
                        <Typography
                          key={contactIndex}
                          variant="body2"
                          sx={{
                            mt: 1,
                            textAlign: "left",
                            width: "100%",
                            fontFamily: "Lexend Deca",
                            color: "#43676e",
                          }}
                        >
                          <strong
                            style={{
                              color: "#0068b1",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            {contact.phoneNo}
                          </strong>{" "}
                          ({contact.language})
                        </Typography>
                      ))}
                    </Box>
                  </Grid2>

                  <Grid2
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      paddingY: 2,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // Center the content
                      justifyContent: "center", // Vertically center content
                      flexGrow: 1,
                    }}
                  >
                    {/* Image Box */}
                    <Box
                      sx={{
                        width: "100%", // Full width for responsiveness
                        // maxWidth: { xs: "300px", sm: "400px", md: "500px" }, // Adjust for different screens
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", // Vertically center the image
                        alignItems: "center", // Horizontally center the image
                        background: blueGrey[50],
                        transition: "transform 0.3s ease-in-out", // Smooth zoom effect
                        "&:hover img": {
                          // transform: "scale(1.1)", // Zoom-in effect on hover
                        },
                      }}
                    >
                      {/* Show Skeleton while the image is loading */}
                      {loadingStates[index] && (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height="auto"
                          sx={{ borderRadius: "4px" }}
                        />
                      )}

                      {/* Image */}
                      <img
                        src={item.imgUrl}
                        alt={item.name || "Image"}
                        style={{
                          display: loadingStates[index] ? "none" : "block",
                          width: "100%", // Ensure image fills the container
                          height: "auto", // Maintain aspect ratio
                          objectFit: "contain", // Prevent cropping/stretching
                          transition: "transform 0.3s ease-in-out", // Smooth zoom transition
                        }}
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                      />
                    </Box>
                  </Grid2>
                </Box>
              </>
            )}
          </Box>
        </Grid2>
      ))}
    </Box>
  );
}

export default ContactUsAlternatingLayout;
