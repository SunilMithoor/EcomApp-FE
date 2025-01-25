import React from "react";
import { useParams } from "react-router-dom";
import DefaultPage from "../default/Default";

function Wishlist() {
  const { id } = useParams();
  console.log("Item useParams:", id);
  return (
    <div>
      <DefaultPage />
    </div>
  );
}

export default Wishlist;
