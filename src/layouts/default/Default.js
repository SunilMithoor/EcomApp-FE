import React, { useState } from "react";
import { Box, Typography, Grid2, Button } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import urls from "../../constants/urls";
import message from "../../constants/message";
import Skeleton from "@mui/material/Skeleton";

function DefaultPage() {
  const [loading, setLoading] = useState(true); // Track image loading state

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Grid2
        container
        spacing={3}
        alignContent={"left"}
        flex={1}
        justifyContent="center"
        sx={{
          paddingX: 2,
          mb: 3,
          mt: 3,
          flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
        }}
      >
        <Grid2
          item
          xs={12}
          md={3}
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              mb: 2,
              textAlign: "left",
              color: "#10414b",
            }}
          >
            {message.welcome_msg}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Open Sans, sans-serif",
              mb: 3,
              lineHeight: 1.8,
              textAlign: "left",
              color: "#43676e",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            malesuada luctus eros, eu accumsan orci ullamcorper id. Mauris
            convallis ligula nec orci sollicitudin feugiat. Ut vel lacus non
            elit ultricies consequat at non purus.
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              textTransform: "none",
              bgcolor: "#c09227", // Background color
              color: "black", // Text color
              paddingX: 2,
              paddingY: 1,
              "&:hover": {
                bgcolor: "#a77c1e",
              },
            }}
          >
            {message.learn_more}
          </Button>
        </Grid2>

        <Grid2 item xs={12} md={3} flex={2}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "200px", sm: "400px" }, // Explicit height to ensure Skeleton fills the area
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Circular Loader */}
            {loading && (
              <Skeleton
                animation="wave"
                variant="rectangular" // Use rectangular variant for full-box appearance
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
              />
            )}

            {/* Image */}
            <img
              src={urls.home_url}
              alt={"Not Available"}
              style={{
                maxWidth: "100%",
                height: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                display: loading ? "none" : "block", // Hide the image until loaded
              }}
              onLoad={() => setLoading(false)} // Set loading to false when the image loads
              onError={() => setLoading(false)} // Handle loading state in case of an error
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default DefaultPage;
