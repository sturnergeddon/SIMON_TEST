import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function submitForm() {
  alert("test");
}

class NewForm extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={submitForm}>
            <h1>User Details</h1>
            <h2>Please enter your details to continue:</h2>
            <div>
              <label>
                First Name:
                <input type="text" name="first_name" placeholder="e.g. John" />
              </label>
            </div>
            <div>
              <label>
                Last Name:
                <input type="text" name="last_name" placeholder="e.g. Doe" />
              </label>
            </div>

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<NewForm />, rootElement);
