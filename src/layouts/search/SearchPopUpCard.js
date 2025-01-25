import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blueGrey } from "@mui/material/colors";

function SearchPopUpCard({ data, closeDropdown }) {
  const navigate = useNavigate();

  const handleCardClick = (itemId) => {
    closeDropdown(); // Close the dropdown
    // navigate(`/search/${data.id}`, { state: { data } }); // Navigate and send data
    navigate(`/search/${itemId}`);
  };

  return (
    <Card
      elevation="0"
      sx={{ boxShadow: 0, cursor: "pointer", backgroundColor: "#fff" }}
      key={data.id}
      onClick={() => handleCardClick(data.id)}
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
