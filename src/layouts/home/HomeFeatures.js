import React, { useState, useEffect } from "react";
import { Box, Skeleton, Typography, Grid2 } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import message from "../../constants/message";
import FeatureIcon from "../../components/common/featureicon/FeatureIcon";

function HomeFeatures({ data }) {
  const items = Array.isArray(data) ? data : [];

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={2}
      paddingX={2}
      paddingY={2}
      justifyContent="center" // Aligns grid items to the left
      alignItems="center"
      textAlign="center"
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Grid2
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {items.map((item, index) => (
          <Grid2 xs={6} sm={3} key={index}>
            <Box display="flex" flexDirection="row">
              <Box sx={{ padding: 0.5, marginTop: "2px" }}>
                <FeatureIcon type={index + 1} />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  padding: 0.5,
                  maxWidth: "180px",
                  minHeight: "100px", // Increased minHeight to accommodate name at the bottom
                  margin: "0 auto",
                  overflow: "hidden",
                  display: "flex",
                  cursor: "pointer",
                  flexDirection: "column",
                }}
                key={item.id}
              >
                {/* Name */}

                <Typography
                  variant="h1"
                  sx={{
                    textAlign: "left",
                    padding: 1,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    padding: 1,
                    textAlign: "left",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

export default HomeFeatures;
