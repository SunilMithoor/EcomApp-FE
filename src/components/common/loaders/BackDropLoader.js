import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const BackDropLoader = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  // Expose start and stop methods
  useImperativeHandle(ref, () => ({
    start: () => setOpen(true),
    stop: () => setOpen(false),
  }));

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

export default BackDropLoader;
