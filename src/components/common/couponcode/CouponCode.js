import React, { useState } from "react";
import "./CouponCode.css"; // Optional: For styling

const CouponCode = ({ onApply }) => {
  const [coupon, setCoupon] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only alphanumeric characters (text and numbers) and convert to uppercase
    const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    setCoupon(sanitizedValue);
  };

  const handleApply = () => {
    if (coupon.trim() !== "") {
      onApply(coupon);
      setCoupon(""); // Clear the input field after applying
    }
  };

  return (
    <div className="coupon-container">
      <input
        type="text"
        value={coupon}
        placeholder="Enter coupon code"
        className="coupon-input"
        onChange={handleInputChange}
      />
      <button className="apply-button" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default CouponCode;
