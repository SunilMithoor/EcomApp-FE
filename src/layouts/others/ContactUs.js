import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import ChatBot from "../chat/ChatBot";
import {} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import message from "../../constants/message";
import { LoadingButton } from "@mui/lab";
import { contactViaEmail } from "../../services/localService/LocalService";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ContactUsPhoneNos from "./ContactUsPhoneNos";
import ContactUsAddress from "./ContactUsAddress";
import {
  useFetchContactUsPhoneNos,
  useFetchContactUsAddress,
} from "../../hooks/useFetchContactUs";
import PropagateLoaders from "../../components/common/loaders/PropagateLoader";
import NoData from "../../components/common/nodataavailable/NoDataCustom";
import ContactUsMap from "./ContactUsMap";

function ContactUs() {
  const [chatOpen, setChatOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [buttonText, setButtonText] = useState(message.send);
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState("#d4a32b");
  const [emailError, setEmailError] = useState(false);
  const [validation, setValidation] = useState({
    email: "",
  });

  const contactUsPhoneRef = useRef(null);

  const { contactUsPhoneData, isContactUsPhoneLoading, contactUsPhoneError } =
    useFetchContactUsPhoneNos();

  // Normalize items to an empty array if null
  let contactUsPhoneItems = [];
  if (contactUsPhoneData.success === true) {
    contactUsPhoneItems = contactUsPhoneData.data || [];
  }

  const {
    contactUsAddressData,
    isContactUsAddressLoading,
    contactUsAddressError,
  } = useFetchContactUsAddress();

  // Normalize items to an empty array if null
  let contactUsAddressItems = [];
  if (contactUsAddressData.success === true) {
    contactUsAddressItems = contactUsAddressData.data || [];
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

  // Handle send button click
  const handleSend = async () => {
    if (!email || validation.email) {
      setButtonText("Please enter a valid email address!");
      setTimeout(() => {
        setButtonColor("#d4a32b"); // Reset button color after 3 seconds
        setButtonText(message.send);
      }, 3000);
      return;
    }
    setLoading(true);
    setEmailError(false);
    const data = await contactViaEmail();
    if (data?.success === true) {
      setLoading(false);
      setEmail("");
      setButtonText(data?.message || "Success");
    } else {
      setEmailError(true);
      setButtonColor("red");
      setLoading(false);
      setButtonText(data?.message || "Failure");
    }
    setTimeout(() => {
      setButtonColor("#d4a32b"); // Reset button color after 3 seconds
      setButtonText(message.send);
    }, 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f0f8f9",
        justifyContent: "centre",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            paddingY: 3,
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              mb: 2,
              textAlign: "left",
              color: "#10414b",
            }}
          >
            Get in touch
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Open Sans, sans-serif",
              mb: 3,
              textAlign: "left",
              color: "#43676e",
            }}
          >
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us.
          </Typography>
        </Box>
        {/* Contact Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Responsive layout
            gap: "20px",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              minHeight: { xs: "auto", sm: "280px" },
              minWidth: { xs: "auto", sm: "400px" },
              width: "100%",
              textAlign: "center",
              paddingX: "2px",
              paddingY: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
            }}
          >
            <CardContent>
              <PhoneOutlinedIcon
                sx={{ fontSize: 60, mb: 1, color: "#10414b" }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: "bold",
                  color: "#10414b",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Connect via Phone
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  padding: "10px",
                  textAlign: "center",
                  width: "100%",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontFamily: "Lexend Deca",
                  color: "#0068b1",
                }}
              >
                +91 XXXXXXXXXX
              </Typography>
              <Typography
                variant="body1"
                onClick={() =>
                  contactUsPhoneRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "0px",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  fontFamily: "Lexend Deca",
                  color: "#0068b1",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                View all global numbers
              </Typography>
              <KeyboardArrowDownOutlinedIcon
                sx={{ color: "#0068b1", paddingTop: "0px" }}
              />
            </CardContent>
          </Card>
          <Card
            sx={{
              minHeight: { xs: "auto", sm: "280px" },
              minWidth: { xs: "auto", sm: "400px" },
              width: "100%",
              textAlign: "center",
              paddingX: "2px",
              paddingY: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
            }}
          >
            <CardContent>
              <EmailOutlinedIcon
                sx={{ fontSize: 60, mb: 1, color: "#10414b" }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: "bold",
                  color: "#10414b",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Connect via Email
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
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
                    fontFamily: "Lexend Deca",
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

                <LoadingButton
                  variant="contained"
                  onClick={handleSend}
                  loading={loading}
                  loadingIndicator={
                    <CircularProgress size={24} sx={{ color: "white" }} /> // White loader
                  }
                  sx={{
                    fontWeight: "bold",
                    width: 300,
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
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            marginTop: 10,
            marginBottom: 0,
            height: "auto",
            width: "100%",
            minHeight: "300px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
            borderRadius: "5px",
          }}
        >
          <ContactUsMap />
        </Box>

        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            marginTop: "20px",
            height: "auto",
            width: "100%",
            minHeight: "300px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginTop: 8,
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              color: "#10414b",
              textAlign: "center",
              width: "100%",
            }}
          >
            {message.check_office_locations}
          </Typography>
          {/* Loader */}
          <PropagateLoaders loading={isContactUsAddressLoading} />

          {/* Error UI */}
          {!isContactUsAddressLoading && contactUsAddressError && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Alert severity="error">{contactUsAddressData.message}</Alert>
            </Box>
          )}

          {/* No Data UI */}
          {!isContactUsAddressLoading &&
            !contactUsAddressError &&
            contactUsAddressItems.length === 0 && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="300px"
              >
                <NoData message={contactUsAddressData.message} />
              </Box>
            )}

          {/* Success UI */}
          {!isContactUsAddressLoading &&
            !contactUsAddressError &&
            contactUsAddressItems.length > 0 && (
              <ContactUsAddress data={contactUsAddressItems} />
            )}
        </Box>

        <Box
          ref={contactUsPhoneRef}
          sx={{
            backgroundColor: "#f5f5f5",
            marginTop: "20px",
            height: "auto",
            width: "100%",
            minHeight: "300px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginTop: 8,
              fontFamily: "Raleway, sans-serif",
              fontWeight: "bold",
              color: "#10414b",
              textAlign: "center",
              width: "100%",
            }}
          >
            {message.call_us_msg}
          </Typography>
          {/* Loader */}
          <PropagateLoaders loading={isContactUsPhoneLoading} />

          {/* Error UI */}
          {!isContactUsPhoneLoading && contactUsPhoneError && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Alert severity="error">{contactUsPhoneData.message}</Alert>
            </Box>
          )}

          {/* No Data UI */}
          {!isContactUsPhoneLoading &&
            !contactUsPhoneError &&
            contactUsPhoneItems.length === 0 && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="300px"
              >
                <NoData message={contactUsPhoneData.message} />
              </Box>
            )}

          {/* Success UI */}
          {!isContactUsPhoneLoading &&
            !contactUsPhoneError &&
            contactUsPhoneItems.length > 0 && (
              <ContactUsPhoneNos data={contactUsPhoneItems} />
            )}
        </Box>
      </Box>

      {/* Floating Chat Icon */}
      <IconButton
        onClick={() => setChatOpen(!chatOpen)}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#2e475d",
          color: "white",
          padding: "15px",
          zIndex: 1000,
          "&:hover": { backgroundColor: "#2e475d" },
          transform: chatOpen ? "rotateY(180deg)" : "rotateY(0deg)", // Flip on toggle
          transition: "transform 0.3s ease-in-out", // Smooth transition
        }}
      >
        {chatOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      <ChatBot chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </div>
  );
}

export default ContactUs;
