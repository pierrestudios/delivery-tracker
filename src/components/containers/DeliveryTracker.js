import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Grid, Badge, Avatar, GalleryCard, Button } from "tabler-react";

import { trackReservation } from "../../store/actions";

export default ({ reservation = {} }) => {
  const {
    id,
    deliveryDate,
    deliveryTime,
    deliveryAddress,
    deliverySource,
    duration: durationString,
    productName,
    productId,
    status = "new"
  } = reservation;
  const dispatch = useDispatch();
  const { currentReservationTrack } = useSelector(state => state);

  function initMap({
    start_location: origin,
    end_location: destination,
    steps
  }) {
    const google = window.google || null;
    if (!google) {
      console.log("Need to load google");
    }

    const directionsRenderer = new google.maps.DirectionsRenderer({
      // preserveViewport: true
    });
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
      center: origin
    });
    // console.log({ directionsRenderer, directionsService, map });

    directionsRenderer.setMap(map);
    directionsService.route(
      {
        origin,
        destination,
        travelMode: "DRIVING"
      },
      function(response, status) {
        if (status == "OK") {
          directionsRenderer.setDirections(response);

          const marker = new google.maps.Marker({
            position: steps[0].end_location,
            icon: {
              url: "images/marker-F.gif",
              anchor: new google.maps.Point(30, 30)
              // origin: new google.maps.Point(0, -10)
            },
            map: map
            // title: steps[0].duration.text
          });

          animateLocationMarker({ steps, marker });

          // marker.setMap(map);
        } else {
          console.log("Directions request failed due to ", status);
        }
      }
    );
  }

  function animateLocationMarker({ steps, marker }) {
    const google = window.google || null;
    const delay = 100;

    async function timeout() {
      return new Promise(resolve => {
        setTimeout(() => {
          return resolve();
        }, delay);
      });
    }

    async function animateStep(latLng) {
      return timeout().then(() => {
        marker.setPosition(latLng);
      });
    }

    (async () => {
      for (let step of steps) {
        await timeout().then(async () => {
          // console.log({ step });
          await timeout().then(async () => {
            let n = 0;
            let lat = step.start_location.lat;
            let lng = step.start_location.lng;
            const numberOfSteps = step.distance.value / 100;

            const distanceLat =
              (step.end_location.lat - step.start_location.lat) / numberOfSteps;
            const distanceLng =
              (step.end_location.lng - step.start_location.lng) / numberOfSteps;

            while (n < numberOfSteps) {
              // console.log({ n });
              lat += distanceLat;
              lng += distanceLng;
              const latLng = new google.maps.LatLng(lat, lng);
              // console.log({ distanceLat, distanceLng, lat, lng, latLng });

              await animateStep(latLng);
              n++;
            }
          });
        });
      }
    })();
  }

  useEffect(() => {
    (async () => {
      dispatch(trackReservation(id));
    })();
  }, []);

  useEffect(() => {
    if (currentReservationTrack && currentReservationTrack.status === "OK") {
      const { routes } = currentReservationTrack;
      initMap(routes[0].legs[0]);
    }
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
            height: 500
          }}
        >
          Loading Map...
        </div>
      </Card.Body>
    </Card>
  );
};
