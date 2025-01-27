import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

const IconDropDownUseStyles = makeStyles({
  popover: {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(96, 125, 139, 0.5)",
    border: "1px solid #ddd",
    fontSize: "90%",
    padding: "4px 8px",
    borderRadius: "4px",
    boxSizing: "border-box",
    position: "absolute", // Positioning the dropdown absolutely
    top: "100%", // Align below the AppBar
    left: 0,
    width: "400px", // Set a fixed width for the dropdown
    zIndex: 1300, // Ensure it appears above other content
    // width: "max-content",
    // maxWidth: "calc(100vw - 10px)",

    marginTop: "15px",
    maxHeight: "500px",
    minWidth: "400px",
    maxWidth: "500px",
    background: "#fff",
  },
  icon_hover: {
    backgroundColor: red[50],
    borderRadius: "4px",
  },
});

const TextDropDownUseStyles = makeStyles({
  popover: {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(96, 125, 139, 0.5)",
    border: "1px solid #ddd",
    fontSize: "90%",
    padding: "4px 8px",
    borderRadius: "4px",
    boxSizing: "border-box",
    position: "absolute", // Positioning the dropdown absolutely
    top: "100%", // Align below the AppBar
    left: 0,
    // width: "400px", // Set a fixed width for the dropdown
    zIndex: 1300, // Ensure it appears above other content
    // width: "max-content",
    // maxWidth: "calc(100vw - 10px)",

    marginTop: "24px",
    maxHeight: "500px",
    minWidth: "400px",
    maxWidth: "calc(100vw - 15px)",
    background: "#fff",

    minHeight: "300px",
    width: "100%",
  },
});

export { IconDropDownUseStyles, TextDropDownUseStyles };
