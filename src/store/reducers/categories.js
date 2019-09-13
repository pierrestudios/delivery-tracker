import { LOAD_CATEGORIES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
