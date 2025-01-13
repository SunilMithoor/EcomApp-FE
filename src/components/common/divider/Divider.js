// import React from "react";
// import "./Divider.css"; // Optional: Add custom styles if needed

// const Divider = ({ className }) => {
//   return <hr className={`divider ${className}`} />;
// };

// export default Divider;

import React from "react";
import { Divider as MUIDivider } from "@mui/material";

const Divider = ({ className, ...props }) => {
  return <MUIDivider className={className} {...props} />;
};

export default Divider;
