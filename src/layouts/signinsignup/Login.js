import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Avatar,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Lock, Person } from "@mui/icons-material";
import ToggleButtonCustomize from "../../components/common/toggelbutton/StyledToggleButtonGroup";


const Login = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
        <ToggleButtonCustomize/>
      <Box
        sx={{
          width: 350,
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        {/* Avatar Icon */}
        <Avatar sx={{ mx: "auto", bgcolor: "#03a9f4", width: 64, height: 64 }}>
          <Person fontSize="large" />
        </Avatar>
        {/* Login Title */}
        <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
          LOGIN
        </Typography>
        {/* Username Field */}
        <TextField
          fullWidth
          placeholder="Username"
          variant="outlined"
          size="large"
          sx={{ mt: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
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
        {/* Password Field */}
        <TextField
          fullWidth
          type="password"
          placeholder="Password"
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          placeholder="Username"
          variant="outlined"
          size="small"
          sx={{ mt: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 1, bgcolor: "gray", width: 0.03 }}
                />
              </InputAdornment>
            ),
          }}
        />
        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "#03a9f4",
            "&:hover": { bgcolor: "#0288d1" },
            color: "#fff",
          }}
        >
          LOGIN
        </Button>
        {/* Forgot Password Link */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Forgot Your Password?{" "}
          <Link href="#" underline="hover" sx={{ color: "#03a9f4" }}>
            Click here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
