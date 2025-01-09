import React from "react";
import "./NoData.css";

const NoData = ({ message = "No data available" }) => {
  return (
    <div className="no-data-container">
      <img
        src={"/svgs/no_data_available.svg"}
        alt="No Data"
        className="no-data-image"
      />
      <p className="no-data-message">{message}</p>
    </div>
  );
};

export default NoData;
