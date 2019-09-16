import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { validator } from "email-validator";

import "./styles.css";

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formPost: "",
      email: ""
    };
    this.submitForm = this.submitForm.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
  }
  onChange(e, field, value) {
    //store the change
    store.dispatch({ type: "set_field", field, value });
  }

  reset() {
    store.dispatch({ type: "reset_data" });
  }

  submitForm(event) {
    alert("test");
    event.preventDefault();
  }

  validate() {
    let valid = true;
    let email = this.state.email;

    console.log("Run Validation", valid);
    console.log("Email", email);

    if (email && !validator.validate(email)); // true
    valid = false;

    this.setState({ valid: valid });
    console.log("valid state? ", valid);
    return { valid };
  }

  render() {
    let valid = this.state.valid;
    console.log("valid in render", valid);
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={this.submitForm}>
            <h1>User Details</h1>
            <h2>Please enter your details to continue:</h2>
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  name="first_name"
                  placeholder="e.g. John"
                  onBlur={this.validate}
                  required={true}
                />
              </label>
            </div>
            <div>
              <label>
                Last Name:
                <input
                  type="text"
                  name="last_name"
                  placeholder="e.g. Doe"
                  onBlur={this.validate}
                  required={true}
                />
              </label>
            </div>
            <div>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="date_of_birth"
                  onBlur={this.validate}
                  required={true}
                />
              </label>
            </div>
            <div>
              <label>
                Email Address:
                <input
                  type="email"
                  name="email"
                  onBlur={this.validate}
                  required={true}
                />
              </label>
            </div>
            <input type="submit" value="Submit" disabled={!valid} />
          </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NewForm />, rootElement);
