//let _ = require("-aek/utils");
//let aekFluxStore = require("-aek/flux-store");

let reducers = {
  data: (state = {}, action) => {
    switch (action.type) {
      case "set_field":
        state = _.merge(state, {
          ["form"]: { [action.field]: action.value }
        });
        break;
      case "set_status":
        state = _.merge(state, {
          ["status"]: { [action.segment]: action.value }
        });
        break;
      case "reset_data":
        state = {};
        break;
    }
    return state;
  }
};

let localStorageKey = "simon_test\form";

module.exports = aekFluxStore({ reducers, localStorageKey });
