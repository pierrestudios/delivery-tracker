import React from "react";
import { Grid, Button } from "tabler-react";

export default ({ viewDetails, reservation }) => {
  const {
    deliveryDate,
    duration: durationString,
    productName,
    reservationTotal,
  } = reservation;

  return (
    <Grid.Row cards deck className="border-bottom pb-3 pt-3">
      <Grid.Col md={2}>
        <strong>{productName}</strong>
      </Grid.Col>
      <Grid.Col md={7}>
        <div className="pt-1">
          <span className="d-none d-md-inline text-muted">Delivery Date</span>
          <strong className="ml-md-2 mr-4 d-block d-md-inline">
            {deliveryDate}
          </strong>

          <span className="d-none d-md-inline text-muted">Duration</span>
          <strong className="ml-md-2 mr-4 d-block d-md-inline">
            {durationString}
          </strong>

          <span className="text-muted">Total</span>
          <strong className="ml-2">${reservationTotal.toFixed(2)}</strong>
        </div>
      </Grid.Col>
      <Grid.Col md={3}>
        {viewDetails ? (
          <Button
            color="secondary"
            onClick={() => viewDetails(reservation)}
            className=""
          >
            <span>View Details</span>
          </Button>
        ) : null}
      </Grid.Col>
    </Grid.Row>
  );
};
