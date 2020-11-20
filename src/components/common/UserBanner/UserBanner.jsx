import React from "react";
import "./UserBanner.css";

const UserBanner = ({ profilePicture, displayName, email, height, width }) => {
  const defImage =
    "https://firebasestorage.googleapis.com/v0/b/roadtripper-fc6cc.appspot.com/o/images%2Fstatic%2Fprofile-picture.png?alt=media&token=e487b4cb-fc42-4af3-932e-d8fb22ba2f6b";
  return (
    <div className="ml-3 d-flex align-items-center flex-wrap p-1">
      <img
        className="rounded-circle"
        src={profilePicture ? profilePicture : defImage}
        alt="profile"
        height={height}
        width={width}
      ></img>
      <article className="d-flex justify-content-center">
        <div className="profile-user-details p-3 border-left ml-3">
          <h4 className="mb-0">{displayName}</h4>
          <h6 className="text-secondary">{email}</h6>
          <h6>RoadTripper Contributer</h6>
        </div>
      </article>
    </div>
  );
};

export default UserBanner;
