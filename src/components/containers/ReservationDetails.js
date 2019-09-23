import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Header, Badge } from "tabler-react";

import {
  getPickupDate,
  getDurationOptions,
  getStatusBadgeColor,
  getStatusBadgeLabel
} from "../../common/utils";
import { loadProducts, loadCategories } from "../../store/actions";
import Loading from "../presentations/Loading";

export default ({ reservation }) => {
  const viewProductDetails = product => {
    const category = categories.find(p => p.id === product.category);
  };
  const renderProductView = props => {
    const { name, details, image, viewDetails } = props;
    const { desc } = (details && details[0]) || {};
    return (
      <div
        className="d-flex"
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomColor: "#f1f1f1",
          borderBottomWidth: 1,
          marginBottom: 1,
          marginTop: 3
        }}
      >
        <div style={{ margin: 0, marginBottom: 15 }}>
          <img
            src={image}
            style={{
              width: 100,
              height: 100,
              marginRight: 5,
              borderColor: "#ccc",
              borderWidth: 1
            }}
          />
        </div>
        <div
          style={{
            flex: 2,
            alignItems: "flex-start"
          }}
        >
          <span className="mr-2 font-weight-bold d-block">{name.trim()}</span>
          <span className="text-black">{desc.trim()}</span>
        </div>
      </div>
    );
  };
  const renderRow = (label, value) => {
    return (
      <div>
        <span
          className="text-muted d-inline-block"
          style={{
            minWidth: 70,
            width: "20%"
          }}
        >
          {label}
        </span>
        <span
          className="text-black font-weight-bold ml-1"
          style={{
            fontSize: 14,
            width: "80%"
          }}
        >
          {value}
        </span>
      </div>
    );
  };
  const getStatusBadge = status => {
    return (
      <Badge color={getStatusBadgeColor(status)} className="mt-3 p-2">
        <span>{getStatusBadgeLabel(status)}</span>
      </Badge>
    );
  };
  const { categories, products } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    !products.length && dispatch(loadProducts());
    !categories.length && dispatch(loadCategories());
  });

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
      <Card.Body>
        {renderRow("Duration", durationString)}
        {renderRow("Delivery", `${deliveryDate} ${deliveryTime}`)}
        {renderRow("Pickup", `${pickupDate} ${pickupTime}`)}
        {renderRow("From", deliverySource)}
        {renderRow("To", deliveryAddress)}
      </Card.Body>
      <Card.Body>
        <span className="font-weight-bold mb-3">Tool/Equipment </span>
        {renderProductView({
          ...product,
          viewDetails: viewProductDetails
        })}
        <div className="mt-3 mb-3">
          <span className="font-weight-bold mt-3 mr-2">Status</span>
          {getStatusBadge(status)}
        </div>
      </Card.Body>
    </Card>
  );
};
