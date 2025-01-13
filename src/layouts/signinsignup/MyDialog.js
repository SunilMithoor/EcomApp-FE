import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  OutlinedInput,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DividerWithText from "../../components/dividerwithtext/DividerWithText.js";
import { SocialIcon } from "react-social-icons";
import OtpInput from "react-otp-input";

const MyDialog = ({ isOpen, onClose, fullScreen }) => {
  const [activeForm, setActiveForm] = useState("login");
  const [activeTab, setActiveTab] = useState(0); // 0 for Email, 1 for Mobile
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  });
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", password: "", isChecked: false });
      setValidation({ name: "", email: "", password: "" });
      setOtpSent(false);
    }
  }, [isOpen]);

  const validateField = (field, value, passwordValue) => {
    let message = "";
    switch (field) {
      case "name":
        if (!value.trim()) message = "Name is required.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) message = "Enter a valid email.";
        break;
      case "password":
        if (value.length < 6)
          message = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value.length < 6) {
          message = "Password must be at least 6 characters.";
        } else if (value !== passwordValue) {
          message = "Passwords do not match.";
        }
        break;
      case "mobile":
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(value))
          message = "Enter a valid 10-digit number.";
        break;
      default:
        break;
    }
    return message;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    let validationMessage = "";
    if (id === "confirmPassword") {
      validationMessage = validateField(id, value, formData.password);
    } else {
      validationMessage = validateField(id, value);
    }
    setValidation({
      ...validation,
      [id]: validationMessage,
    });
  };

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;

  //   // if (/^\d*$/.test(value) && value.length <= 10) {
  //   //   setFormData((prev) => ({ ...prev, mobile: value }));
  //   // }

  //   setFormData((prev) => ({ ...prev, [id]: value }));
  //   setValidation((prev) => ({
  //     ...prev,
  //     [id]: validateField(id, value),
  //   }));
  // };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, isChecked: e.target.checked }));
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    alert("OTP has been sent to your mobile number.");
  };

  const handleResendOtp = () => {
    alert("OTP has been resent to your mobile number.");
  };

  const isLoginValid =
    formData.email &&
    !validation.email &&
    formData.password &&
    !validation.password;

  const isRegisterValid =
    formData.name &&
    !validation.name &&
    formData.email &&
    !validation.email &&
    formData.password &&
    !validation.password &&
    formData.confirmPassword &&
    !validation.confirmPassword &&
    formData.isChecked;

  const [otp, setOtp] = useState("");

  // const handleSetOtp = (e) => {
  //   if (e.length === 6) {
  //     setOtp(e);
  //   }
  // };

  const isMobileLoginValid = otpSent && otp.length === 6;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      alert(
        `${activeForm === "login" ? "Login" : "Register"} successful via ${
          activeTab === 0 ? "Email" : "Mobile"
        }!`
      );
    }, 2000);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialogContent-root": {
          minHeight: 400, // Set minimum height
          overflow: "hidden", // Prevent scrollbar
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#E3F2FD" }}
        id="customized-dialog-title"
      >
        {activeForm === "login" ? "Sign In" : "Sign Up"}
        <Typography
          variant="subtitle2"
          sx={{ marginTop: "2px", fontSize: "14px", color: "gray" }}
        >
          {activeForm === "login"
            ? "Sign-in to continue"
            : "Fill the details to register"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[900],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {activeForm === "login" && (
          <>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{ marginBottom: 2 }}
            >
              <Tab label="Email" />
              <Tab label="Mobile" />
            </Tabs>

            {activeTab === 0 && (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minWidth: "250px",
                }}
              >
                <TextField
                  required
                  id="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  helperText={validation.email}
                  error={!!validation.email}
                  inputProps={{
                    maxLength: 100, // Enforce max length of 10 digits
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  helperText={validation.password}
                  error={!!validation.password}
                  inputProps={{
                    maxLength: 50, // Enforce max length of 10 digits
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <LoadingButton
                  onClick={handleSubmit}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{
                    width: "250px",
                    alignSelf: "center",
                    backgroundColor: "#d42e35",
                    "&:hover": {
                      backgroundColor: "#b8262d", // Darker red on hover
                    },
                  }}
                  disabled={!isLoginValid}
                >
                  Login
                </LoadingButton>
                <DividerWithText />
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    fontSize: "14px",
                    flexDirection: "row",
                    color: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  sign-in with
                </Typography>

                <div>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 2,
                    }}
                  >
                    <SocialIcon network="facebook" />
                    <SocialIcon network="twitter" />
                    <SocialIcon network="google" />
                    <SocialIcon network="linkedin" />
                    <SocialIcon network="x" />
                  </Box>
                </div>
              </form>
            )}
            {activeTab === 1 && (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minWidth: "250px",
                }}
              >
                <TextField
                  required
                  id="mobile"
                  label="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  variant="outlined"
                  helperText={validation.mobile}
                  error={!!validation.mobile}
                  onKeyDown={(e) => {
                    // Allow only numbers, backspace, and arrow keys
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ];
                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  inputProps={{
                    maxLength: 10, // Enforce max length of 10 digits
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  // slots={{
                  //   textFieldAdornment: InputAdornment,
                  // }}
                  // slotProps={{
                  //   textFieldAdornment: {
                  //     position: "start",
                  //     children: <PhoneIcon />, // Render the PhoneIcon here
                  //   },
                  //   input: { maxLength: 10 }, // Enforce max length
                  // }}
                />

                {otpSent && (
                  // <TextField
                  //   required
                  //   id="otp"
                  //   label="Enter OTP"
                  //   type="text"
                  //   value={formData.otp}
                  //   onChange={(e) =>
                  //     setFormData((prev) => ({
                  //       ...prev,
                  //       otp: e.target.value,
                  //     }))
                  //   }
                  //   variant="outlined"
                  //   InputLabelProps={{ shrink: true }}
                  // />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column", // Align items vertically
                      alignItems: "center", // Center the items horizontally
                      gap: "16px", // Increase the gap between "Enter OTP" and OTP input
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "start",
                        fontSize: "18px",
                        marginTop: 1,
                        cursor: "pointer",
                        color: "black",
                      }}
                    >
                      Enter OTP
                    </Typography>
                    <OtpInput
                      required
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      placeholder="------"
                      renderSeparator={
                        <span style={{ margin: "0 8px" }}> </span>
                      } // Adds space between inputs
                      renderInput={(props) => (
                        <input
                          {...props}
                          type="text" // We use text type to allow custom input restrictions
                          pattern="[0-9]*" // Restrict input to numbers only
                          inputMode="numeric" // Numeric keypad on mobile devices
                          maxLength={1} // Allow only one character per input field
                          onInput={(e) => {
                            // Allow only numeric characters
                            if (!/^\d$/.test(e.target.value)) {
                              e.target.value = ""; // Clear non-numeric input
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                )}

                {!otpSent ? (
                  <LoadingButton
                    onClick={handleSendOtp}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    sx={{
                      width: "250px",
                      alignSelf: "center",
                      backgroundColor: "#d42e35",
                      "&:hover": {
                        backgroundColor: "#b8262d", // Darker red on hover
                      },
                    }}
                    disabled={!formData.mobile || !!validation.mobile}
                  >
                    Send OTP
                  </LoadingButton>
                ) : (
                  <>
                    <LoadingButton
                      onClick={handleSubmit}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      sx={{
                        width: "250px",
                        alignSelf: "center",
                        backgroundColor: "#d42e35",
                        "&:hover": {
                          backgroundColor: "#b8262d", // Darker red on hover
                        },
                      }}
                      disabled={!isMobileLoginValid}
                    >
                      Verify & Login
                    </LoadingButton>

                    <p style={{ textAlign: "center" }}>
                      Didn't receive otp ?{" "}
                      <span
                        className="toggle-link"
                        onClick={() => handleResendOtp}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        Resend OTP
                      </span>
                    </p>

                    {/* <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                        marginTop: 1,
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </Typography> */}
                  </>
                )}
              </form>
            )}
            <p style={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span
                className="toggle-link"
                onClick={() => setActiveForm("register")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign Up
              </span>
            </p>
          </>
        )}

        {activeForm === "register" && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              minWidth: "250px",
            }}
          >
            <TextField
              required
              id="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              helperText={validation.name}
              error={!!validation.name}
              inputProps={{
                maxLength: 100, // Enforce max length of 10 digits
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              helperText={validation.email}
              error={!!validation.email}
              inputProps={{
                maxLength: 100, // Enforce max length of 10 digits
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
              helperText={validation.password}
              error={!!validation.password}
              inputProps={{
                maxLength: 100, // Enforce max length of 10 digits
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              variant="outlined"
              helperText={validation.confirmPassword}
              error={!!validation.confirmPassword}
              inputProps={{
                maxLength: 100,
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                id="terms"
                checked={formData.isChecked}
                onChange={handleCheckboxChange}
                style={{ margin: "0 8px 0 0", cursor: "pointer" }}
              />
              <label
                htmlFor="terms"
                style={{ fontSize: "14px", cursor: "pointer" }}
              >
                I agree with{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <LoadingButton
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              sx={{
                width: "250px",
                alignSelf: "center",
                backgroundColor: "#d42e35",
                "&:hover": {
                  backgroundColor: "#b8262d", // Darker red on hover
                },
              }}
              disabled={!isRegisterValid}
            >
              Register
            </LoadingButton>

            <p style={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span
                className="toggle-link"
                onClick={() => setActiveForm("login")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Sign In
              </span>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;