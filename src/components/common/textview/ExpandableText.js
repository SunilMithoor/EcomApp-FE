import React, { useState } from "react";
import { Typography, Button } from "@mui/material";

const ExpandableText = ({ text, maxLines = 2 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "none" : maxLines, // Show all lines when expanded
          WebkitBoxOrient: "vertical",
          overflow: expanded ? "visible" : "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {text}
      </Typography>
      <Button
        variant="text"
        size="small"
        sx={{ marginTop: 0.5 }}
        onClick={toggleExpand}
      >
        {expanded ? "View Less" : "View More"}
      </Button>
    </div>
  );
};

export default ExpandableText;
