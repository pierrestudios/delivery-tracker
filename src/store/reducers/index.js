import { combineReducers } from "redux";

import categories from "./categories";
import locations from "./locations";
import products from "./products";
import reservations, { currentReservation } from "./reservations";

export default combineReducers({
  categories,
  locations,
  products,
  reservations,
  currentReservation
});
