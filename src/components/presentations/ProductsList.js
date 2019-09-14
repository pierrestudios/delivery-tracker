import React from "react";

import ProductRow from "./ProductRow";

export default ({ data, category, viewDetails }) => {
  return data
    .filter(p => category === p.category)
    .map(d => <ProductRow {...d} viewDetails={viewDetails} key={d.id} />);
};
