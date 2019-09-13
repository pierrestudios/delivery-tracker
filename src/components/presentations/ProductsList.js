import React from "react";

import ProductView from "./ProductView";

export default ({ data, category, viewDetails }) => {
  return data
    .filter(p => category === p.category)
    .map(d => <ProductView {...d} viewDetails={viewDetails} key={d.id} />);
};
