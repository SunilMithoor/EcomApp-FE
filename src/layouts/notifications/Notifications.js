import React from "react";
import { useParams } from "react-router-dom";

function Notifications() {
  const { id } = useParams();
  return (
    <div>
      <p>Notifications</p>
      <p>Notification Details for ID: {id}</p>
    </div>
  );
}

export default Notifications;
