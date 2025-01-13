import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
  TextField,
  Chip,
} from "@mui/material";
import { IoPricetag, IoTrashBinSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";

const GetCartCard = ({ data }) => {
  const [items, setCartItems] = useState(Array.isArray(data) ? data : []);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalPercentage, setPercentage] = useState(0);

  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => {
      acc[item.id] = item.minItem;
      return acc;
    }, {})
  );

  useEffect(() => {
    updateTotals(quantities, appliedCoupon);
  }, [quantities, items, appliedCoupon]);

  const decreaseQuantity = (itemId, minItem) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(prevQuantities[itemId] - 1, minItem),
    }));
  };

  const increaseQuantity = (itemId, maxItem) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.min(prevQuantities[itemId] + 1, maxItem),
    }));
  };

  const handleApplyCoupon = (code) => {
    if (appliedCoupon === code) {
      setCouponMessage(`Coupon "${code}" is already applied.`);
    } else {
      setAppliedCoupon(code);
      setCouponMessage(`Coupon "${code}" applied successfully.`);
    }
    setTimeout(() => setCouponMessage(""), 3000);
  };

  const handleRemoveCoupon = () => {
    const previousCoupon = appliedCoupon;
    setAppliedCoupon("");
    setCouponMessage(`Coupon "${previousCoupon}" removed.`);
    setTimeout(() => setCouponMessage(""), 3000);
  };

  const removeItem = (itemId) => {
    setCartItems(items.filter((item) => item.id !== itemId));
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[itemId];
      return newQuantities;
    });
  };

  const updateTotals = (quantities, coupon = appliedCoupon) => {
    let newTotalAmount = 0;
    let newTotalMrp = 0;

    items.forEach((item) => {
      const quantity = quantities[item.id] || 0;
      newTotalAmount += item.price * quantity;
      newTotalMrp += item.mrp * quantity;
    });

    if (coupon === "DIS20") {
      newTotalAmount *= 0.8;
    }

    const discountPercentage =
      newTotalMrp > 0
        ? ((newTotalMrp - newTotalAmount) / newTotalMrp) * 100
        : 0;

    setTotalAmount(newTotalAmount);
    setTotalMrp(newTotalMrp);
    setPercentage(discountPercentage.toFixed(2));
  };

  const handleCheckOut = () => {
    console.log("Proceed to checkout");
  };

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Shopping Cart
      </Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2}>
        <Box flex={2}>
          <Typography variant="body1">{items.length} items in cart</Typography>
          {items.map((item, index) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <Box display="flex">
                <CardMedia
                  component="img"
                  image={item.imgUrl}
                  alt={item.name}
                  sx={{ width: 100, height: 100 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description || "No description available."}
                  </Typography>
                  <Rating value={item.rating} readOnly />
                </CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ p: 2 }}
                >
                  <Typography variant="body1">
                    ₹{item.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    ₹{item.mrp.toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => decreaseQuantity(item.id, item.minItem)}
                      disabled={quantities[item.id] <= item.minItem}
                    >
                      -
                    </Button>
                    <Typography>{quantities[item.id]}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => increaseQuantity(item.id, item.maxItem)}
                      disabled={quantities[item.id] >= item.maxItem}
                    >
                      +
                    </Button>
                  </Box>
                  <IconButton color="error" onClick={() => removeItem(item.id)}>
                    <IoTrashBinSharp />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        <Box flex={1}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Summary</Typography>
            <Typography>Total: ₹{totalAmount.toFixed(2)}</Typography>
            <Typography color="text.secondary">
              MRP: ₹{totalMrp.toFixed(2)}
            </Typography>
            <Typography color="primary">
              Discount: {totalPercentage}%
            </Typography>
            <Divider sx={{ my: 2 }} />
            {appliedCoupon && (
              <Chip
                label={appliedCoupon}
                onDelete={handleRemoveCoupon}
                color="primary"
              />
            )}
            <TextField
              label="Coupon Code"
              size="small"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyCoupon(e.target.value);
              }}
            />
            {couponMessage && (
              <Typography color="error">{couponMessage}</Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckOut}
            >
              Checkout
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default GetCartCard;
