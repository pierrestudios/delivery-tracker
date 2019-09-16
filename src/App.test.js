import React from "react";
import { shallow } from "enzyme";

import App from "./App";
import Store from "./store";

it("renders without crashing", () => {
  shallow(
    <Store>
      <App />
    </Store>
  );
});
