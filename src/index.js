import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from 'redux'
import { validator } from "email-validator";

import "./styles.css";

function submitForm() {
  alert("test");
}

function validate() {
  let valid = false;
  let email = this.state.email;
  validator.validate(email); // true
  console.log("Run Validation", valid);
  console.log("Email", email);

  if (email && !validator.validate(email)); // true
  valid = false;

  this.setState({ valid: valid });
  console.log("valid state? ", valid);
  return { valid };
}

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formPost: "",
      email: ""
    };
  }

  render() {
    let valid = this.state.valid;
    console.log("valid in render", valid);
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={submitForm}>
            <h1>User Details</h1>
            <h2>Please enter your details to continue:</h2>
            <div>
              <label>
                First Name:
                <input
                  type="text"
                  name="first_name"
                  placeholder="e.g. John"
                  onBlur={validate}
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
                  onBlur={validate}
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
                  onBlur={validate}
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
                  onBlur={validate}
                  required={true}
                />
              </label>
            </div>
            <input type="submit" value="Submit" disabled={!validate.valid} />
          </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NewForm />, rootElement);
