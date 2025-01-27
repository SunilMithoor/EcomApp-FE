import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { blueGrey, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import urls from "../../../constants/urls";

const useStyles = makeStyles({
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

    marginTop: "12px",
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

const products = [
  {
    id: 1,
    name: "RCB AUTHENTIC REPLICA 2024 MENS GREEN JERSEY",
    price: 3749,
    originalPrice: 4999,
    discount: 25,
    imageUrl: urls.audio_url, // Replace with the actual image URL
  },
];

const FloatingCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 150,
        maxHeight: 200,
        margin: "auto",
        position: "relative",
      }}
    >
      <Chip
        label={`${product.discount}% OFF`}
        color="error"
        sx={{
          border: 0,
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: "0.8rem",
        }}
      />
      <CardMedia
        component="img"
        height="150"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
          {product.name}
        </Typography>
        <Box textAlign="center" mt={1}>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "gray" }}
          >
            ₹{product.originalPrice}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ₹{product.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

function FloatingUiCard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    placement: "bottom-start", // Dropdown opens below the trigger
    middleware: [
      offset(8), // Space between trigger and dropdown
      flip({
        fallbackPlacements: ["top-start"], // Flip to top if necessary
        padding: 5,
      }),
      shift({ padding: 5 }), // Prevent overflow
    ],
  });

  const hover = useHover(context, { delay: { open: 100, close: 100 } });
  const interactions = useInteractions([hover]);
  const triggerRef = useMergeRefs([refs.setReference]);
  const contentRef = useMergeRefs([refs.setFloating]);

  return (
    <div>
      <IconButton
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        sx={{
          backgroundColor: open ? red[50] : "transparent", // Background color when open
          borderRadius: "4px", // Ensures square shape
          "&:hover": {
            backgroundColor: red[50], // Same hover color
            borderRadius: "4px", // Ensure consistent border-radius on hover
          },
        }}
        className="PopoverTrigger"
      >
        <SearchOutlinedIcon
          sx={{
            color: open ? red[500] : blueGrey[900], // Icon color changes when open
            transition: "filter 0.3s ease, color 0.3s ease", // Smooth transitions
            "&:hover": {
              filter: "brightness(1.5)", // Brightness effect on hover
            },
          }}
        />
      </IconButton>

      {open && (
        <div
          // ref={refs.setFloating}
          ref={contentRef}
          style={{
            ...floatingStyles,
          }}
          className={classes.popover}
          {...interactions.getFloatingProps()}
        >
          {/* Dropdown Content */}
          <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Grid2 container spacing={4} justifyContent="center">
              {products.map((product) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <FloatingCard product={product} />
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </div>
      )}
    </div>
  );
}

export default FloatingUiCard;
