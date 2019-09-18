//REDUCER
//import { _ } from "lodash";

const dataReducer = (state = {}, action) => {
  console.log("action", action);
  switch (action.type) {
    case "SET_FIELD":
      //   return (state = { email: "TEST" });
      state = (state, { ["form"]: { [action.field]: action.value } });

      break;
    case "RESET_DATA":
      state = {};
      break;
    default:
      // state = {};
      console.log("Defaulted");
      break;
  }
};

export default dataReducer;
