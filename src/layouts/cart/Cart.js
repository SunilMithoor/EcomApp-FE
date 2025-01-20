import React, { useRef, useEffect } from "react";
import { useFetchCart } from "../../hooks/useFetchCart";
import CartCard from "./CartCard";
import NoData from "../../components/common/nodataavailable/NoDataCustom";
import { Box, Alert } from "@mui/material";
import BackDropLoader from "../../components/common/loaders/BackDropLoader";
import { useParams } from "react-router-dom";

function GetCartItems() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchCart();
  const loaderRef = useRef();

  useEffect(() => {
    // Show or hide loader based on isLoading
    if (isLoading) {
      loaderRef.current.start();
    } else {
      loaderRef.current.stop();
    }
  }, [isLoading]);

  // Normalize cartItems to an empty array if null
  let cartItems = [];
  if (data.success === true) {
    cartItems = data.data || [];
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Backdrop Loader */}
      <BackDropLoader ref={loaderRef} />

      {/* Error UI */}
      {!isLoading && error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Alert severity="error">{data.message}</Alert>
        </Box>
      )}

      {/* No Data UI */}
      {!isLoading && !error && cartItems.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <NoData message={data.message} />
        </Box>
      )}

      {/* Success UI */}
      {!isLoading && !error && cartItems.length > 0 && (
        <CartCard data={cartItems} />
      )}
    </Box>
  );
}

export default GetCartItems;
