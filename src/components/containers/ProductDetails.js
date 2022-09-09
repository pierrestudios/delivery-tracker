import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "tabler-react";

import PricingTable from "../presentations/PricingTable";
import ReserveForm from "../presentations/ReserveForm";

import { addReservation, saveCurrentReservation } from "../../store/actions";

export default ({ product, category, location }) => {
  const { image: uri, name: title, details } = product;
  const { name: categoryName } = category;
  const { desc, meta, pricingTable } = details && details[0];
  const { reservations, currentReservation, userAuth } = useSelector(
    (state) => state
  );
  const { token: userToken, loaded: authLoaded } = userAuth;
  const isLoggedIn = authLoaded && !!userToken;
  const { selectedPriceOption } = currentReservation;
  const { selectedDuration } = currentReservation;
  const dispatch = useDispatch();
  const updateCurrentReservation = (data) => {
    dispatch(saveCurrentReservation(data));
  };
  const resetCurrentReservation = () => {
    dispatch(
      saveCurrentReservation({
        deliverySource: (location && location.address) || "",
        productId: product.id,
        selectedPriceOption: undefined,
        selectedDuration: undefined,
      })
    );
  };
  const submitReservation = (data) => {
    dispatch(addReservation(data));
  };
  const reservation =
    reservations && reservations.find((r) => r.productId === product.id);
  const descText = desc && desc.replace(/,/gi, " • ");

  useEffect(() => {
    resetCurrentReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Card>
      <Card.Header style={{ flexDirection: "column" }}>
        <strong style={{ fontSize: 18 }}>{title}</strong>
        <span
          style={{ color: "#999", marginLeft: 5 }}
          className="d-md-block d-none"
        >
          {categoryName}
        </span>
      </Card.Header>
      {selectedPriceOption && !reservation ? null : (
        <>
          <Card.Body>
            <img
              src={uri}
              style={{
                minHeight: 150,
                maxWidth: 200,
                width: "100%",
                margin: "auto",
                flex: 1,
              }}
              alt=""
            />
          </Card.Body>
          <Card.Body>
            {meta.map((m, i) => (
              <strong style={{ color: "#333", paddingRight: 5 }} key={i}>
                {m}
              </strong>
            ))}
            <div style={{ color: "#333" }} className="d-md-block d-none">
              {descText}
            </div>
          </Card.Body>
        </>
      )}
      <Card.Body>
        <PricingTable
          data={pricingTable}
          selectedPriceOption={selectedPriceOption}
          selectPriceOption={(selectedPriceOption) =>
            updateCurrentReservation({
              selectedPriceOption,
              selectedDuration: selectedPriceOption.heading,
            })
          }
          reservation={reservation}
          selectedDuration={selectedDuration}
        />

        {reservation ? null : (
          <ReserveForm
            isLoggedIn={isLoggedIn}
            currentReservation={currentReservation}
            submitReservation={submitReservation}
            updateCurrentReservation={updateCurrentReservation}
            updateDuration={(value) => {
              updateCurrentReservation({ selectedDuration: value });
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
};
