import { combineReducers } from "redux";

import categories from "./categories";
import locations from "./locations";
import products from "./products";
import userAuth from "./userAuth";
import reservations, { currentReservation } from "./reservations";

export default combineReducers({
  categories,
  locations,
  products,
  userAuth,
  reservations,
  currentReservation
});
