import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from "redux";
import { validator } from "email-validator";

import "./styles.css";
//import dataReducer from "./reducers/data";
//import { Provider } from "react-redux";
import SimpleStorage, {
  clearStorage,
  resetParentState
} from "react-simple-storage";

class NewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  onChange(e, field, value) {}

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

    console.log("Run Validation", valid);
    console.log("Email in validation", email);

    if (fn.length <= 2 || ln.length <= 2) {
      valid = false;
    }
    /* console.log("fn", valid, fn);
    console.log("ln", valid, ln);*/
    /* if (email && !validator.validate(email)) {
      // true
      valid = false;
    }*/

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log("age: ", age);
    this.setState({ age: age });

    // agecheck(dob);
    console.log("age in validate ", age);
    //let age = this.state.age;

    if (age >= 18 && age <= 150) {
      valid = true;
    }
    console.log("valid state? ", valid);
    this.setState({ valid: valid });
    return { valid };
  }

  render() {
    let valid = this.state.valid;
    console.log("valid state in render? ", valid);
    /*console.log("First", this.state.first_name);
    console.log("Last", this.state.last_name);
    console.log("dob", this.state.date_of_birth);
    console.log("Email", this.state.email);*/

    return (
      <div className="App">
        <div className="container">
          <h1>User Details</h1>
          <h2>Please enter your details to continue:</h2>
          <SimpleStorage parent={this} prefix={"ParentComponent"} />
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

            <button
              onClick={() =>
                resetParentState(this, this.initialState, ["text"])
              }
            >
              resetParentState
            </button>

            <button onClick={() => clearStorage("ParentComponent")}>
              clearStorage
            </button>
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
