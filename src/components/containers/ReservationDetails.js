import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Grid, Badge, Avatar, GalleryCard, Button } from "tabler-react";

import {
  getPickupDate,
  getDurationOptions,
  getStatusBadgeColor,
  getStatusBadgeLabel,
  reservationTrackingSteps
} from "../../common/utils";
import { loadProducts, loadCategories } from "../../store/actions";
import Loading from "../presentations/Loading";

export default ({ reservation, viewDeliveryTracker }) => {
  const ANIMATION_TIME = 1000;
  const [animationReady, setAnimationReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const viewProductDetails = product => {
    // const category = categories.find(p => p.id === product.category);
  };
  const renderProductView = props => {
    const { name, details, image } = props;
    const { desc } = (details && details[0]) || {};
    const descParagraphs = desc && desc.split("\n");
    return (
      <div className="d-flex mt-2 mb-1">
        <div className="m-0 mb-2">
          <GalleryCard.Image
            rounded={false}
            src={image}
            alt={name}
            className="mr-2 img-thumbnail w-150px"
          />
        </div>
        <div>
          {descParagraphs.map(descText => {
            const [label, value] = descText
              .replace(/,/gi, "")
              .trim()
              .split(":");

            if (!label) {
              return;
            }

            return (
              <span className="text-black d-inline-block mr-1 pl-2" key={label}>
                <span className="text-uppercase">{label}</span>:
                <span className="font-weight-bold">{value}</span>
              </span>
            );
          })}
        </div>
      </div>
    );
  };
  const renderRow = (label, value) => {
    return (
      <Grid.Row cards deck className="border-bottom pb-1 pt-1">
        <Grid.Col md={4} className="text-muted d-inline-block">
          {label}
        </Grid.Col>
        <Grid.Col md={8} className="text-black font-weight-bold">
          {value}
        </Grid.Col>
      </Grid.Row>
    );
  };
  const getStatusBadge = status => {
    return (
      <Badge color={getStatusBadgeColor(status)} className="mt-3 p-2">
        <span>{getStatusBadgeLabel(status)}</span>
      </Badge>
    );
  };
  const renderTrackingRow = (isPassedStatus, label) => {
    return (
      <Grid.Col
        key={label}
        md={4}
        className="text-black font-weight-bold text-center"
      >
        <span className="m-2">
          <Avatar icon="check" color={isPassedStatus ? "success" : "grey"} />
        </span>
        <span>{label}</span>
      </Grid.Col>
    );
  };
  const getTrackingAndStatus = currentStatus => {
    return (
      <div className="position-relative tracking-steps">
        <span className="d-block position-absolute track"></span>
        <span
          className={`d-block position-absolute track-active ${
            animationReady && currentStatus === "enRoute" ? "en-route" : ""
          } ${
            animationReady && currentStatus === "delivered" ? "delivered" : ""
          }`}
        ></span>
        <Grid.Row cards deck className="border-top pt-3">
          {reservationTrackingSteps.map(({ label, status }) => {
            const isPassedStatus =
              (currentStatus === status &&
                (status === "confirmed" || animationDone)) ||
              ((currentStatus === "enRoute" || currentStatus === "delivered") &&
                status === "confirmed") ||
              (animationDone && currentStatus === "delivered");
            return renderTrackingRow(isPassedStatus, label);
          })}
        </Grid.Row>
        <Grid.Row className="pt-5 m-4 justify-content-center">
          {animationDone && currentStatus === "enRoute" ? (
            <Button color="success" onClick={viewDeliveryTracker}>
              Track your delivery
            </Button>
          ) : null}
        </Grid.Row>
      </div>
    );
  };
  const { categories, products } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    !products.length && dispatch(loadProducts());
    !categories.length && dispatch(loadCategories());
  });

  useEffect(() => {
    setTimeout(() => {
      setAnimationReady(true);
      setTimeout(() => setAnimationDone(true), ANIMATION_TIME);
    }, ANIMATION_TIME);
  }, []);

  if (!products.length || !categories.length) {
    return <Loading />;
  }

  const {
    deliveryDate,
    deliveryTime,
    deliveryAddress,
    deliverySource,
    duration: durationString,
    productName,
    productId,
    status = "new"
  } = reservation;
  const product = products.find(p => p.id === productId);
  const category = categories.find(p => p.id === product.category);
  const { durationCount } = getDurationOptions(durationString);
  const pickupDate = getPickupDate(deliveryDate, durationCount);
  const pickupTime = deliveryTime;
  const { name: categoryName = "" } = category;

  return (
    <Card>
      <Card.Header style={{ flexDirection: "column" }}>
        <strong className="text-blue mt-2" style={{ fontSize: 18 }}>
          {productName}
        </strong>
        <span className="text-muted ml-2 mt-2">{categoryName}</span>
      </Card.Header>
      <Card.Body className="pt-1 pb-1">
        {renderRow("Duration", durationString)}
        {renderRow("Delivery Date/Time", `${deliveryDate} ${deliveryTime}`)}
        {renderRow("Pickup Date/Time", `${pickupDate} ${pickupTime}`)}
        {renderRow("Delivery From", deliverySource)}
        {renderRow("Delivery To", deliveryAddress)}
      </Card.Body>
      <Card.Body className="pt-1 pb-1">
        {renderProductView({
          ...product,
          viewDetails: viewProductDetails
        })}
        <div className="mt-2">
          {status === "new" ? (
            <>
              <span className="font-weight-bold mt-3 mr-2">Status</span>
              {getStatusBadge(status)}
            </>
          ) : (
            getTrackingAndStatus(status)
          )}
        </div>
      </Card.Body>
    </Card>
  );
};
