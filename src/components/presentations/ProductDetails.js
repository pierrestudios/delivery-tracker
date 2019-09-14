import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "tabler-react";

export default ({ product, category, location }) => {
  const { image: uri, name: title, details } = product;
  const { name: categoryName } = category;
  const { desc, meta, pricingTable } = details && details[0];
  const { reservations, locations, currentReservation } = useSelector(
    state => state
  );
  const { selectedPriceOption } = currentReservation;
  const { selectedDuration } = currentReservation;

  if (!reservations || !locations) {
    return <div />;
  }

  const dispatch = useDispatch();
  const updateCurrentReservation = data => {};
  const resetCurrentReservation = () => {};
  const submitReservation = data => {};
  const reservation = reservations.find(r => r.productId === product.id);
  const descText = desc && desc.replace(/,/gi, "");

  useEffect(() => {
    resetCurrentReservation();
  }, [product]);

  return (
    <Card>
      <Card.Header style={{ flexDirection: "column" }}>
        <strong style={{ fontSize: 18 }}>{title}</strong>
        <span style={{ color: "#999", marginLeft: 5 }}>{categoryName}</span>
      </Card.Header>
      {selectedPriceOption && !reservation ? null : (
        <Card.Body>
          <img
            src={uri}
            style={{
              minHeight: 200,
              width: "100%",
              flex: 1
            }}
          />

          {meta.map((m, i) => (
            <span style={{ color: "#333" }} key={i}>
              {m}
            </span>
          ))}

          <span style={{ color: "#333" }}>{descText}</span>
        </Card.Body>
      )}
    </Card>
  );
};
