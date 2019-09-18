import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from "redux";
import { validator } from "email-validator";

import "./styles.css";
//import dataReducer from "./reducers/data";
//import { Provider } from "react-redux";
/*import SimpleStorage, {
  clearStorage,
  resetParentState
} from "react-simple-storage";*/

//let itemsArray = []

//localStorage.setItem('items', JSON.stringify(itemsArray))
//const data = JSON.parse(localStorage.getItem('items'));

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      date_of_birth: 0,
      email: ""
    };
    this.submitForm = this.submitForm.bind(this);
    this.validate = this.validate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
    this.initialState = this.state;
  }

  componentDidMount() {
    // let _this = this;
    /* store.subscribe(function() {
      _this.forceUpdate();
    });*/
  }

  onChange(e) {
    //localStorage.setItem('field', 'value');
    //e.preventDefault()
    let first_name = this.state.first_name;
    console.log("onch - fn", first_name);
    //itemsArray.push(field.value)
    localStorage.setItem("first_name", first_name);
    console.log("JSON firstname", first_name.value);
  }

  reset() {
    //store.dispatch({ type: "RESET_DATA" });
  }

  submitForm(event) {
    alert("test");
    event.preventDefault();
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
    console.log("Email in validation", email);

    /* Lets check Name length is valid.. */

    if (fn.length <= 2 || ln.length <= 2) {
      valid = false;
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
    }
    console.log("age state ? ", age);
    console.log("Email in validation222", email);
    console.log("valid state ? ", valid);
    /* const testeml = validator.validate(email);
  if (!testeml) {
    valid = false;
  }*/
    console.log("Local", localStorage);

    this.setState({ valid: valid });
    console.log("valid test? ", valid);
    return { valid };
  }

  render() {
    let valid = this.state.valid;
    this.onChange();
    console.log("valid state in render? ", valid);
    console.log("First", this.state.first_name);
    console.log("Last", this.state.last_name);
    console.log("dob", this.state.date_of_birth);
    console.log("Email", this.state.email);

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
                  onBlur={this.validate}
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
  // <Provider store={store}>
  <NewForm />,
  // </Provider>,
  rootElement
);
