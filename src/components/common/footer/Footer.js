import React, { useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Link,
  IconButton,
  TextField,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import {
  Facebook,
  X,
  Instagram,
  LinkedIn,
  YouTube,
  Email,
  Place,
  Fax,
  Call,
} from "@mui/icons-material";
import message from "../../../constants/message";
import { LoadingButton } from "@mui/lab";
import { addSubscriber } from "../../../services/localService/LocalService";
import { blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [buttonText, setButtonText] = useState("Subscribe");
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("#d4a32b");
  const [error, setError] = useState(false);
  const [validation, setValidation] = useState({
    email: "",
  });

  function handleClick(itemId) {
    switch (itemId) {
      case 1:
        navigate("/privacy-policy");
        break;
      case 2:
        navigate("/about-us");
        break;

      default:
        break;
    }
  }

  // Handle email input change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email
    if (!value) {
      setValidation({ email: "Email is required" });
    } else if (!emailRegex.test(value)) {
      setValidation({ email: "Enter a valid email address" });
    } else {
      setValidation({ email: "" });
    }
  };

  //   const handleSubscribe = async () => {};

  // Handle subscribe button click
  const handleSubscribe = async () => {
    if (!email || validation.email) {
      setButtonText("Please enter a valid email address!");
      setTimeout(() => {
        setButtonColor("#d4a32b"); // Reset button color after 3 seconds
        setButtonText("Subscribe");
      }, 3000);
      return;
    }
    setLoading(true);
    setError(false);
    const data = await addSubscriber();
    if (data?.success === true) {
      setLoading(false);
      setEmail("");
      setButtonText(data?.message || "Success");
    } else {
      setError(true);
      setButtonColor("red");
      setLoading(false);
      setButtonText(data?.message || "Failure");
    }
    setTimeout(() => {
      setButtonColor("#d4a32b"); // Reset button color after 3 seconds
      setButtonText("Subscribe");
    }, 3000);
  };

  return (
    <Box
      sx={{
        bgcolor: "#1c2431",
        color: "white",
      }}
    >
      {/* Social Media Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={"center"}
        sx={{
          padding: "1rem 1rem",
          // bgcolor: "#6451ce",
          bgcolor: blueGrey[900],
          textAlign: "start",
          mb: 2,
        }}
      >
        <Typography display="flex" flex={2} variant="body1" fontWeight={"bold"}>
          Get connected with us on social networks:
        </Typography>
        <Box>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </IconButton>

          <IconButton
            color="inherit"
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X />
          </IconButton>

          <IconButton
            color="inherit"
            component="a"
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </IconButton>

          <IconButton
            color="inherit"
            component="a"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </IconButton>

          <IconButton
            color="inherit"
            component="a"
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube />
          </IconButton>
        </Box>
      </Box>

      {/* Footer Content */}
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
        {/* About Us */}
        <Grid2 item xs={12} md={3} flex={1} sx={{ minWidth: 350 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              mb: 2,
              fontWeight: "bold",
              position: "relative",
              "::after": {
                content: '""',
                display: "block",
                width: "100px", // Adjust the width of the line
                height: "1px", // Adjust the thickness of the line
                backgroundColor: "red", // Line color
                position: "absolute",
                bottom: 0,
                left: 0,
              },
            }}
          >
            About Us
          </Typography>

          <CardMedia
            component="img"
            image={require("../../../assets/logo/logo_new_16.png")}
            alt={"Image"}
            loading="lazy"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              background: "#1c2431",
              maxWidth: 300,
              maxHeight: 100,
              objectFit: "cover", // Ensures the image covers the entire box
            }}
          />

          <Typography
            variant="body2"
            sx={{
              mr: 4,
              mt: 2,
              maxWidth: 350,
              textAlign: "left",
              lineHeight: 1.8, // Adjust the line height (e.g., 1.5, 1.8, 2, etc.)
            }}
          >
            Lorem ipsum is a dummy or placeholder text commonly used in graphic
            design, publishing, and web development to fill empty spaces in a
            layout that does not yet have content.
          </Typography>
        </Grid2>

        {/* Useful Links */}
        <Grid2 item xs={12} md={3} flex={1}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              mb: 2,
              fontWeight: "bold",
              position: "relative",
              "::after": {
                content: '""',
                display: "block",
                width: "100px", // Adjust the width of the line
                height: "1px", // Adjust the thickness of the line
                backgroundColor: "red", // Line color
                position: "absolute",
                bottom: 0,
                left: 0,
              },
            }}
          >
            Useful Links
          </Typography>
          <Link
            href="/about-us"
            textAlign="left"
            color="inherit"
            underline="hover"
            display="block"
            sx={{ mt: 2, mb: 2 }}
          >
            About
          </Link>
          <Link
            href="/contact-us"
            color="inherit"
            underline="hover"
            display="block"
            textAlign="left"
            sx={{ mt: 2, mb: 2 }}
          >
            Contact Us
          </Link>
          <Link
            href="/privacy-policy"
            color="inherit"
            underline="hover"
            display="block"
            textAlign="left"
            sx={{ mt: 2, mb: 2 }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-condition"
            color="inherit"
            underline="hover"
            display="block"
            textAlign="left"
            sx={{ mt: 2, mb: 2 }}
          >
            Terms & Conditions
          </Link>
        </Grid2>

        {/* Address */}
        <Grid2 item xs={12} md={3} flex={1}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              mb: 1,
              fontWeight: "bold",
              position: "relative",
              "::after": {
                content: '""',
                display: "block",
                width: "100px", // Adjust the width of the line
                height: "1px", // Adjust the thickness of the line
                backgroundColor: "red", // Line color
                position: "absolute",
                bottom: 0,
                left: 0,
              },
            }}
          >
            Contact Us
          </Typography>

          <Typography
            variant="body2"
            display="block"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            <IconButton color="inherit" sx={{ paddingLeft: 0 }}>
              <Email />
            </IconButton>
            sunil@gmail.com
          </Typography>
          <Typography
            variant="body2"
            display="block"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            <IconButton color="inherit" sx={{ paddingLeft: 0 }}>
              <Place />
            </IconButton>
            Bengaluru, KAR, INDIA
          </Typography>
          <Typography
            variant="body2"
            display="block"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            <IconButton color="inherit" sx={{ paddingLeft: 0 }}>
              <Call />
            </IconButton>
            +91 XXXXXXXXXX
          </Typography>
          <Typography
            variant="body2"
            display="block"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            <IconButton color="inherit" sx={{ paddingLeft: 0 }}>
              <Fax />
            </IconButton>
            +91 XXX XXX XXX
          </Typography>
        </Grid2>

        {/* News Letter */}
        <Grid2 item xs={12} md={3} flex={1} sx={{ minWidth: 350 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                mb: 2,
                fontWeight: "bold",
                position: "relative",
                "::after": {
                  content: '""',
                  display: "block",
                  width: "100px", // Adjust the width of the line
                  height: "1px", // Adjust the thickness of the line
                  backgroundColor: "red", // Line color
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                },
              }}
            >
              News Letter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 300,
                textAlign: "left",
                lineHeight: 1.5, // Adjust the line height (e.g., 1.5, 1.8, 2, etc.)
              }}
            >
              Subscribe to our newsletter to get your weekly dose of news,
              updates, tips and special offer.
            </Typography>

            {/* Input Field */}
            <TextField
              required
              id="email"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              size="small"
              color="#fff"
              alignItems="left"
              error={!!validation.email}
              sx={{
                alignItems: "left",
                mt: 2,
                mb: 2,
                bgcolor: "white",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                },
                flex: 1,
                textAlign: "left",
                maxWidth: 300,
              }}
              slotProps={{
                input: {
                  maxLength: 100,
                  shrink: true,
                  placeholder: message.email_msg,
                },
              }}
            />

            {/* Subscribe Button */}

            {/* <LoadingButton
              variant="contained"
              onClick={handleSubscribe}
              loading={loading}
              loadingIndicator={
                <Box
                  sx={{
                    color: "#fff59d", // Light yellow loader color
                  }}
                >
                  <span className="loader"></span>
                </Box>
              }
              sx={{
                fontWeight: "bold",
                maxWidth: 300,
                bgcolor: "#d4a32b",
                color: loading ? "#fff59d" : "black",
                borderRadius: "2px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#c09227",
                },
              }}
            >
              {buttonText}
            </LoadingButton> */}
            <LoadingButton
              variant="contained"
              onClick={handleSubscribe}
              loading={loading}
              loadingIndicator={
                <CircularProgress size={24} sx={{ color: "white" }} /> // White loader
              }
              sx={{
                fontWeight: "bold",
                maxWidth: 300,
                bgcolor: buttonColor, // Keep button background gold
                color: "black", // Button text color
                borderRadius: "2px",
                textTransform: "none",
                display: "flex", // Flexbox to align content
                justifyContent: "center", // Center text
                alignItems: "center", // Center text vertically
                gap: 2, // Space between text and loader
                "&:hover": {
                  bgcolor: "#c09227", // Darker hover color
                },
              }}
            >
              {buttonText}
            </LoadingButton>
          </Box>
        </Grid2>
      </Grid2>

      {/* Footer Bottom */}
      <Box
        sx={{
          bgcolor: "#151b29",
          textAlign: "center",
          padding: "0.5rem 0.5rem",
        }}
      >
        <Typography variant="body2">
          © 2025 MG App. Website designed & built with ♥ by Sunil
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
