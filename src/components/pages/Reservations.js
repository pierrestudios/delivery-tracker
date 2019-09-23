import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Page, Card } from "tabler-react";

import ReservationsList from "../presentations/ReservationsList";

import { loadReservations } from "../../store/actions";
import Loading from "../presentations/Loading";

export default () => {
  const { reservations, userAuth } = useSelector(state => state);
  const { token: userToken, loaded: authLoaded } = userAuth;
  const dispatch = useDispatch();
  const viewDetails = reservation => {
    // navigation.navigate("ReservationDetails", { reservation });
  };
  const reLoadData = () => {
    dispatch(loadReservations(true));
  };

  useEffect(() => {
    if (authLoaded && !!userToken) {
      dispatch(loadReservations());
    }
  }, [reservations, authLoaded, userToken]);

  if (authLoaded && !userToken) {
    return <Redirect to={"/login"} />;
  }

  if (!reservations || !authLoaded) {
    return <Loading />;
  }

  return (
    <Page id="reservations-page" className="container page-height">
      <Card>
        <Card.Header>
          <span>My Rentals</span>
        </Card.Header>
        <Card.Body>
          <ReservationsList
            viewDetails={viewDetails}
            data={reservations}
            reLoadData={reLoadData}
          />
        </Card.Body>
      </Card>
    </Page>
  );
};
