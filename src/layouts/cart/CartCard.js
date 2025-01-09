import React, { useState, useEffect } from "react";
import "./Cart.css";
import Rating from "../../components/rating/Rating.js";
import { IoPricetag } from "react-icons/io5";
import Button from "../../components/common/button/Button.js";
import Divider from "../../components/common/divider/Divider.js";
import TextViewWithClose from "../../components/common/textviewwithclose/TextViewWithClose.js";
import CouponCode from "../../components/common/couponcode/CouponCode.js";
import TextView from "../../components/common/textview/TextView.js";

const GetCartCard = ({ data }) => {
  const items = Array.isArray(data) ? data : [];

  // State to store quantity for each item
  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => {
      acc[item.id] = item.minItem; // Initialize quantity with minItem
      return acc;
    }, {})
  );

  // Decrease the quantity of an item
  const decreaseQuantity = (itemId, minItem) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [itemId]: Math.max(prevQuantities[itemId] - 1, minItem),
      };
      updateTotals(newQuantities);
      return newQuantities;
    });
  };

  // Increase the quantity of an item
  const increaseQuantity = (itemId, maxItem) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [itemId]: Math.min(prevQuantities[itemId] + 1, maxItem),
      };
      updateTotals(newQuantities);
      return newQuantities;
    });
  };

  // Calculate the totals based on the current quantities
  const updateTotals = (quantities) => {
    let newTotalAmount = 0;
    let newTotalMrp = 0;

    items.forEach((item) => {
      const quantity = quantities[item.id];
      newTotalAmount += item.price * quantity;
      newTotalMrp += item.mrp * quantity;
    });

    // Apply coupon discount if a coupon is applied
    if (appliedCoupon === "DISCOUNT20") {
      newTotalAmount = newTotalAmount * 0.8; // Apply 20% discount
    }

    setTotalAmount(newTotalAmount);
    setTotalMrp(newTotalMrp);

    // Calculate discount percentage
    if (newTotalMrp > 0) {
      const discountPercentage =
        ((newTotalMrp - newTotalAmount) / newTotalMrp) * 100;
      setPercentage(discountPercentage.toFixed(2));
    }
  };

  // Recalculate totals when quantities change
  useEffect(() => {
    updateTotals(quantities);
  }, [quantities]);

  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const handleApplyCoupon = (code) => {
    if (appliedCoupon === code) {
      setCouponMessage(`Coupon "${code}" is already applied.`);
      if (code === "DISCOUNT20") {
        updateTotals(quantities);
      }
    } else {
      // Reset the applied coupon first to force re-render
      setAppliedCoupon("");
      setTimeout(() => {
        setAppliedCoupon(code);
        setCouponMessage(`Coupon "${code}" applied successfully.`);
      }, 0);
    }

    // Clear the message after 5 seconds
    setTimeout(() => {
      setCouponMessage("");
    }, 3000);
  };

  const handleRemoveCoupon = () => {
    setCouponMessage(`Coupon "${appliedCoupon}" removed.`);
    setAppliedCoupon("");
    updateTotals(quantities); // Recalculate totals without the coupon
    // Clear the message after 5 seconds
    setTimeout(() => {
      setCouponMessage("");
    }, 3000);
  };

  const handleCheckOut = () => {};

  // State to store total amount, MRP and discount percentage
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalPercentage, setPercentage] = useState(0);

  return (
    <div className="cart">
      <p className="card-heading">{"Shopping Cart"}</p>

      <div className="cart_main">
        <div className="cart_items">
          <TextView
            text={`${items.length} items in cart`}
            color="#000"
            size={24}
            textStyle="bold"
          />
          <div className="card-list">
            <div>
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div key={item.id} className="card">
                    <div className="card-left">
                      {/* Image, Title, Description, Rating */}
                      {/* Main Image */}
                      <img
                        src={item.imgUrl}
                        alt={`${item.name}`}
                        className="card-image"
                      />
                    </div>

                    <div className="card-middle">
                      <div className="card-content">
                        {/* Title */}
                        <h2 className="card-title">{item.name}</h2>

                        {/* Description */}
                        <p className="card-description">
                          {item.description || "No description available."}
                        </p>

                        {/* Rating */}
                        <p className="card-rating">
                          {/* Rating: {item.rating} ({item.ratingCount} reviews) */}
                          <Rating
                            totalRatings={item.totalRatings}
                            rating={item.rating}
                          />
                        </p>
                      </div>
                    </div>

                    <div className="card-right">
                      {/* Price, MRP, Quantity */}
                      {/* Price */}
                      {/* <p className="card-price">₹{item.price.toFixed(2)}</p> */}
                      <p className="card-price">
                        ₹ {item.price.toFixed(2)}
                        <IoPricetag
                          style={{ marginLeft: "3px", verticalAlign: "middle" }}
                        />
                      </p>

                      <p className="card-mrp">₹ {item.mrp.toFixed(2)}</p>

                      {/* Quantity */}
                      <div className="quantity-container">
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            decreaseQuantity(item.id, item.minItem)
                          }
                          disabled={quantities[item.id] <= item.minItem}
                        >
                          -
                        </button>
                        <span className="quantity">{quantities[item.id]}</span>
                        <button
                          className="quantity-btn"
                          onClick={() =>
                            increaseQuantity(item.id, item.maxItem)
                          }
                          disabled={quantities[item.id] >= item.maxItem}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Divider between items except the last one */}
                  {index < items.length - 1 && <Divider className="thin" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="cart_checkout">
          <TextView text={`Total:`} color="#000" size={24} textStyle="bold" />
          <TextView
            text={`₹${totalAmount.toFixed(2)}`}
            color="#000"
            size={24}
            textStyle="bold"
          />
          <p className="card-checkout-mrp">₹ {totalMrp.toFixed(2)}</p>
          <p className="card-checkout-percentage">{totalPercentage}% off</p>
          <Button text="Checkout" onClick={handleCheckOut} />
          <hr class="card-checkout-divider" />
          <TextView text="Promotions" color="#333" size={20} textstyle="bold" />
          {appliedCoupon && (
            <TextViewWithClose
              text={appliedCoupon}
              onClose={handleRemoveCoupon}
            />
          )}
          <CouponCode onApply={handleApplyCoupon} />
          {couponMessage && <p className="coupon-message">{couponMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default GetCartCard;
