import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "tabler-react";

import { trackReservation } from "../../store/actions";

const TIMEOUT_DELAY = 500;

export default ({ reservation = {} }) => {
  const { id, productName } = reservation;
  const dispatch = useDispatch();
  const { currentReservationTrack } = useSelector((state) => state);

  function initMap({ start_location, end_location }, polyline) {
    const google = window.google || null;
    if (!google) {
      return console.log("Need to load google");
    }

    const polylines = google.maps.geometry.encoding.decodePath(polyline.points);
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: start_location,
    });

    directionsRenderer.setMap(map);
    directionsService.route(
      {
        origin: start_location,
        destination: end_location,
        travelMode: "DRIVING",
      },
      function (response, status) {
        if (status === "OK") {
          const [firstPoly] = polylines;
          const marker = new google.maps.Marker({
            position: { lat: firstPoly.lat(), lng: firstPoly.lng() },
            icon: {
              url: "images/marker-F.gif",
              anchor: new google.maps.Point(30, 30),
            },
            map: map,
          });
          directionsRenderer.setDirections(response);
          animateMarkerLocation({ polylines, marker });
        } else {
          console.log("Directions request failed due to ", status);
        }
      }
    );
  }

  function animateMarkerLocation({ polylines, marker }) {
    async function timeout(delay = TIMEOUT_DELAY) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve();
        }, delay);
      });
    }

    (async () => {
      for (let step of polylines) {
        await timeout().then(() => {
          marker.setPosition({ lat: step.lat(), lng: step.lng() });
        });
      }
    })();
  }

  useEffect(() => {
    (async () => {
      dispatch(trackReservation(id));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentReservationTrack && currentReservationTrack.status === "OK") {
      const { routes } = currentReservationTrack;
      initMap(routes[0].legs[0], routes[0].overview_polyline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentReservationTrack]);

  return (
    <Card>
      <Card.Header style={{ flexDirection: "column" }}>
        <strong className="text-blue mt-2" style={{ fontSize: 18 }}>
          Tracking delivery for {productName}
        </strong>
      </Card.Header>
      <Card.Body className="p-0">
        <div
          id="map"
          style={{
            height: 500,
          }}
        >
          Loading Map...
        </div>
      </Card.Body>
    </Card>
  );
};
