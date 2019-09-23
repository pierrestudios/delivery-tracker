import React, { useState, useEffect } from "react";
import { Page, Card } from "tabler-react";
import ReservationRow from "./ReservationRow";

export default ({ data, reLoadData, viewDetails }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    reLoadData();
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => setRefreshing(false), 1000);
    }
  }, [data]);

  return data.map(d => (
    <ReservationRow key={d.id} reservation={d} viewDetails={viewDetails} />
  ));
};
