import React from "react";
import { useState } from "react";
import "./UserBioForm.css";

const UserBioForm = ({ data, onSaveBio, onCancelBio, handleChange }) => {
  return (
    <div className="user-bio-form">
      <form>
        <div className="form-group">
          <textarea
            value={data.bio}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            id="bio"
            rows="3"
          ></textarea>
        </div>
        <div className="d-flex align-items-center form-group">
          <i className="fas fa-globe-americas pr-2 text-muted"></i>
          <input
            value={data.location}
            onChange={(e) => {
              handleChange(e);
            }}
            type="text"
            className="form-control form-control-sm"
            id="location"
            placeholder="Location"
          />
        </div>
        <div className="d-flex align-items-center form-group">
          <i className="fas fa-link pr-2 text-muted"></i>
          <input
            value={data.website}
            onChange={(e) => {
              handleChange(e);
            }}
            type="text"
            className="form-control form-control-sm"
            id="website"
            placeholder="Website"
          />
        </div>
        <div className="d-flex align-items-center form-group">
          <i className="fab fa-twitter pr-2 text-muted"></i>
          <input
            value={data.twitterUsername}
            onChange={(e) => {
              handleChange(e);
            }}
            type="text"
            className="form-control form-control-sm"
            id="twitterUsername"
            placeholder="Twitter Username"
          />
        </div>
        <div className="d-flex align-items-center form-group">
          <i className="fab fa-instagram pr-2 text-muted"></i>
          <input
            value={data.instagramUsername}
            onChange={(e) => {
              handleChange(e);
            }}
            type="text"
            className="form-control form-control-sm"
            id="instagramUsername"
            placeholder="Instagram Username"
          />
        </div>
        <button
          onClick={(e) => {
            onSaveBio(e);
          }}
          type="button"
          className="btn btn-success btn-sm mr-2"
        >
          Save
        </button>
        <button
          onClick={(e) => {
            onCancelBio(e);
          }}
          type="button"
          className="btn btn-outline-secondary btn-sm"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserBioForm;
