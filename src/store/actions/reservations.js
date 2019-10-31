import {
  LOADING_RESERVATIONS,
  LOAD_RESERVATIONS,
  ADD_RESERVATION,
  CURRENT_RESERVATION,
  CURRENT_RESERVATION_TRACK
} from "./types";
import { loadProducts } from "./staticData";
import { retrieve as retrieveFromApi, save as saveToApi } from "./apiActions";
import { getDurationOptions } from "../../common/utils";

function hydrate(data) {
  const { durationCount, durationLabel: durationType } = getDurationOptions(
    data.duration
  );
  const reservationTotal =
    parseFloat(data.reservationPrice) * parseInt(durationCount);

  return {
    ...data,
    durationType,
    durationCount,
    reservationTotal
  };
}

export function loadReservations(forceReload = false) {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING_RESERVATIONS
    });

    const {
      reservations,
      products,
      userAuth: { token: userToken }
    } = getState();

    if (!products || !products.length) {
      return (() => {
        dispatch(loadProducts());
        dispatch(loadReservations(forceReload));
      })();
    }

    const hydratedReservations =
      !forceReload && reservations
        ? reservations
        : ((await retrieveFromApi("reservations", userToken)) || []).map(r => {
            const product = products.find(p => p.id === r.productId);
            return hydrate({ ...r, productName: product.name });
          });

    dispatch({
      type: LOAD_RESERVATIONS,
      payload: hydratedReservations
    });
  };
}

export function addReservation(data) {
  return async (dispatch, getState) => {
    const {
      products,
      userAuth: { token: userToken }
    } = getState();
    const savedReservation = await saveToApi("reservations", data, userToken);
    const product = products.find(p => p.id === data.productId);
    const reservation = hydrate({
      ...savedReservation,
      productName: product.name
    });

    dispatch({
      type: ADD_RESERVATION,
      payload: reservation
    });
  };
}

export function trackReservation(reservationId) {
  return async (dispatch, getState) => {
    const {
      userAuth: { token: userToken }
    } = getState();

    const tracking = await retrieveFromApi(
      `delivery-tacking/${reservationId}`,
      userToken
    );

    dispatch({
      type: CURRENT_RESERVATION_TRACK,
      payload: tracking
    });
  };
}

export function saveCurrentReservation(data) {
  return async (dispatch, getState) => {
    const { currentReservation } = getState();
    dispatch({
      type: CURRENT_RESERVATION,
      payload: { ...currentReservation, ...data }
    });
  };
}
