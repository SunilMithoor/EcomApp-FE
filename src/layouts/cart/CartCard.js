import React, { useState, useEffect } from "react";
import "./Cart.css";
import Rating from "../../components/rating/Rating.js";
import { IoTrashBinSharp } from "react-icons/io5";
import Button from "../../components/common/button/Button.js";
import Divider from "../../components/common/divider/Divider.js";
import TextViewWithClose from "../../components/common/textview/TextViewWithClose.js";
import CouponCode from "../../components/common/couponcode/CouponCode.js";
import TextView from "../../components/common/textview/TextView.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandableText from "../../components/common/textview/ExpandableText.js";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  TextField,
  Chip,
} from "@mui/material";

const GetCartCard = ({ data }) => {
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
    console.log("Quantities updated:", quantities);
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
    console.log("Applying coupon:", code);

    if (appliedCoupon === code) {
      setCouponMessage(`Coupon "${code}" is already applied.`);
      console.log("Coupon already applied.");
    }

    setAppliedCoupon("");
    setCouponMessage("");

    setTimeout(() => {
      setAppliedCoupon(code);
      setCouponMessage(`Coupon "${code}" applied successfully.`);
      console.log("Coupon applied successfully.");
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
    setCouponMessage(`Coupon "${previousCoupon}" removed.`);

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
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold">
        Shopping Cart
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={2} flexDirection={{ xs: "column", md: "row" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              padding: "5px", // Make the text bold
            }}
          >
            {items.length} items in cart
          </Typography>

          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <Box
                key={item.id}
                alignItems="flex-start" // Align items to the top horizontally
                justifyContent="flex-start" // Align items to the top vertically
                sx={{
                  marginTop: 1,
                  marginBottom: 1,
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
                      height: 140,
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
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>

                  <ExpandableText
                    text={item.description || "No description available."}
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
                  sx={{ p: 2 }}
                >
                  <Typography variant="h5">
                    ₹{item.price.toFixed(2)}{" "}
                    <LocalOfferIcon style={{ verticalAlign: "middle" }} />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ₹{item.mrp.toFixed(2)}
                    <LocalOfferIcon
                      style={{
                        marginLeft: "8px",
                        verticalAlign: "middle",
                        color: "#ffffff", // Set the color to white
                      }}
                    />
                  </Typography>

                  <Box
                    display="flex"
                    gap={1}
                    flexDirection="row"
                    alignItems="flex-end" // Align items to the end horizontally
                    justifyContent="flex-end" // Align items to the top vertically
                  >
                    <Box display="flex" alignItems="center" gap={1}>
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
                          color: "#555",
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
                          minWidth: "30px",
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
                          color: "#555",
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
                    </Box>

                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                    >
                      <DeleteIcon style={{ verticalAlign: "middle" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              {index < items.length - 1 && <Divider className="thin" />}
            </React.Fragment>
          ))}
        </Box>

        <Box flex={1}>
          <Typography variant="h6">Total:</Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold", // Make the text bold
            }}
          >
            ₹{totalAmount.toFixed(2)}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontWeight: "bold", // Make the text bold
              textDecoration: "line-through",
            }}
          >
            ₹{totalMrp.toFixed(2)}
          </Typography>
          <Typography
            color="grey"
            sx={{
              fontWeight: "normal",
            }}
          >
            {totalPercentage}% off
          </Typography>

          <Button text="Checkout" onClick={handleCheckOut} />

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="h6"
            sx={{
              marginTop: "20px", // Adjust top margin
              marginBottom: "10px", // Adjust bottom margin
            }}
          >
            Promotions
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
};

//   return (
//     <div className="cart">
//       <p className="card-heading">{"Shopping Cart"}</p>

//       <div className="cart_main">
//         <div className="cart_items">
//           <TextView
//             text={`${items.length} items in cart`}
//             color="#000"
//             size={24}
//             textStyle="bold"
//           />
//           <div className="card-list">
//             <div>
//               {items.map((item, index) => (
//                 <React.Fragment key={item.id}>
//                   <div key={item.id} className="card">
//                     <div className="card-left">
//                       {/* Image, Title, Description, Rating */}
//                       {/* Main Image */}
//                       <img
//                         src={item.imgUrl}
//                         alt={`${item.name}`}
//                         className="card-image"
//                       />
//                     </div>

//                     <div className="card-middle">
//                       <div className="card-content">
//                         {/* Title */}
//                         <h2 className="card-title">{item.name}</h2>

//                         {/* Description */}
//                         <p className="card-description">
//                           {item.description || "No description available."}
//                         </p>

//                         {/* Rating */}
//                         <p className="card-rating">
//                           {/* Rating: {item.rating} ({item.ratingCount} reviews) */}
//                           <Rating
//                             totalRatings={item.totalRatings}
//                             rating={item.rating}
//                           />
//                         </p>
//                       </div>
//                     </div>

//                     <div className="card-right">
//                       {/* Price, MRP, Quantity */}
//                       {/* Price */}
//                       {/* <p className="card-price">₹{item.price.toFixed(2)}</p> */}
//                       <p className="card-price">
//                         ₹ {item.price.toFixed(2)}
//                         <IoPricetag
//                           style={{ marginLeft: "3px", verticalAlign: "middle" }}
//                         />
//                       </p>

//                       <p className="card-mrp">₹ {item.mrp.toFixed(2)}</p>

//                       <div className="card-quantity_list">
//                         {/* Quantity */}
//                         <div className="quantity-container">
//                           <button
//                             className="quantity-btn"
//                             onClick={() =>
//                               decreaseQuantity(item.id, item.minItem)
//                             }
//                             disabled={quantities[item.id] <= item.minItem}
//                           >
//                             -
//                           </button>
//                           <span className="quantity">
//                             {quantities[item.id]}
//                           </span>
//                           <button
//                             className="quantity-btn"
//                             onClick={() =>
//                               increaseQuantity(item.id, item.maxItem)
//                             }
//                             disabled={quantities[item.id] >= item.maxItem}
//                           >
//                             +
//                           </button>
//                         </div>
//                         <IoTrashBinSharp
//                           style={{
//                             marginLeft: "3px",
//                             marginTop: "3px",
//                             marginBottom: "3px",
//                             marginRight: "3px",
//                             alignItems: "centre",
//                           }}
//                           onClick={() => removeItem(item.id)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   {/* Divider between items except the last one */}
//                   {index < items.length - 1 && <Divider className="thin" />}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="cart_checkout">
//           <TextView text={`Total:`} color="#000" size={24} textStyle="bold" />
//           <TextView
//             text={`₹${totalAmount.toFixed(2)}`}
//             color="#000"
//             size={24}
//             textStyle="bold"
//           />
//           <p className="card-checkout-mrp">₹ {totalMrp.toFixed(2)}</p>
//           <p className="card-checkout-percentage">{totalPercentage}% off</p>
//           <Button text="Checkout" onClick={handleCheckOut} />
//           <hr class="card-checkout-divider" />
//           <TextView text="Promotions" color="#333" size={20} textstyle="bold" />
//           {appliedCoupon && (
//             <TextViewWithClose
//               text={appliedCoupon}
//               onClose={handleRemoveCoupon}
//             />
//           )}
//           <CouponCode onApply={handleApplyCoupon} />
//           {couponMessage && <p className="coupon-message">{couponMessage}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

export default GetCartCard;
