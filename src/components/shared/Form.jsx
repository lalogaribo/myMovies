import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "./Input";
import DropDown from "./DropDown";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { data } = this.state;

    const { error } = Joi.validate(data, this.loginSchema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const errorObj = { [name]: value };
    console.log(name, value);
    const schema = {
      [name]: this.loginSchema[name],
    };
    const { error } = Joi.validate(errorObj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);

    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      data,
      errors,
    });
  };

  handleSelect = ({ currentTarget }) => {
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    const errorMessage = this.validateProperty(currentTarget);
    this.setState({ data });
  };

  submitButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        placeholder={label}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
        autoComplete="off"
      />
    );
  }

  renderDropdown(name, label, collection, value) {
    const { data, errors } = this.state;
    return (
      <DropDown
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        collection={collection}
        handleSelect={this.handleSelect}
      />
    );
  }
}

export default Form;
