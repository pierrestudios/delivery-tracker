import { LOAD_LOCATIONS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}
