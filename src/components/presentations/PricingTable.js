import React from "react";
import { Card, Header, Table, Button, Badge } from "tabler-react";

import { getDurationOptionValue, getDurationOptions } from "../../common/utils";

function showPriceTotals(selectedPriceOption, selectedDuration, priceData) {
  const { price, heading: selectedOption } = selectedPriceOption;
  let { durationCount = 1, durationLabel = selectedOption } =
    selectedDuration && getDurationOptions(selectedDuration);
  if (
    !selectedOption.match(durationLabel.substring(0, durationLabel.length - 1))
  ) {
    durationCount = 1;
  }
  const totalPrice = parseFloat(price) * parseInt(durationCount);
  return !!selectedPriceOption ? (
    <div style={{ marginBottom: 10, marginTop: 20 }}>
      <strong>
        <span>Total:</span> ${totalPrice.toFixed(2)}
      </strong>
    </div>
  ) : null;
}

function showPriceOptions(data, updateSelection) {
  return data.map(({ heading, price }, key) => {
    const { durationCount: count, durationLabel: label } = getDurationOptions(
      heading
    );
    return (
      <Button
        key={key}
        className="mr-3"
        color="success"
        onClick={() => updateSelection({ heading, price })}
      >
        <div style={{ fontSize: 14, fontWeight: "800" }}>
          {`$${price} / ${label}`}
        </div>
      </Button>
    );
  });
}

export default ({
  data,
  selectedDuration,
  reservation,
  selectPriceOption,
  selectedPriceOption,
  ...props
}) => {
  const [firstOption] = data;

  return reservation ? (
    <div>
      <Header.H5>{reservation.durationString}</Header.H5>
      <Badge color="warning" style={{ marginTop: 10, marginBottom: 10 }}>
        <span>Reserved</span>
      </Badge>
      <div
        style={{ textAlign: "left", fontSize: 18, color: "#ccc" }}
      >{`Price: $${reservation.reservationTotal} for ${reservation.durationCount} ${reservation.durationType}`}</div>
    </div>
  ) : (
    <div>
      <Header.H5>Price Options</Header.H5>
      {showPriceOptions(data, selectPriceOption)}
      {!!selectedPriceOption
        ? showPriceTotals(selectedPriceOption, selectedDuration, data)
        : null}
    </div>
  );
};
