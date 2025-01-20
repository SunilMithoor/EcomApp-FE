import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SearchPopUpCard({ data, closeDropdown }) {
  const navigate = useNavigate();

  const handleCardClick = (itemId) => {
    closeDropdown(); // Close the dropdown
    // navigate(`/search/${data.id}`, { state: { data } }); // Navigate and send data
    navigate(`/search/${itemId}`);
  };

  return (
    <Card
      sx={{ boxShadow: 0, cursor: "pointer", backgroundColor: "#F8F8F8" }}
      key={data.id}
      onClick={() => handleCardClick(data.id)}
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
          sx={{
            padding: 1,
            borderBottom: "1px solid #ddd",
            "&:last-child": { borderBottom: "none" },
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {data.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9em" }}
          >
            {data.description}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default SearchPopUpCard;
