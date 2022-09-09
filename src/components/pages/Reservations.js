import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Page, Card } from "tabler-react";

import { loadReservations } from "../../store/actions";

import ReservationsList from "../presentations/ReservationsList";
import Loading from "../presentations/Loading";
import Modal from "../presentations/Modal";
import ReservationDetails from "../containers/ReservationDetails";
import DeliveryTracker from "../containers/DeliveryTracker";

export default () => {
  const { reservations, userAuth } = useSelector((state) => state);
  const { token: userToken, loaded: authLoaded } = userAuth;
  const [selectedReservation, setSelectedReservation] = useState();
  const [viewingDeliveryTracker, setViewingDeliveryTracker] = useState(false);
  const dispatch = useDispatch();
  const viewDetails = (reservation) => {
    setSelectedReservation(reservation);
  };
  const reLoadData = () => {
    dispatch(loadReservations(true));
  };

  useEffect(() => {
    if (authLoaded && !!userToken) {
      dispatch(loadReservations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations, authLoaded, userToken]);

  if (authLoaded && !userToken) {
    return <Redirect to={"/login"} />;
  }

  if (!reservations || !authLoaded) {
    return <Loading />;
  }

  return (
    <Page id="reservations-page" className="container page-height">
      <Modal
        {...{
          show: !viewingDeliveryTracker && !!selectedReservation,
          title: "Rental Details",
          bodyContent: !!selectedReservation ? (
            <ReservationDetails
              reservation={selectedReservation}
              viewDeliveryTracker={() => setViewingDeliveryTracker(true)}
            />
          ) : null,
          handleClose: () => setSelectedReservation(null),
        }}
      />

      <Modal
        {...{
          show: viewingDeliveryTracker && !!selectedReservation,
          title: "Delivery Tracker",
          bodyContent:
            viewingDeliveryTracker && !!selectedReservation ? (
              <DeliveryTracker reservation={selectedReservation} />
            ) : null,
          handleClose: () => setViewingDeliveryTracker(false),
        }}
      />

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
