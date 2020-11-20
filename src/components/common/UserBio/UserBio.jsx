import React, { useState, useEffect } from "react";
import UserBioForm from "../UserBioForm/UserBioForm";
import "./UserBio.css";
import { updateUserDocument } from "../../../firebase/firebase";

const UserBio = (props) => {
  const [showBioForm, setShowBioForm] = useState(false);
  const [data, setData] = useState({});
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setData(props.data);
    setEditData(props.data);
  }, []);

  const handleEditProfile = () => {
    setShowBioForm(!showBioForm);
  };

  const handleSaveBio = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    const obj = { ...editData };
    try {
      await updateUserDocument(uid, obj);
      window.location.reload();
    } catch (error) {
      console.log("There was a problem updating your bio", error);
    }
  };

  const handleCancelBio = (e) => {
    e.preventDefault();
    setEditData(data);
    handleEditProfile();
  };

  const handleChange = ({ currentTarget: input }) => {
    const update = { ...editData };
    update[input.id] = input.value;
    setEditData(update);
  };

  return (
    <div className="">
      <div className="user-inner-bio">
        <p>{data.bio}</p>

        {showBioForm ? (
          <UserBioForm
            onSaveBio={handleSaveBio}
            onCancelBio={handleCancelBio}
            handleChange={handleChange}
            data={editData}
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
              <p>{data.location}</p>
            </div>
            <div className="info-data">
              <i className="fas fa-link pr-2 text-muted"></i>
              <p>{data.website}</p>
            </div>
            <div className="info-data">
              <i className="fab fa-twitter pr-2 text-muted"></i>
              <p>{data.twitterUsername}</p>
            </div>
            <div className="info-data">
              <i className="fab fa-instagram pr-2 text-muted"></i>
              <p>{data.instagramUsername}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBio;
