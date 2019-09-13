import { LOAD_PRODUCTS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}
