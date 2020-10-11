import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "./common/logoutButton";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-0 bg-white border-bottom shadow-sm">
        <Link to="/home" className="my-0 mr-md-auto ">
          Roadtripper
        </Link>
        <nav className="my-2 my-md-0 mr-md-3">
          <NavLink to="/lists" className="p-2 text-dark ">
            Lists
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink to="/login" className="p-2 text-dark ">
                Login
              </NavLink>
              <NavLink to="/register" className="p-2 text-dark ">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink to="/create-list/new" className="p-2 text-dark ">
                Create a List
              </NavLink>
              <NavLink to="/profile-page" className="p-2 text-dark ">
                My Account
              </NavLink>
              <LogoutButton />
            </React.Fragment>
          )}
        </nav>
      </div>
    );
  }
}

export default Navbar;
