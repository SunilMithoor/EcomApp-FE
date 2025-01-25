import React, { useRef, useEffect } from "react";
import { useFetchHome } from "../../hooks/home";
import NoData from "../../components/common/nodataavailable/NoDataCustom";
import { Box, Alert, Typography } from "@mui/material";
import BackDropLoader from "../../components/common/loaders/BackDropLoader";
import DefaultPage from "../default/Default";

function Home() {
  const { data, isLoading, error } = useFetchHome();
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
  let homeItems = {};
  if (data.success === true) {
    homeItems = data.data || {};
  }

  // Check if homeItems is empty
  const isHomeItemsEmpty = Object.keys(homeItems).length === 0;

  return (
    <Box sx={{ padding: 2, height: "auto", minHeight: "80vh" }}>
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
      {!isLoading && !error && isHomeItemsEmpty && (
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

      {!isLoading && !error && !isHomeItemsEmpty && (
        <div>
          <DefaultPage />
        </div>
      )}
    </Box>
  );
}

export default Home;
