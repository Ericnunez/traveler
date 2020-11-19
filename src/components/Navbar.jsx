import React from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "./common/logoutButton";

const Navbar = ({ user }) => {
  return (
    <nav className="d-flex navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/home" className="mr-aut">
        <img
          className="header-icon"
          src="https://firebasestorage.googleapis.com/v0/b/roadtripper-fc6cc.appspot.com/o/images%2Fstatic%2Flogo.svg?alt=media&token=061facea-3590-47e0-bfad-e3dc33afe41a"
          alt="logo"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ml-auto" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li>
            <NavLink to="/lists" className="text-dark p-2">
              Lists
            </NavLink>
          </li>
          {user ? (
            <React.Fragment>
              <li className="nav-item">
                {" "}
                <NavLink to="/create-list/new" className="text-dark p-2">
                  Create a List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile-page" className="text-dark p-2">
                  My Account
                </NavLink>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="text-dark p-2">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink to="/register" className="text-dark p-2">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default Navbar;
