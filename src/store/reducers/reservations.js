import {
  LOAD_RESERVATIONS,
  ADD_RESERVATION,
  CURRENT_RESERVATION
} from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_RESERVATIONS:
      return action.payload;

    case ADD_RESERVATION:
      // Note: Do not mutate
      const newState = state.slice();
      newState.push(action.payload);

      return newState;

    default:
      return state;
  }
}

export function currentReservation(state = {}, action) {
  switch (action.type) {
    case CURRENT_RESERVATION:
      return action.payload;

    default:
      return state;
  }
}
