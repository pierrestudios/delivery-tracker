import {
  LOADING_RESERVATIONS,
  LOAD_RESERVATIONS,
  ADD_RESERVATION,
  CURRENT_RESERVATION
} from "./types";
import { loadProducts } from "./staticData";
import { retrieve as retrieveFromDB, save as saveToDB } from "./apiActions";

function hydrate(data, product) {
  const [durationCount, durationType] = data.duration.split(" ");
  const reservationTotal =
    parseFloat(data.reservationPrice) * parseInt(durationCount);
  return {
    ...data,
    durationType,
    durationCount,
    reservationTotal,
    productName: product.name
  };
}

export function loadReservations(forceReload = false) {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_RESERVATIONS
    });

    const { reservations, products, userAuth } = getState();
    const { token: userToken } = userAuth;
    if (!products || !products.length) {
      dispatch(loadProducts());
      dispatch(loadReservations(forceReload));
      return;
    }

    const hydratedReservations =
      !forceReload && reservations && reservations.length
        ? reservations
        : ((await retrieveFromDB("reservations", userToken)) || []).map(r => {
            const product = products.find(p => p.id === r.productId);
            return hydrate(r, product);
          });

    dispatch({
      type: LOAD_RESERVATIONS,
      payload: hydratedReservations
    });
  };
}

export function addReservation(data) {
  return async (dispatch, getState) => {
    const { products, userAuth } = getState();
    const { token: userToken } = userAuth;
    const savedReservation = await saveToDB("reservations", data, userToken);
    const product = products.find(p => p.id === data.productId);
    const reservation = hydrate(savedReservation, product);

    console.log({ reservation, savedReservation });

    dispatch({
      type: ADD_RESERVATION,
      payload: reservation
    });
  };
}

export function saveCurrentReservation(data) {
  return async (dispatch, getState) => {
    const { currentReservation } = getState();
    // console.log({ currentReservation, data });
    dispatch({
      type: CURRENT_RESERVATION,
      payload: { ...currentReservation, ...data }
    });
  };
}
