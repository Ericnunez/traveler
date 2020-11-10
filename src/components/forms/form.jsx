import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textArea";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    // console.log("errors validate", errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    // console.log("errors", errors);
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleImageChange = (event) => {
    const types = ["image/png", "image/jpeg", "image/gif"];

    let selected = event.target.files[0];

    if (selected && types.includes(selected.type)) {
      const data = { ...this.state.data };
      data[event.currentTarget.name] = event.target.files[0].name;
      console.log("inside the if", data);
      this.setState({ data });
    }
  };

  renderButton(label, options) {
    let classes = "btn btn-primary shadow ";
    if (options) classes += options;
    return (
      <button disabled={this.validate()} className={classes}>
        {label}
      </button>
    );
  }

  renderListFormButton(label, options) {
    let classes = "btn btn-primary shadow ";
    if (options) classes += options;
    // data-toggle="modal"
    //     data-target="#exampleModal"
    return (
      <button disabled={this.validate()} className={classes}>
        {label}
      </button>
    );
  }

  renderTextArea(name, label, placeholder, type = "textarea") {
    const { data, errors } = this.state;

    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }
  renderFileInput(name, label, placeholder, type = "file") {
    const { data } = this.state;
    return (
      <div className="custom-file">
        <input
          name={name}
          value={data[name]}
          type={type}
          onChange={this.handleImageChange}
          className="custom-file-input"
          accept="image/*"
          placeholder={placeholder}
        />
        <label className="custom-file-label">
          {data[name] ? data[name] : placeholder}
        </label>
      </div>
    );
  }
  renderInput(name, label, placeholder, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
