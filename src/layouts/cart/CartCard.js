import React, { useState, useEffect } from "react";
import "./Cart.css";
import Rating from "../../components/rating/Rating.js";
import { IoPricetag, IoTrashBinSharp } from "react-icons/io5";
import Button from "../../components/common/button/Button.js";
import Divider from "../../components/common/divider/Divider.js";
import TextViewWithClose from "../../components/common/textviewwithclose/TextViewWithClose.js";
import CouponCode from "../../components/common/couponcode/CouponCode.js";
import TextView from "../../components/common/textview/TextView.js";

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
    updateTotals(quantities, appliedCoupon);
  }, [quantities, items, appliedCoupon]);

  // Decrease the quantity of an item
  const decreaseQuantity = (itemId, minItem) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [itemId]: Math.max(prevQuantities[itemId] - 1, minItem),
      };
      updateTotals(newQuantities, appliedCoupon);
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
      updateTotals(newQuantities, appliedCoupon);
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

                      <div className="card-quantity_list">
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
                          <span className="quantity">
                            {quantities[item.id]}
                          </span>
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
                        <IoTrashBinSharp
                          style={{
                            marginLeft: "3px",
                            marginTop: "3px",
                            marginBottom: "3px",
                            marginRight: "3px",
                            alignItems: "centre",
                          }}
                          onClick={() => removeItem(item.id)}
                        />
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
