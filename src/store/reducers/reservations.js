import {
  LOAD_RESERVATIONS,
  ADD_RESERVATION,
  CURRENT_RESERVATION,
  CURRENT_RESERVATION_TRACK
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case LOAD_RESERVATIONS:
      return action.payload;

    case ADD_RESERVATION:
      // Note: Do not mutate
      const newState = (state || []).slice();
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

export function currentReservationTrack(state = {}, action) {
  switch (action.type) {
    case CURRENT_RESERVATION_TRACK:
      return action.payload;

    default:
      return state;
  }
}
