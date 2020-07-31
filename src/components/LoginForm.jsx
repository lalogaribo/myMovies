import React from "react";
import Joi from "joi-browser";

import Form from "./shared/Form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  loginSchema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    console.log("sibmit");
  };
  render() {
    return (
      <div>
        <h2>Login Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.submitButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
