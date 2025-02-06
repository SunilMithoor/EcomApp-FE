import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

function ExpandUi({ data }) {
  const [expandedData, setExpandedData] = useState("");

  useEffect(() => {
    const updateExpandedData = () => {
      const containerWidth =
        document.getElementById("expand-box")?.offsetWidth || 0;
      const charWidth = 10; // Approximate width of '/'
      const maxChars = Math.floor(containerWidth / charWidth);
      setExpandedData(data.repeat(maxChars));
    };

    updateExpandedData();
    window.addEventListener("resize", updateExpandedData);

    return () => window.removeEventListener("resize", updateExpandedData);
  }, [data]);

  return (
    <Box
      id="expand-box"
      sx={{ flexGrow: 1, overflow: "hidden", maxWidth: "100%" }}
    >
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "nowrap",
          fontFamily: "monospace",
          overflow: "hidden",
        }}
      >
        {expandedData}
      </Typography>
    </Box>
  );
}

export default ExpandUi;
