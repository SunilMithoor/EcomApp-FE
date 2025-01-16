import React, { useState } from "react";
// import "./Footer.css";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";

// function Footer() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [buttonText, setButtonText] = useState("Subscribe");

//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   // Handle email input change
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   // Validate email format
//   const isValidEmail = (email) => {
//     return emailRegex.test(email);
//   };

//   // Function to handle email subscription
//   const handleSubscribe = async () => {
//     if (email) {
//       // Check if the email is valid
//       if (!isValidEmail(email)) {
//         setButtonText("Please enter a valid email address.");
//         setTimeout(() => {
//           setButtonText(buttonText);
//         }, 3000);
//         return;
//       }
//       // const success = await addSubscriber(email);
//       const success = true;
//       setButtonText(success);
//       setEmail("");
//       setTimeout(() => {
//         setButtonText(buttonText);
//       }, 3000);
//     } else {
//       setButtonText("Please enter a valid email address.");
//       setTimeout(() => {
//         setButtonText(buttonText);
//       }, 3000);
//     }
//   };

//   return (
//     <div className="footer">
//       <div className="subscription-section">
//         <h1 className="footer-header">The Travel Letter</h1>
//         <p className="footer-subtitle">
//           Get inspired, receive travel discounts, tips, and behind-the-scenes
//           stories.
//         </p>
//         <div className="subscription-box">
//           <input
//             type="email"
//             className="email-input"
//             placeholder="Your email address"
//             value={email}
//             onChange={handleEmailChange}
//           />
//           <button className="subscribe-button" onClick={handleSubscribe}>
//             {buttonText}
//           </button>
//           {message && <p className="subscription-message">{message}</p>}
//         </div>
//       </div>
//       <div className="info-section">
//         <div className="info-column">
//           <h3>Travel Blogs</h3>
//           <ul>
//             <li>Bali Travel Guide</li>
//             <li>India T Guide</li>
//             <li>Canada T Guide</li>
//           </ul>
//         </div>
//         <div className="info-column">
//           <h3>Tips & Tricks</h3>
//           <ul>
//             <li>How to Start a Blog</li>
//             <li>Reduce Travel Plastic</li>
//           </ul>
//         </div>
//         <div className="info-column">
//           <h3>About Us</h3>
//           <ul>
//             <li>Work With Us</li>
//             <li>Our Story</li>
//           </ul>
//         </div>
//         <div className="info-column">
//           <h3>Contact Us</h3>
//           <ul>
//             <li>sunil@gmail.com</li>
//           </ul>
//         </div>
//       </div>
//       <div className="footer-end">
//         <p>© 2025 Ecomm App. Website designed & built with ♥ by Sunil</p>
//       </div>
//     </div>
//   );
// }

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("Subscribe");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  // Function to handle email subscription
  const handleSubscribe = async () => {
    if (email) {
      // Check if the email is valid
      if (!isValidEmail(email)) {
        setButtonText("Please enter a valid email address.");
        setTimeout(() => {
          setButtonText("Subscribe");
        }, 3000);
        return;
      }

      // Simulate API call
      const success = true;
      setButtonText(success ? "Subscribed!" : "Try Again");
      setEmail("");
      setTimeout(() => {
        setButtonText("Subscribe");
      }, 3000);
    } else {
      setButtonText("Please enter an email address.");
      setTimeout(() => {
        setButtonText("Subscribe");
      }, 3000);
    }
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: theme.palette.text.primary,
        p: 4,
        textAlign: "center",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Subscription Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          The Travel Letter
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Get inspired, receive travel discounts, tips, and behind-the-scenes
          stories.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            type="email"
            variant="outlined"
            placeholder="Your email address"
            value={email}
            onChange={handleEmailChange}
            sx={{ width: { xs: "100%", sm: "50%" } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubscribe}
            sx={{ borderRadius: 20, px: 4 }}
          >
            {buttonText}
          </Button>
        </Box>
        {message && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>

      {/* Information Section */}
      <Grid
        container
        spacing={3}
        sx={{ textAlign: { xs: "center", sm: "left" } }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Travel Blogs</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Bali Travel Guide" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="India Travel Guide" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Canada Travel Guide" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Tips & Tricks</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="How to Start a Blog" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Reduce Travel Plastic" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">About Us</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Work With Us" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Our Story" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6">Contact Us</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="sunil@gmail.com" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

      {/* Footer End */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="body2">
          © 2025 Ecomm App. Website designed & built with ♥ by Sunil
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
