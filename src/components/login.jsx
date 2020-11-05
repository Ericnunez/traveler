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
    console.log("inside doSubmit");
    const { email, password } = this.state.data;
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(function (user) {
        // console.log("inside then", user.getIdToken());
        // user.localStorage.setItem("token", user.getIdToken());
      })
      .catch((error) => {
        if (error.code)
          this.setState({
            signinError: error.code.replace("auth/", ""),
          });
        setTimeout(() => {
          window.location = state ? state.from.pathname : "/login";
        }, 1500);
      });
    const { state } = this.props.location;
    window.location = state ? state.from.pathname : "/";
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
            <form className="" onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password")}
              {this.renderButton("login", "btn-block")}
            </form>

            {signinError && (
              <div className="alert alert-danger mt-1">{signinError}</div>
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Login;
