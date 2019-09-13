import { combineReducers } from "redux";

import categories from "./categories";
import locations from "./locations";
import products from "./products";

export default combineReducers({
  categories,
  locations,
  products
});
