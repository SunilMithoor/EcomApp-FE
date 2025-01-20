import React from "react";
import { useParams } from "react-router-dom";

function Wishlist() {
  const { id } = useParams();
  console.log("Item useParams:", id);
  return (
    <div>
      <p>Wishlist</p>
      <p>Wishlist Details for ID: {id}</p>
    </div>
  );
}

export default Wishlist;
