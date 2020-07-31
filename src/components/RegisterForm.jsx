import React from "react";
import Joi from "joi-browser";

import Form from "./shared/Form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  loginSchema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("calling api");
  };
  render() {
    return (
      <div>
        <h2>Register Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.submitButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
