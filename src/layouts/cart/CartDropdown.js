import React, { useState } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { blueGrey, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { CloseOutlined } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
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
import message from "../../constants/message.js";
import Divider from "../../components/common/divider/Divider.js";
import { useFetchCart } from "../../hooks/useFetchCart";
import CartPopUpCard from "./CartPopUpCard.js";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  popover: {
    backgroundColor: "white",
    boxShadow: "0px 2px 4px rgba(96, 125, 139, 0.5)",
    border: "1px solid #ddd",
    fontSize: "90%",
    padding: "4px 8px",
    borderRadius: "4px",
    boxSizing: "border-box",
    width: "max-content",
    maxWidth: "calc(100vw - 10px)",
  },
  closeButton: {
    marginTop: "8px",
  },
});

function CartDropdown() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // Use `useFloating` for positioning and `useHover` for hover interaction.
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const hover = useHover(context, { delay: { open: 100, close: 100 } }); // Add delay for smoother interaction.
  const interactions = useInteractions([hover]);
  const triggerRef = useMergeRefs([refs.setReference]);
  const contentRef = useMergeRefs([refs.setFloating]);

  const { data, isLoading, error } = useFetchCart();

  // Normalize cartItems to an empty array if null
  let dataItems = [];
  if (data.success === true) {
    dataItems = data.data || [];
  }

  const closeDropdown = () => {
    setOpen(false); // Close the dropdown when this function is called
  };

  const handleViewAllClick = () => {
    setOpen(false); // Close the dropdown
    // Navigate to the cart page
    navigate("/cart");
  };

  const badgeCount = dataItems.length || 0;
  // Calculate totalPrice and totalMrp
  const totalPrice = dataItems.reduce((acc, item) => acc + item.price, 0);
  const totalMrp = dataItems.reduce((acc, item) => acc + item.mrp, 0);

  return (
    <div className="App">
      <IconButton
        ref={triggerRef}
        {...interactions.getReferenceProps()}
        className="PopoverTrigger"
        sx={{
          backgroundColor: "transparent", // Default background
          "&:hover": {
            backgroundColor: red[50], // Light red background on hover
            borderRadius: "4px", // Square shape (4px border radius for slight rounding)
          },
        }}
      >
        <Badge
          badgeContent={badgeCount}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: blueGrey[700], // Set badge background to red
              color: "white", // Set badge content color to white
            },
          }}
        >
          <ShoppingCartOutlinedIcon
            onClick={handleViewAllClick} // Close and navigate
            sx={{
              color: blueGrey[900], // Default icon color
              transition: "filter 0.3s ease", // Smooth transition
              "&:hover": {
                filter: "brightness(1.5)", // Increase brightness for a tinted effect
              },
            }}
          />{" "}
        </Badge>
      </IconButton>
      {open && (
        <FloatingPortal>
          <div
            ref={contentRef}
            style={{
              ...floatingStyles,
              border: "40px",
              marginTop: "18px",
              maxHeight: "500px",
              minWidth: "300px",
              maxWidth: "400px",
              background: "#F8F8F8",
            }}
            {...interactions.getFloatingProps()}
            className={classes.popover}
          >
            <Box>
              <Box
                sx={{
                  mt: 0.5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold", // Make the text bold
                    display: "flex",
                    flex: 1,
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left", // Align text to the left
                  }}
                >
                  {message.cart}
                </Typography>

                <Tooltip title={message.close}>
                  <IconButton
                    onClick={closeDropdown}
                    aria-label="Close"
                    size="small"
                    sx={{ color: blueGrey[900] }}
                  >
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box
                sx={{
                  padding: 0.5,
                  maxHeight: "300px", // Limit the maximum height
                  overflowY: "auto", // Enable vertical scrolling if content exceeds the height
                  display: "flex", // Use flex for center alignment
                  flexDirection: "column", // Stack elements vertically
                  justifyContent:
                    isLoading || error || dataItems.length === 0
                      ? "center"
                      : "flex-start", // Center for loader, error, or empty states
                  alignItems: "center", // Center horizontally
                  textAlign: "center", // Center align text
                }}
              >
                {/* Display CircularProgress while loading */}
                {isLoading && <CircularProgress color="inherit" size={30} />}

                {/* Error UI */}
                {!isLoading && error && (
                  <Typography variant="body2" color="text.secondary">
                    {data.message ||
                      "Something went wrong. Please try again later."}
                  </Typography>
                )}

                {/* No Data UI */}
                {!isLoading && !error && dataItems.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {message.cart_empty}
                  </Typography>
                )}

                {/* Success UI */}
                {!isLoading && !error && dataItems.length > 0 && (
                  <>
                    <CartPopUpCard
                      data={dataItems}
                      closeDropdown={closeDropdown}
                    />
                  </>
                )}
              </Box>

              {/* View All Button */}
              {!isLoading && !error && dataItems.length > 0 && (
                <Box
                  display="flex"
                  flexDirection="column" // Stack elements vertically
                  justifyContent="center"
                  alignItems="center" // Center align all children
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start" // Left-align items
                    alignItems="center" // Center-align items vertically
                    gap={1}
                    width="100%"
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.5em",
                        fontWeight: "bold", // Make the text bold
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        textAlign: "left", // Align text to the left
                      }}
                    >
                      {message.total}
                      {": "}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.5em",
                        fontWeight: "bold", // Make the text bold
                        justifyContent: "start",
                        alignItems: "start",
                        textAlign: "left", // Align text to the left
                      }}
                    >
                      ₹{totalPrice.toFixed(2)}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        fontSize: "1em",
                        fontWeight: "normal", // Make the text bold
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        textAlign: "left", // Align text to the left
                        textDecoration: "line-through",
                      }}
                    >
                      ₹{totalMrp.toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    variant="body2"
                    className="PopoverClose"
                    onClick={handleViewAllClick} // Close and navigate
                    type="button"
                    sx={{
                      textTransform: "none",
                      display: "block", // Ensures it's treated as a block element for centering
                      margin: "4px auto", // Center horizontally with margin
                      fontWeight: "bold",
                      backgroundColor: "#0288d1", // Blue background
                      color: "#ffffff", // White text
                      cursor: "pointer",
                      textAlign: "center", // Center align the text
                      padding: "8px 16px", // Add padding for better appearance
                      borderRadius: "4px", // Add rounded corners
                      "&:hover": {
                        backgroundColor: "#0277bd", // Slightly darker blue on hover
                      },
                    }}
                  >
                    {message.view_cart}
                  </Button>
                </Box>
              )}
            </Box>
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default CartDropdown;
