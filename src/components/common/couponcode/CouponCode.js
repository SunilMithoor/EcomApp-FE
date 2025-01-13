// import React, { useState } from "react";
// import "./CouponCode.css"; // Optional: For styling

// const CouponCode = ({ onApply }) => {
//   const [coupon, setCoupon] = useState("");

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     // Allow only alphanumeric characters (text and numbers) and convert to uppercase
//     const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
//     setCoupon(sanitizedValue);
//   };

//   const handleApply = () => {
//     if (coupon.trim() !== "") {
//       onApply(coupon);
//       setCoupon(""); // Clear the input field after applying
//     }
//   };

//   return (
//     <div className="coupon-container">
//       <input
//         type="text"
//         value={coupon}
//         placeholder="Enter coupon code"
//         className="coupon-input"
//         onChange={handleInputChange}
//       />
//       <button className="apply-button" onClick={handleApply}>
//         Apply
//       </button>
//     </div>
//   );
// };

// export default CouponCode;

import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const CouponCode = ({ onApply }) => {
  const [coupon, setCoupon] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only alphanumeric characters and convert to uppercase
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
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{
        marginTop: 2,
      }}
    >
      <TextField
        value={coupon}
        onChange={handleInputChange}
        placeholder="Enter coupon code"
        variant="outlined"
        color="grey"
        size="small"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleApply}
        disabled={!coupon.trim()}
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#000000",
          "&:hover": {
            backgroundColor: "#000000",
          },
        }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default CouponCode;
