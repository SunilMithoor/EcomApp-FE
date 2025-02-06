import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "hsl(190, 64%, 22%)", // primary-color
    },
    secondary: {
      main: "hsl(190, 64%, 15%)", // secondary-color
    },
    text: {
      primary: "hsl(190, 24%, 35%)", // text-color
      secondary: "hsl(190, 8%, 60%)", // text-color-light
    },
    background: {
      default: "hsl(190, 100%, 99%)", // body-color
      paper: "#fff", // white-color
    },
  },
  typography: {
    fontFamily: `"Open Sans", "Raleway", sans-serif`,
    h1: {
      fontSize: "1.5rem", // h1-font-size
      fontWeight: 600, // font-semi-bold
      fontFamily: "Raleway",
      color: "hsl(190, 64%, 18%)", // title-color
    },
    h2: {
      fontSize: "1.25rem", // h2-font-size
      fontWeight: 600,
      fontFamily: "Raleway",
      color: "hsl(190, 64%, 18%)", // title-color
    },
    h3: {
      fontSize: "1rem", // h3-font-size
      fontWeight: 600,
      fontFamily: "Raleway",
      color: "hsl(190, 64%, 18%)", // title-color
    },
    body1: {
      fontSize: "0.938rem", // normal-font-size
      fontFamily: "Open Sans",
      color: "hsl(190, 24%, 35%)", // text-color
    },
    body2: {
      fontSize: "0.813rem", // small-font-size
      fontFamily: "Open Sans",
      color: "hsl(190, 24%, 35%)", // text-color
    },
    caption: {
      fontSize: "0.75rem", // smaller-font-size
      fontFamily: "Open Sans",
      color: "hsl(190, 8%, 60%)", // text-color-light
    },
  },
  spacing: 8, // Default spacing unit
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 600, // Small devices
      md: 960, // Medium devices
      lg: 1280, // Large devices
      xl: 1920, // Extra large devices
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(190, 64%, 22%)", // primary-color
          color: "#fff",
          padding: "1rem 1rem",
          textTransform: "none",
          fontWeight: 600, // font-semi-bold
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "hsl(190, 64%, 15%)", // secondary-color
          },
        },
        text: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "1.5rem", // h1-font-size
          fontWeight: 600, // font-semi-bold
          fontFamily: "Raleway",
          color: "hsl(190, 64%, 18%)", // title-color
        },
        h2: {
          fontSize: "1.25rem", // h2-font-size
          fontWeight: 600,
          fontFamily: "Raleway",
          color: "hsl(190, 64%, 18%)", // title-color
        },
        h3: {
          fontSize: "1rem", // h3-font-size
          fontWeight: 600,
          fontFamily: "Raleway",
          color: "hsl(190, 64%, 18%)", // title-color
        },
        body1: {
          fontSize: "0.938rem", // normal-font-size
          fontFamily: "Open Sans",
          color: "hsl(190, 24%, 35%)", // text-color
        },
        body2: {
          fontSize: "0.813rem", // small-font-size
          fontFamily: "Open Sans",
          color: "hsl(190, 24%, 35%)", // text-color
        },
        caption: {
          fontSize: "0.75rem", // smaller-font-size
          fontFamily: "Open Sans",
          color: "hsl(190, 8%, 60%)", // text-color-light
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "hsl(190, 64%, 22%)", // primary-color
          color: "#fff",
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff", // white-color
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: "hsl(190, 8%, 60%)", // text-color-light
            },
            "&:hover fieldset": {
              borderColor: "hsl(190, 24%, 35%)", // text-color
            },
            "&.Mui-focused fieldset": {
              borderColor: "hsl(190, 64%, 22%)", // primary-color
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff", // white-color
          padding: "1rem",
          borderRadius: "10px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "hsl(190, 64%, 22%)", // primary-color
          "&:hover": {
            backgroundColor: "hsl(190, 64%, 15%)", // secondary-color
            color: "#fff",
          },
        },
      },
    },
  },
  // Add responsive overrides for mobile
  overrides: {
    MuiButton: {
      root: {
        padding: "0.75rem 1.25rem", // Slightly smaller padding on mobile
      },
    },
    MuiTypography: {
      h1: {
        fontSize: "1.25rem", // Smaller font size for mobile
      },
      h2: {
        fontSize: "1.1rem", // Slightly smaller for mobile
      },
      h3: {
        fontSize: "0.9rem", // Adjust font size for mobile
      },
      body1: {
        fontSize: "0.875rem", // Adjust font size for mobile
      },
      body2: {
        fontSize: "0.75rem", // Adjust font size for mobile
      },
    },
  },
});

export default Theme;
