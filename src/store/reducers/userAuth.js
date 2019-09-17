import {
  SAVE_USER_DATA,
  SAVING_USER_DATA,
  LOAD_USER_DATA,
  LOGGING_IN_USER,
  LOGIN_USER
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case LOAD_USER_DATA:
      return action.payload;
    case SAVE_USER_DATA:
      return action.payload;
    case SAVING_USER_DATA:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOGGING_IN_USER:
      return action.payload;
    default:
      return state;
  }
}
