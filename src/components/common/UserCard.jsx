import React from "react";

const UserCard = ({ profilePicture, displayName, email, height, width }) => {
  const defImage =
    "https://firebasestorage.googleapis.com/v0/b/roadtripper-fc6cc.appspot.com/o/images%2Fstatic%2Fprofile-picture.png?alt=media&token=e487b4cb-fc42-4af3-932e-d8fb22ba2f6b";

  return (
    <div className="flex-md-row">
      <div className="d-flex align-items-center flex-wrap">
        <img
          className="rounded-circle"
          src={profilePicture ? profilePicture : defImage}
          alt="profile"
          height={height}
          width={width}
        ></img>
        <article className="d-flex justify-content-center">
          <div className="profile-user-details p-3">
            <React.Fragment>
              <h6 className="mb-0">{displayName}</h6>
              <h6 className="text-secondary">Contact: {email}</h6>
            </React.Fragment>
          </div>
        </article>
      </div>
    </div>
  );
};

export default UserCard;
