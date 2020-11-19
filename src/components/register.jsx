import React from "react";
import Joi from "joi-browser";
import Form from "../components/forms/form";
import LoadingIndicator from "./common/LoadingIndicator";
import {
  auth,
  generateUserDocument,
  generateUserLikesDocument,
} from "../firebase/firebase";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
    registerError: "",
    uploading: false,
  };

  schema = {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    name: Joi.string().min(2).max(30).required().label("Name"),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };

  componentDidMount() {
    if (localStorage.getItem("uid")) window.location = "/profile-page";
  }

  doSubmit = async () => {
    this.setState({ loading: true });
    const { email, password, name } = this.state.data;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await user.updateProfile({
        displayName: name,
      });
      await generateUserDocument(user, name);
      await generateUserLikesDocument(user);

      window.location = "/";
    } catch (error) {
      this.setState({
        registerError: error.code.replace("auth/", ""),
        uploading: false,
      });
    }
  };

  render() {
    const { registerError } = this.state;
    return (
      <React.Fragment>
        {this.state.uploading ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <LoadingIndicator />
          </div>
        ) : (
          <section className="form-container">
            <div className="container form-signin card shadow">
              <h1 className="text-center">Roadtripper</h1>
              <h5 className="text-center">Register</h5>
              {registerError && (
                <div className="alert alert-danger mt-1">{registerError}</div>
              )}
              <form className="" onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("name", "Name")}
                {this.renderInput("password", "Password")}
                {this.renderButton("register", "btn-block")}
              </form>
            </div>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Register;
