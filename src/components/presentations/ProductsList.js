import React from "react";

import ProductRow from "./ProductRow";

export default ({ data, viewDetails }) => {
  return data.map(d => (
    <ProductRow {...d} viewDetails={viewDetails} key={d.id} />
  ));
};
