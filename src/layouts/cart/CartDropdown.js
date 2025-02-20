import React, { useState } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { blueGrey, red, blue } from "@mui/material/colors";
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
import { IconDropDownUseStyles } from "../../styles/DropdownStyles.js";

function CartDropdown() {
  const classes = IconDropDownUseStyles();
  const navigate = useNavigate();
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
        <Badge
          badgeContent={badgeCount}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: blueGrey[900], // Set badge background to red
              color: "white", // Set badge content color to white
            },
          }}
        >
          <ShoppingCartOutlinedIcon
            onClick={handleViewAllClick} // Close and navigate
            sx={{
              color: open ? red[500] : blueGrey[900], // Icon color changes when open
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
            }}
            className={classes.popover}
            {...interactions.getFloatingProps()}
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
                      color={blue[800]}
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
                      color={blue[800]}
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
                      color={blue[500]}
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
                      fontWeight: "normal",
                      backgroundColor: "#0288d1", // Blue background
                      color: "#ffffff", // White text
                      cursor: "pointer",
                      textAlign: "center", // Center align the text
                      paddingX: 1.5, // Add padding for better appearance
                      paddingY: 0.3,
                      borderRadius: "2px", // Add rounded corners
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
