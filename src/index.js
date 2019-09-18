import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from "redux";
import { validator } from "email-validator";

import "./styles.css";
////import dataReducer from "./reducers/data";
//import { Provider } from "react-redux";
/*import SimpleStorage, {
  clearStorage,
  resetParentState
} from "react-simple-storage";*/

//let itemsArray = []
//const store = createStore();
//localStorage.setItem('items', JSON.stringify(itemsArray))
//const data = JSON.parse(localStorage.getItem('items'));

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* first_name: "",
      last_name: "",
      date_of_birth: 0,
      email: "",
      age: ""*/
    };
    this.submitForm = this.submitForm.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.initialState = this.state;
  }

  componentDidMount() {
    console.log("CDM", localStorage);

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
    }

    console.log("json", stFN);
  }

  onChange() {
    //localStorage.setItem('field', 'value');
    //e.preventDefault()

    let first_name = this.state.first_name;
    let last_name = this.state.last_name;
    let date_of_birth = this.state.date_of_birth;
    let email = this.state.email;
    // console.log("onch - fn", first_name);
    //itemsArray.push(field.value)

    localStorage.setItem("first_name", first_name);
    localStorage.setItem("last_name", last_name);
    localStorage.setItem("date_of_birth", date_of_birth);
    localStorage.setItem("email", email);

    // console.log("JSON firstname", first_name.value);
  }

  reset() {
    localStorage.clear(); //store.dispatch({ type: "RESET_DATA" });
  }

  submitForm(event) {
    alert("test");
    event.preventDefault();
  }

  validateEmail() {
    /* let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let valid = this.state.valid;
    if (input.value.match(mailformat)) {
      document.form.email.focus();
      this.setState({ valid: true });
    } else {
      alert("You have entered an invalid email address!");
      document.form.email.focus();
      this.setState({ valid: false });
    */
  }

  validate() {
    let valid = true;
    let email = this.state.email;
    let fn = this.state.first_name;
    let ln = this.state.last_name;
    let dob = this.state.date_of_birth;
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    //  let testeml = validator.validate(email);
    console.log("Run Validation", valid);

    /* Lets check Name length is valid.. */

    if (fn.length <= 2 || ln.length <= 2) {
      valid = false;
      console.log("Name valid? ", valid);
    }

    /* Check age in relation to today's date */

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.setState({ age: age });

    // console.log("age in validate ", age);

    /* And if they're a valid age... */
    if (age !== 0 && age >= 18 && age <= 150) {
      valid = true;
      console.log("valid age ", valid);
    }

    console.log("age state ? ", age);
    console.log("valid state ? ", valid);
    /* const testeml = validator.validate(email);
  if (!testeml) {
    valid = false;
  }*/
    console.log("Email in validation", email);

    if (
      fn === "undefined" ||
      ln === "undefined" ||
      email === "undefined" ||
      age === "NaN" ||
      dob === 0
    ) {
      valid = false;
    }

    /*const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(String(email).toLowerCase())) {
      valid = false;
    }*/

    this.setState({ valid: valid });
    console.log("valid test? ", valid);
    return { valid };
  }

  render() {
    let valid = this.state.valid;

    this.onChange();
    console.log("valid state in render? ", valid);
    /* console.log("First", this.state.first_name);
    console.log("Last", this.state.last_name);
    console.log("dob", this.state.date_of_birth);
    console.log("Email", this.state.email);*/

    //this.validate();
    return (
      <div className="App">
        <div className="container">
          <h1>User Details</h1>
          <h2>Please enter your details to continue:</h2>

          <form>
            <div>
              <label>
                First Name:
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="e.g. John"
                  onBlur={this.validate}
                  onChange={e => this.setState({ first_name: e.target.value })}
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
                  placeholder="e.g. Doe"
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
                  onBlur={this.validateEmail}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </label>
            </div>
            <input type="submit" value="Submit" disabled={!valid} />

            <button onClick={() => localStorage.clear()}>Clear Storage</button>
          </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  //  <Provider store={store}>
  <NewForm />,
  //  </Provider>,
  rootElement
);
