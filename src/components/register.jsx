import React from "react";
import Joi from "joi-browser";
import Form from "../components/forms/form";
import { auth, generateUserDocument } from "../firebase/firebase";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
    registerError: "",
  };

  schema = {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    name: Joi.string().max(20).required().label("Name"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };

  componentDidMount() {
    if (localStorage.getItem("uid")) window.location = "/profile-page";
  }

  doSubmit = async () => {
    const { email, password, name } = this.state.data;
    await this.createUserWithEmailAndPasswordHandler(email, password, name);
    window.location = "/";
  };

  createUserWithEmailAndPasswordHandler = async (email, password, name) => {
    console.log(email, password, name, "");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      user.updateProfile({
        displayName: name,
      });
      localStorage.setItem("token", user.getIdToken()).catch(function (error) {
        // An error happened.
        console.log("Error updating user profile", error);
      });
      generateUserDocument(user, name);
    } catch (error) {
      if (error.code)
        this.setState({
          registerError: error.code.replace("auth/", ""),
        });
    }
  };

  render() {
    if (localStorage.getItem("uid")) window.location = "/profile-page";
    const { registerError } = this.state;
    return (
      <React.Fragment>
        <section className="form-container">
          <div className="container form-signin card shadow">
            <h1 className="text-center">Roadtripper</h1>
            <h5 className="text-center">Register</h5>
            <form className="" onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("name", "Name")}
              {this.renderInput("password", "Password")}
              {this.renderButton("register", "btn-block")}
            </form>
            {registerError && (
              <div className="alert alert-danger mt-1">{registerError}</div>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Register;
