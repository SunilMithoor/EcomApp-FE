import React from "react";
import { useParams } from "react-router-dom";
import DefaultPage from "../default/Default";

function Notifications() {
  const { id } = useParams();
  return (
    <div>
      <DefaultPage />
    </div>
  );
}

export default Notifications;
