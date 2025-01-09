import React from "react";
import useFetchCartItems from "../../hooks/useFetchCart";
import CartCard from "./CartCard";
import "./Cart.css";
import BouncingDotsLoader from "../../components/loaders/bouncingDotLoader/BouncingDotsLoader";
import NoData from "../../components/nodata/NoData";

const GetCartItems = () => {
  const { data, isLoading, error } = useFetchCartItems();

  // Normalize cartItems to an empty array if null
  var cartItems = "";
  if (data.success === true) {
    cartItems = data.data || [];
  } else {
    cartItems = [];
  }

  return (
    <div className="cart-container">
      {/* Main Content */}
      <div className="cart-container">
        {/* Loading UI */}
        {isLoading && (
          <div className="loading-container">
            <BouncingDotsLoader />
          </div>
        )}
        {/* Error UI */}
        {!isLoading && error && (
          <div className="error-container">
            <NoData message={data.message} />
          </div>
        )}

        {/* No Data UI */}
        {!isLoading && !error && cartItems.length === 0 && (
          <div className="error-container">
            <NoData message={data.message} />
          </div>
        )}

        {/* Success UI */}
        {!isLoading && !error && cartItems.length > 0 && (
          <CartCard data={cartItems} />
        )}
      </div>
    </div>
  );
};

export default GetCartItems;
