import React from "react";
import { useState } from "react";
import UserBioForm from "../UserBioForm/UserBioForm";
import "./UserBio.css";

const UserBio = () => {
  const [showBioForm, setShowBioForm] = useState(false);

  const handleEditProfile = () => {
    setShowBioForm(!showBioForm);
  };

  const handleSaveBio = (e) => {
    e.preventDefault();
    console.log("click");
  };

  const handleCancelBio = (e) => {
    e.preventDefault();
    console.log("click");
  };

  return (
    <div className="user-bio">
      <div className="user-inner-bio">
        <p>
          Northeastern Illinois University Not saving anything for the swim
          back. Now something here this is a placeholder and this is something
          crazy going on!
        </p>

        {showBioForm ? (
          <UserBioForm
            onSaveBio={handleSaveBio}
            onCancelBio={handleEditProfile}
          />
        ) : (
          <div className="user-info">
            <button
              onClick={handleEditProfile}
              type="button"
              className="btn btn-outline-secondary btn-block mb-2"
            >
              Edit profile
            </button>
            <div className="info-data">
              <i className="fas fa-globe-americas pr-2 text-muted"></i>
              <p>Something here</p>
            </div>
            <div className="info-data">
              <i className="fas fa-link pr-2 text-muted"></i>
              <p>Something here</p>
            </div>
            <div className="info-data">
              <i className="fab fa-twitter pr-2 text-muted"></i>
              <p>Something here</p>
            </div>
            <div className="info-data">
              <i className="fab fa-instagram pr-2 text-muted"></i>
              <p>Something here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBio;
