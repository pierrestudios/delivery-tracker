import React from "react";
import { Header, Button, Badge } from "tabler-react";

import { getDurationOptions } from "../../common/utils";

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
    <div id="price-totals" className="mt-4 mb-4">
      <strong>
        <span>Total:</span> ${totalPrice.toFixed(2)}
      </strong>
    </div>
  ) : null;
}

function showPriceOptions(data, updateSelection) {
  return data.map(({ heading, price }, key) => {
    const { durationLabel: label } = getDurationOptions(heading);
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
  selectedPriceOption
}) => {
  return reservation ? (
    <div id="reserved-option">
      <Header.H5>Product is Reserved</Header.H5>
      <span className="text-left text-muted font-weight-bold m-2">
        {`Price: $${reservation.reservationTotal} for ${reservation.durationCount} ${reservation.durationType}`}
      </span>

      <span className="text-left text-muted font-weight-bold m-2">Status</span>
      <Badge color="warning" className="p-3">
        <span>Reserved</span>
      </Badge>
    </div>
  ) : (
    <div id="pricing-table">
      <Header.H5>Price Options</Header.H5>
      {showPriceOptions(data, selectPriceOption)}
      {!!selectedPriceOption
        ? showPriceTotals(selectedPriceOption, selectedDuration, data)
        : null}
    </div>
  );
};
