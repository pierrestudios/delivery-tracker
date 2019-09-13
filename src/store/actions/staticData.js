import { LOAD_CATEGORIES, LOAD_LOCATIONS, LOAD_PRODUCTS } from "./types";

import categories from "../data/categories.json";
import locations from "../data/locations.json";
import products from "../data/products.json";

export function loadLocations() {
  return {
    type: LOAD_LOCATIONS,
    payload: locations
  };
}

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
    payload: categories
  };
}

export function loadProducts() {
  return {
    type: LOAD_PRODUCTS,
    payload: products
  };
}
