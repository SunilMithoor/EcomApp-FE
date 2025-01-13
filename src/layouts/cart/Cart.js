import React from "react";
import useFetchCartItems from "../../hooks/useFetchCart";
import CartCard from "./CartCard";
import NoData from "../../components/common/nodataavailable/NoDataCustom";
import BouncingDotsLoader from "../../components/common/loaders/BouncingDotsLoader";
import { Box, Alert } from "@mui/material";
import message from "../../constants/message";

const GetCartItems = () => {
  const { data, isLoading, error } = useFetchCartItems();

  // Normalize cartItems to an empty array if null
  let cartItems = [];
  if (data.success === true) {
    cartItems = data.data || [];
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Loading UI */}
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <BouncingDotsLoader />
        </Box>
      )}

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
};

export default GetCartItems;
