import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Checkbox,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DividerWithText from "../../components/common/divider/DividerWithText.js";
import { SocialIcon } from "react-social-icons";
import OtpInput from "react-otp-input";
import SignInSignUpValidations from "../../validations/SignInSignUpValidations.js";
import message from "../../constants/message.js";
import ToggleButtonCustomize from "../../components/common/toggelbutton/StyledToggleButtonGroup.js";
import Divider from "../../components/common/divider/Divider.js";
import { grey } from "@mui/material/colors";
import SnackBar from "../../components/common/snackbar/SnackBar.js";
import { useMobileOtpGenerate } from "../../hooks/onboarding.js";
import log from "loglevel";
import {
  emailSignIn,
  mobileSignIn,
  signUp,
  mobileOtpGenerate,
} from "../../services/localService/LocalService.js";

function SignInSignUp({ isOpen, onClose, fullScreen }) {
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    let validationMessage = "";
    if (id === "confirmPassword") {
      validationMessage = SignInSignUpValidations(id, value, formData.password);
    } else {
      validationMessage = SignInSignUpValidations(id, value);
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

  // const handleSendOtp = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOtpSent(true);
  //     alert("OTP has been sent to your mobile number.");
  //   }, 2000);
  // };

  // const handleSendOtp = () => {
  //   const {
  //     dataMobileOtpGenerate,
  //     isLoadingMobileOtpGenerate,
  //     errorMobileOtpGenerate,
  //   } = useMobileOtpGenerate();
  //   setLoading(true);
  //   log.info("Api called ");
  //   if (dataMobileOtpGenerate?.success) {
  //     log.success("Api success ");
  //     setLoading(false);
  //     setOtpSent(true);
  //     alert("OTP has been sent to your mobile number.");
  //   } else if (errorMobileOtpGenerate) {
  //     setLoading(false);
  //     log.error("Error sending OTP:", errorMobileOtpGenerate);
  //   }
  // };

  const handleSendOtp = async () => {
    setLoading(true);
    const data = await mobileOtpGenerate();
    if (data?.success === true) {
      setLoading(false);
      setOtpSent(true);
      handleSnackBarOpen("success", data?.message || "Success");
    } else {
      setLoading(false);
      setOtpSent(false);
      handleSnackBarOpen("error", data?.message || "Failure");
    }
  };

  const handleResendOtp = async () => {
    const data = await mobileOtpGenerate();
    if (data?.success === true) {
      setLoading(false);
      handleSnackBarOpen("success", data?.message || "Success");
    } else {
      setLoading(false);
      handleSnackBarOpen("error", data?.message || "Failure");
    }
  };

  const handleEmailSignIn = async () => {
    setLoading(true);
    const data = await emailSignIn();
    if (data?.success === true) {
      setLoading(false);
      handleSnackBarOpen("success", data?.message || "Success");
      onClose();
    } else {
      setLoading(false);
      handleSnackBarOpen("error", data?.message || "Failure");
    }
  };

  const handleMobileSignIn = async () => {
    setLoading(true);
    const data = await mobileSignIn();
    if (data?.success === true) {
      setLoading(false);
      handleSnackBarOpen("success", data?.message || "Success");
      onClose();
    } else {
      setLoading(false);
      handleSnackBarOpen("error", data?.message || "Failure");
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    const data = await signUp();
    if (data?.success === true) {
      setLoading(false);
      handleSnackBarOpen("success", data?.message || "Success");
      onClose();
    } else {
      setLoading(false);
      handleSnackBarOpen("error", data?.message || "Failure");
    }
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

  const isMobileLoginValid = otpSent && otp.length === 6;

  const handleTabChange = (event, newValue) => {
    if (newValue !== null) {
      setActiveTab(newValue);
    }
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState(""); // success, error, warning, info

  const handleSnackBarOpen = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };

  // const handleSubmit = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     handleSnackBarOpen("success", "Action was successful!");
  //     onClose();
  //   }, 2000);
  // };

  return (
    <div>
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
        {/* Backdrop Loader */}
        <DialogTitle
          sx={{ m: 0, p: 1, backgroundColor: grey[300] }}
          id="customized-dialog-title"
          color="#000"
        >
          {activeForm === "login" ? message.signin : message.signup}
          <Typography
            variant="subtitle2"
            sx={{ fontSize: "14px", color: "#000" }}
          >
            {activeForm === "login"
              ? message.sign_in_continue
              : message.fill_in_details}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: "#000",
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#f5f5f5" }}>
          <Box
            sx={{
              fullWidth: true,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 1,
              textAlign: "center",
              mt: 1,
              p: 1,
              minHeight: "400px",
            }}
          >
            {activeForm === "login" && (
              <>
                <ToggleButtonCustomize
                  alignment={activeTab}
                  centered
                  handleAlignment={handleTabChange}
                />
                <Divider sx={{ mx: 1, my: 1 }} />
                {activeTab === 0 && (
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      paddingX: 2,
                      paddingY: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "start",
                        fontSize: "14px",
                        padding: 0,
                        mt: 2,
                        color: "#6e7579",
                      }}
                    >
                      {message.email_address}
                    </Typography>
                    <TextField
                      required
                      id="email"
                      type="email"
                      fullWidth
                      variant="outlined"
                      value={formData.email}
                      onChange={handleInputChange}
                      helperText={validation.email}
                      error={!!validation.email}
                      size="small"
                      color="#242424"
                      slotProps={{
                        input: {
                          maxLength: 100,
                          shrink: true,
                          placeholder: message.email_msg,
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="#9eafc4" />
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "start",
                        fontSize: "14px",
                        padding: 0,
                        mt: 2,
                        color: "#6e7579",
                      }}
                    >
                      {message.password}
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      id="password"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      color="#242424"
                      size="small"
                      helperText={validation.password}
                      error={!!validation.password}
                      slotProps={{
                        input: {
                          maxLength: 50,
                          shrink: true,
                          placeholder: message.password_msg,
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                              />
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
                        },
                      }}
                    />

                    <LoadingButton
                      onClick={handleEmailSignIn}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      sx={{
                        mt: 2,
                        minWidth: "250px",
                        maxWidth: "300px",
                        alignSelf: "center",
                        backgroundColor: "#d42e35",
                        "&:hover": {
                          backgroundColor: "#b8262d", // Darker red on hover
                        },
                      }}
                      disabled={!isLoginValid}
                    >
                      {message.login}
                    </LoadingButton>
                    {/* Forgot Password Link */}
                    <Typography
                      variant="body2"
                      sx={{ mt: 0, alignSelf: "center" }}
                    >
                      {message.forgot_password}
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ color: "#03a9f4" }}
                      >
                        {message.click_here}
                      </Link>
                    </Typography>
                    <DividerWithText />

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <SocialIcon network="facebook" />
                      <SocialIcon network="twitter" />
                      <SocialIcon network="google" />
                      <SocialIcon network="linkedin" />
                      <SocialIcon network="x" />
                    </Box>
                  </form>
                )}
                {activeTab === 1 && (
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      paddingX: 2,
                      paddingY: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "start",
                        fontSize: "14px",
                        padding: 0,
                        mt: 2,
                        color: "#6e7579",
                      }}
                    >
                      {message.mobile_no}
                    </Typography>
                    <TextField
                      required
                      id="mobile"
                      type="text"
                      fullWidth
                      color="#242424"
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
                        if (
                          !/^\d$/.test(e.key) &&
                          !allowedKeys.includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      size="small"
                      slotProps={{
                        input: {
                          maxLength: 10,
                          shrink: true,
                          placeholder: message.mobile_no_msg,
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon />
                              <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />

                    {otpSent && (
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
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginTop: 3,
                            color: "#242424",
                          }}
                        >
                          {message.enter_otp}
                        </Typography>
                        <OtpInput
                          required
                          value={otp}
                          color="#242424"
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
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px", // Increase font size
                                textAlign: "center", // Center-align text for better appearance
                                width: "30px", // Adjust width for better spacing
                                height: "30px", // Adjust height for better spacing
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
                          mt: 2,
                          minWidth: "250px",
                          maxWidth: "300px",
                          alignSelf: "center",
                          backgroundColor: "#d42e35",
                          "&:hover": {
                            backgroundColor: "#b8262d", // Darker red on hover
                          },
                        }}
                        disabled={!formData.mobile || !!validation.mobile}
                      >
                        {message.send_otp}
                      </LoadingButton>
                    ) : (
                      <>
                        <LoadingButton
                          onClick={handleMobileSignIn}
                          loading={loading}
                          loadingPosition="end"
                          variant="contained"
                          sx={{
                            mt: 2,
                            minWidth: "250px",
                            maxWidth: "300px",
                            alignSelf: "center",
                            backgroundColor: "#d42e35",
                            "&:hover": {
                              backgroundColor: "#b8262d", // Darker red on hover
                            },
                          }}
                          disabled={!isMobileLoginValid}
                        >
                          {message.verify_login}
                        </LoadingButton>

                        {/* Resend otp Link */}
                        <Typography
                          variant="body2"
                          sx={{ mt: 0, alignSelf: "center" }}
                        >
                          {message.didnt_recieve_otp}
                          <Link
                            href="#"
                            underline="hover"
                            sx={{ color: "#03a9f4" }}
                            onClick={handleResendOtp}
                          >
                            {message.resend_otp}
                          </Link>
                        </Typography>
                      </>
                    )}
                  </form>
                )}
              </>
            )}

            {activeForm === "register" && (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingX: 2,
                  paddingY: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    padding: 0,
                    mt: 1,
                    color: "#6e7579",
                  }}
                >
                  {message.name}
                </Typography>
                <TextField
                  required
                  id="name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleInputChange}
                  helperText={validation.name}
                  error={!!validation.name}
                  size="small"
                  color="#242424"
                  slotProps={{
                    input: {
                      maxLength: 100,
                      shrink: true,
                      placeholder: message.enter_name,
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    padding: 0,
                    mt: 1,
                    color: "#6e7579",
                  }}
                >
                  {message.email}
                </Typography>

                <TextField
                  required
                  id="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  helperText={validation.email}
                  error={!!validation.email}
                  size="small"
                  color="#242424"
                  slotProps={{
                    input: {
                      maxLength: 100,
                      shrink: true,
                      placeholder: message.email_msg,
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    padding: 0,
                    mt: 1,
                    color: "#6e7579",
                  }}
                >
                  {message.password}
                </Typography>

                <TextField
                  fullWidth
                  required
                  id="password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  size="small"
                  color="#242424"
                  helperText={validation.password}
                  error={!!validation.password}
                  slotProps={{
                    input: {
                      maxLength: 50,
                      shrink: true,
                      placeholder: message.password_msg,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                          />
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
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    padding: 0,
                    mt: 1,
                    color: "#6e7579",
                  }}
                >
                  {message.confirm_password}
                </Typography>
                <TextField
                  fullWidth
                  required
                  id="confirmPassword"
                  variant="outlined"
                  type={"text"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  size="small"
                  color="#242424"
                  helperText={validation.confirmPassword}
                  error={!!validation.confirmPassword}
                  slotProps={{
                    input: {
                      maxLength: 50,
                      shrink: true,
                      placeholder: message.enter_confirm_password,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Typography
                  variant="body2"
                  // sx={{
                  //   display: "flex",
                  //   alignItems: "center",
                  //   gap: "2px",
                  //   mt: 0,
                  // }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    mt: 0,
                    flexDirection: { xs: "row", sm: "row" }, // Column on small screens, row on larger screens
                    textAlign: { xs: "center", sm: "left" }, // Center text on small screens, left-align on larger screens
                    flexWrap: "wrap",
                  }}
                >
                  <Checkbox
                    checked={formData.isChecked}
                    onChange={handleCheckboxChange}
                    sx={{
                      color: grey[600],
                      "&.Mui-checked": {
                        color: grey[800],
                      },
                    }}
                  />
                  {message.i_agree_with}
                  <Link href="#" underline="hover" sx={{ color: "#03a9f4" }}>
                    {message.terms_condition}
                  </Link>{" "}
                  {message.and}{" "}
                  <Link href="#" underline="hover" sx={{ color: "#03a9f4" }}>
                    {message.privacy_policy}
                  </Link>
                </Typography>

                <LoadingButton
                  onClick={handleSignUp}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{
                    mt: 1,
                    minWidth: "250px",
                    maxWidth: "300px",
                    alignSelf: "center",
                    backgroundColor: "#d42e35",
                    "&:hover": {
                      backgroundColor: "#b8262d", // Darker red on hover
                    },
                  }}
                  disabled={!isRegisterValid}
                >
                  {message.register}
                </LoadingButton>
              </form>
            )}
          </Box>
          {/* Signin/Signup Link */}
          <Typography fullWidth variant="body1" align="center" sx={{ mt: 3 }}>
            {activeForm === "login" ? (
              <>
                {message.dont_have_account}
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "#03a9f4" }}
                  onClick={() => setActiveForm("register")}
                >
                  {message.signup}
                </Link>
              </>
            ) : (
              <>
                {message.already_have_account}
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "#03a9f4" }}
                  onClick={() => setActiveForm("login")}
                >
                  {message.signin}
                </Link>
              </>
            )}
          </Typography>
        </DialogContent>
      </Dialog>
      <SnackBar
        handleOpen={openSnackbar}
        handleClose={handleSnackBarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default SignInSignUp;
