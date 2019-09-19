import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from "redux";
import "./styles.css";
import logo from "./assets/logo.png";
////import dataReducer from "./reducers/data";
//import { Provider } from "react-redux";

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submitForm = this.submitForm.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    /* console.log("CDM", localStorage);
    let stFN = localStorage.getItem("first_name");
    let stLN = localStorage.getItem("last_name");
    let stDOB = localStorage.getItem("date_of_birth");
    let stEM = localStorage.getItem("email");
    if (stFN !== "undefined") {
      document.getElementById("first_name").value = stFN;
    }
    if (stLN !== "undefined") {
      document.getElementById("last_name").value = stLN;
    }
    if (stDOB !== "undefined") {
      document.getElementById("date_of_birth").value = stDOB;
    }
    if (stEM !== "undefined") {
      document.getElementById("email").value = stEM;
    }*/
  }

  onChange() {
    /*let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let date_of_birth = this.state.date_of_birth;
    let email = this.state.email;

    localStorage.setItem("first_name", first_name);
    localStorage.setItem("last_name", last_name);
    localStorage.setItem("date_of_birth", date_of_birth);
    localStorage.setItem("email", email);
*/
    //console.log("ONCHG", localStorage);
  }

  validateEmail(email) {
    //console.log("validemailtest", email);
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

    // console.log("Run Validation", valid);

    /* Check existence of both names and that they meet the required length */
    if (fn && fn.length >= 2 && (ln && ln.length >= 2)) {
      nameValid = true;
    }
    // console.log("Name valid? ", nameValid);

    /* Check age in relation to today's date */

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.setState({ age: age });

    /* And if they're a valid age... */
    if (age !== 0 && age >= 18 && age <= 150) {
      ageValid = true;
    }
    //  console.log("valid age? ", ageValid);

    /* Run email validation function */
    if (email && this.validateEmail(email)) {
      emailValid = true;
    } else {
      emailValid = false;
    }
    //console.log("Valid Email? ", emailValid);

    /* Do final validation checks to ensure we're good to go */
    if (nameValid && ageValid && emailValid) {
      isSubmitValid = true;
    }
    /* Set the state.. */
    //  console.log("valid passed? ", isSubmitValid);
    this.setState({ isSubmitValid: isSubmitValid });
    this.onChange();
    return { isSubmitValid };
  }
  submitForm = e => {
    console.log("POSTED FIELDS", this.state);
    alert("Congratulations on submitting your details!");
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
          <h1>User Details</h1>
          <h2>Please enter your details to continue:</h2>

          <form onSubmit={this.submitForm}>
            <div className="formfields">
              <div>
                <label>
                  First Name:
                  <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="Type here"
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
                    placeholder="Doe"
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
                    placeholder="Type here"
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

/*  <button onClick={() => localStorage.clear()}>Clear Storage</button> */
