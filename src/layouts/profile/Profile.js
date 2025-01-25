import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <div>
      <p>Profile</p>
    </div>
  );
};

export default Profile;
