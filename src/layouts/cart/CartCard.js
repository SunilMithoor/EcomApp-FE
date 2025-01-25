import React, { useState, useEffect } from "react";
import Rating from "../../components/common/rating/Rating.js";
import Button from "../../components/common/button/Button.js";
import Divider from "../../components/common/divider/Divider.js";
import TextViewWithClose from "../../components/common/textview/TextViewWithClose.js";
import CouponCode from "../../components/common/couponcode/CouponCode.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandableText from "../../components/common/textview/ExpandableText.js";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import message from "../../constants/message.js";
import { purple } from "@mui/material/colors";

import {
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

function GetCartCard({ data }) {
  const [items, setCartItems] = useState(Array.isArray(data) ? data : []);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  // State to store total amount, MRP and discount percentage
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalPercentage, setPercentage] = useState(0);

  // State to store quantity for each item
  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => {
      acc[item.id] = item.minItem; // Initialize quantity with minItem
      return acc;
    }, {})
  );

  // Recalculate totals when quantities change
  useEffect(() => {
    // Only update totals if the quantities have changed or the coupon has been applied
    if (quantities && appliedCoupon !== undefined) {
      updateTotals(quantities, appliedCoupon);
    }
  }, [quantities, appliedCoupon]);

  // Decrease the quantity of an item
  const decreaseQuantity = (itemId, minItem) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      const newQuantity = Math.max(prevQuantities[itemId] - 1, minItem);
      if (prevQuantities[itemId] !== newQuantity) {
        newQuantities[itemId] = newQuantity;
        // Only update totals when quantities actually change
        updateTotals(newQuantities, appliedCoupon);
      }
      return newQuantities;
    });
  };

  // Increase the quantity of an item
  const increaseQuantity = (itemId, maxItem) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      const newQuantity = Math.min(prevQuantities[itemId] + 1, maxItem);
      if (prevQuantities[itemId] !== newQuantity) {
        newQuantities[itemId] = newQuantity;
        // Only update totals when quantities actually change
        updateTotals(newQuantities, appliedCoupon);
      }
      return newQuantities;
    });
  };

  const handleApplyCoupon = (code) => {
    if (appliedCoupon === code) {
      setCouponMessage(message.coupon_already_applied(code));
    }

    setAppliedCoupon("");
    setCouponMessage("");

    setTimeout(() => {
      setAppliedCoupon(code);
      setCouponMessage(message.coupon_applied_successfully(code));
      updateTotals(quantities, code);
    }, 100);

    setTimeout(() => {
      setCouponMessage("");
    }, 3000);
  };

  const handleRemoveCoupon = () => {
    const previousCoupon = appliedCoupon; // Save the current coupon for the message
    setAppliedCoupon(""); // Reset applied coupon

    // Set the coupon removal message immediately
    setCouponMessage(message.coupon_removed(previousCoupon));

    // Recalculate totals with no coupon applied
    updateTotals(quantities, "");

    // Clear the coupon message after 3 seconds
    setTimeout(() => {
      setCouponMessage(""); // Reset the coupon message after timeout
    }, 3000);
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[itemId];
    setQuantities(updatedQuantities);
  };

  // Calculate the totals based on the current quantities
  const updateTotals = (quantities, coupon = appliedCoupon) => {
    let newTotalAmount = 0;
    let newTotalMrp = 0;

    items.forEach((item) => {
      const quantity = quantities[item.id] || 0;
      newTotalAmount += item.price * quantity;
      newTotalMrp += item.mrp * quantity;
    });

    // Apply coupon discount if a coupon is passed
    if (coupon === "DIS20") {
      newTotalAmount *= 0.8; // Apply 20% discount
    }

    // Calculate discount percentage
    const discountPercentage =
      newTotalMrp > 0
        ? ((newTotalMrp - newTotalAmount) / newTotalMrp) * 100
        : 0;

    setTotalAmount(newTotalAmount);
    setTotalMrp(newTotalMrp);
    setPercentage(discountPercentage.toFixed(2));
  };

  const handleCheckOut = () => {};

  return (
    <Box
      p={2}
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          textAlign: "left", // Align text to the left
        }}
      >
        {message.shopping_cart}
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={2} flexDirection={{ xs: "column", md: "row" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              padding: "5px", // Make the text bold
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              textAlign: "left", // Align text to the left
            }}
          >
            {message.items_count(items.length)}
          </Typography>

          <Box
            display="flex"
            sx={{
              border: "1px solid #ccc",
            }}
            flexDirection="column"
            gap={1}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <Box
                  flexDirection={{ xs: "column", md: "row" }}
                  key={item.id}
                  alignItems="flex-start" // Align items to the top horizontally
                  justifyContent="flex-start" // Align items to the top vertically
                  sx={{
                    margin: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  display="flex"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center", // Centers horizontally
                      alignItems: "center", // Centers vertically
                      height: "100%", // Ensure parent container has height
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.imgUrl}
                      alt={item.name || "No image available"}
                      loading="lazy"
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover", // Ensures the image covers the entire box
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex", // Use flexbox
                      flexDirection: "column", // Stack children vertically
                      alignItems: "flex-start", // Align items to the start (left for LTR)
                      justifyContent: "flex-start", // Align items to the top
                      paddingX: 1,
                      paddingY: 0, // Optionally remove padding to have text stick to the top
                    }}
                  >
                    <Typography variant="h6">{item.name}</Typography>

                    <ExpandableText
                      text={item.description || message.no_desc_available}
                      maxLines={2}
                    />

                    <Rating
                      totalRatings={item.totalRatings}
                      rating={item.rating}
                      readOnly
                    />
                  </CardContent>

                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-end" // Align items to the end horizontally
                    justifyContent="flex-start" // Align items to the top vertically
                    sx={{ paddingX: 1, paddingY: 0 }}
                  >
                    <Typography variant="h5" color="#1565c0">
                      ₹{item.price.toFixed(2)}{" "}
                      <LocalOfferIcon
                        style={{
                          verticalAlign: "middle",
                          color: "#1565c0", // Set the color to white
                        }}
                      />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{item.mrp.toFixed(2)}
                      <LocalOfferIcon
                        style={{
                          marginLeft: 5,
                          verticalAlign: "middle",
                          color: "#f5f5f5", // Set the color to white
                        }}
                      />
                    </Typography>

                    <Box
                      display="flex"
                      sx={{ marginTop: 5, paddingX: 0, paddingY: 0 }}
                      flexDirection="row"
                      alignItems="flex-end" // Align items to the end horizontally
                      justifyContent="flex-end" // Align items to the top vertically
                      gap={1}
                    >
                      <IconButton
                        size="small"
                        onClick={() => decreaseQuantity(item.id, item.minItem)} // Wrap in anonymous function
                        disabled={quantities[item.id] <= item.minItem}
                        sx={{
                          border: "1px solid #ccc",
                          backgroundColor:
                            quantities[item.id] <= item.minItem
                              ? "#e0e0e0"
                              : "#f0f0f0",
                          color: "#000",
                          "&:hover": {
                            backgroundColor:
                              quantities[item.id] > item.minItem
                                ? "#d6d6d6"
                                : "#e0e0e0",
                          },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          minWidth: "20px",
                          textAlign: "center",
                        }}
                      >
                        {quantities[item.id]}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => increaseQuantity(item.id, item.maxItem)} // Wrap in anonymous function
                        disabled={quantities[item.id] >= item.maxItem}
                        sx={{
                          border: "1px solid #ccc",
                          backgroundColor:
                            quantities[item.id] >= item.maxItem
                              ? "#e0e0e0"
                              : "#f0f0f0",
                          color: "#000",
                          "&:hover": {
                            backgroundColor:
                              quantities[item.id] < item.maxItem
                                ? "#d6d6d6"
                                : "#e0e0e0",
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>

                      {/* Add extra gap between AddIcon and DeleteIcon */}
                      <div style={{ marginLeft: "8px" }}></div>

                      <IconButton
                        size="small"
                        onClick={() => removeItem(item.id)}
                        sx={{
                          border: "1px solid #ccc",
                          backgroundColor: "#f0f0f0",
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#e0e0e0",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                {index < items.length - 1 && <Divider className="thin" />}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        <Box flex={1}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold", // Make the text bold
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              textAlign: "left", // Align text to the left
            }}
          >
            {message.total}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold", // Make the text bold
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              textAlign: "left", // Align text to the left
            }}
          >
            ₹{totalAmount.toFixed(2)}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontWeight: "bold", // Make the text bold
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              textAlign: "left", // Align text to the left
              textDecoration: "line-through",
            }}
          >
            ₹{totalMrp.toFixed(2)}
          </Typography>
          <Typography
            color="grey"
            sx={{
              fontWeight: "normal", // Make the text bold
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              textAlign: "left", // Align text to the left
            }}
          >
            {message.discount_off(totalPercentage)}
          </Typography>

          <Button text={message.checkout} onClick={handleCheckOut} />

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            sx={{
              marginTop: "20px", // Adjust top margin
              marginBottom: "10px", // Adjust bottom margin
            }}
          >
            {message.promotions}
          </Typography>

          {appliedCoupon && (
            <TextViewWithClose
              text={appliedCoupon}
              onClose={handleRemoveCoupon}
            />
          )}
          <CouponCode onApply={handleApplyCoupon} />
          {couponMessage && (
            <Typography color="success">{couponMessage}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default GetCartCard;
