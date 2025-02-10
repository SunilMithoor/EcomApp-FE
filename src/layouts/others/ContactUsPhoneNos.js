import React, { useState, useEffect, useRef } from "react";
import { Typography, Grid2 } from "@mui/material";
import { blue } from "@mui/material/colors";

function ContactUsPhoneNos({ data }) {
  const [items, setDataItems] = useState(Array.isArray(data) ? data : []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDataItems(data);
    }
  }, [data]); // This ensures `items` updates when `data` changes.

  return (
    <Grid2
      container
      spacing={2}
      sx={{ justifyContent: "space-evenly", marginTop: 2 }}
    >
      {items.map((region) => (
        <Grid2
          xs={12}
          key={region.id}
          sx={{
            minWidth: 300,
            padding: 3,
            boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.1)",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              textAlign: "left",
              color: "#10414b",
              padding: 1,
            }}
          >
            {region.title}
          </Typography>
          {region.data.map((contact, contactIndex) => (
            <Typography
              key={contactIndex}
              variant="body2"
              sx={{
                fontFamily: "Lexend Deca",
                mb: 1,
                textAlign: "left",
                color: "#43676e",
              }}
            >
              <span
                style={{
                  fontStyle: "bold",
                  color: "#0068b1",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {contact.phoneNo}{" "}
              </span>
              <span style={{ fontStyle: "normal" }}>({contact.language})</span>
            </Typography>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ContactUsPhoneNos;
