import React from "react";
import Joi from "joi-browser";
import Form from "../components/forms/form";
import { auth } from "../firebase/firebase";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    signinError: "",
  };

  schema = {
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location = "/";
    } catch (error) {
      this.setState({
        signinError: error.code.replace("auth/", ""),
      });
    }
  };

  render() {
    const { signinError } = this.state;
    if (localStorage.getItem("uid")) window.location = "/";
    return (
      <React.Fragment>
        <section className="form-container ">
          <div className="container form-signin card shadow">
            <h1 className="text-center">Roadtripper</h1>
            <h5 className="text-center">Login</h5>
            {signinError && (
              <div className="alert alert-danger mt-1">{signinError}</div>
            )}
            <form className="" onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password")}
              {this.renderButton("login", "btn-block")}
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Login;
