import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Backdrop } from "@mui/material";
import PropagateLoaders from "../../common/loaders/PropagateLoader.js";

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
      <PropagateLoaders loading={true} />
    </Backdrop>
  );
});

export default BackDropLoader;
