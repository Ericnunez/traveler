import React, { Component } from "react";
import { auth } from "../../firebase/firebase";

class LogoutButton extends Component {
  handleSignOut() {
    auth.signOut();
    localStorage.clear();
    window.location = "/";
  }

  render() {
    return (
      <button onClick={this.handleSignOut} className="btn btn-outline-dark">
        Sign out
      </button>
    );
  }
}

export default LogoutButton;
