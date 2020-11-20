import React from "react";

const UserCard = (props) => {
  const { profilePicture, location, displayName } = props.data;
  const defImage =
    "https://firebasestorage.googleapis.com/v0/b/roadtripper-fc6cc.appspot.com/o/images%2Fstatic%2Fprofile-picture.png?alt=media&token=e487b4cb-fc42-4af3-932e-d8fb22ba2f6b";

  return (
    <div className="flex-md-row">
      <div className="d-flex align-items-center flex-wrap">
        <img
          className="rounded-circle"
          src={profilePicture ? profilePicture : defImage}
          alt="profile"
          height={props.height}
          width={props.width}
        ></img>
        <article className="d-flex justify-content-center">
          <div className="profile-user-details p-3">
            <h5 className="mb-0">Author: {displayName}</h5>
            <h5 className="text-secondary">From {location}</h5>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UserCard;
