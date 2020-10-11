import React from "react";
import Joi from "joi-browser";
// import { Redirect } from "react-router-dom";
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
      });
    const { state } = this.props.location;
    // console.log(state);
    window.location = state ? state.from.pathname : "/";
  };

  render() {
    const { signinError } = this.state;
    // if (auth.) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <section className="section-custom">
          <div className="container mt-4 mb-4 form-signin card shadow">
            <h2 className="text-center">Logo Here</h2>
            <h1 className="text-center">Roadtripper</h1>
            <form className="" onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password")}
              {this.renderButton("login", "btn-block")}
            </form>
            <p>Forgot your password?</p>
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
