/***********************
 * Simon Turner
 * Coding Test - Sept 19
 *
 ***********************/
import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import logo from "./assets/logo.png";

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
    this.validate = this.validate.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  validateEmail(email) {
    /* Use regex to qualify email */
    let em = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return em.test(email);
  }

  validate() {
    let nameValid = false;
    let ageValid = false;
    let emailValid = false;
    let isSubmitValid = false;
    let email = this.state.email;
    let fn = this.state.first_name;
    let ln = this.state.last_name;
    let dob = this.state.date_of_birth;
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();

    /* Check existence of both names and that they meet the required length */
    if (fn && fn.length >= 2 && (ln && ln.length >= 2)) {
      nameValid = true;
    }

    /* Check age in relation to today's date */
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.setState({ age: age });

    /* And if they're a valid age... */
    if (age !== 0 && age >= 18 && age <= 150) {
      ageValid = true;
    }

    /* Run email validation function */
    if (email && this.validateEmail(email)) {
      emailValid = true;
    } else {
      emailValid = false;
    }

    /* Do final validation checks to ensure we're good to go */
    if (nameValid && ageValid && emailValid) {
      isSubmitValid = true;
    }
    /* Set the state.. */

    this.setState({ isSubmitValid: isSubmitValid });
    return { isSubmitValid };
  }

  /* Prevent the form from refreshing, just take the current state and log that out for now. */
  submitForm = e => {
    console.log("POSTED FIELDS", this.state);
    alert(
      "Congratulations on submitting your details! Please check your Console."
    );
    e.preventDefault();
  };

  render() {
    let isSubmitValid = this.state.isSubmitValid;

    return (
      <div className="App">
        <div className="container">
          <div className="header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h1>
            <u>User Details</u>
          </h1>
          <h2>Please enter your details to continue:</h2>
          <br />
          <br />
          <form onSubmit={this.submitForm}>
            <div className="formfields">
              <div>
                <label>
                  First Name:
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="Frank"
                    onBlur={this.validate}
                    onChange={e =>
                      this.setState({ first_name: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Last Name:
                  <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Reynolds"
                    onBlur={this.validate}
                    onChange={e => this.setState({ last_name: e.target.value })}
                  />
                </label>
              </div>
              <div>
                <label>
                  Date of Birth:
                  <input
                    id="date_of_birth"
                    type="date"
                    name="date_of_birth"
                    onBlur={this.validate}
                    onChange={e =>
                      this.setState({ date_of_birth: e.target.value })
                    }
                  />
                </label>
              </div>
              <div>
                <label>
                  Email Address:
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onBlur={this.validate}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </label>
              </div>
              <input
                className="button"
                type="submit"
                value="Submit"
                disabled={!isSubmitValid}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NewForm />, rootElement);
