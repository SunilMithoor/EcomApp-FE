import React from "react";
import { Divider as MUIDivider } from "@mui/material";

function Divider({ className, ...props }) {
  return <MUIDivider className={className} {...props} />;
}

export default Divider;
