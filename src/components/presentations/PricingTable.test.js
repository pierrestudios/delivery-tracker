import React from "react";
import { mount } from "enzyme";

import PricingTable from "./PricingTable";

describe("Renders <PricingTable /> with params correctly ", () => {
  const params = {
    data: [
      {
        heading: "1 Day",
        price: "170"
      },
      {
        heading: "1 Week",
        price: "360"
      },
      {
        heading: "1 Month",
        price: "500"
      }
    ],
    selectedDuration: "",
    selectedPriceOption: "",
    selectPriceOption: selectedPriceOption => {
      wrapped.setProps({
        selectedPriceOption
      });
    },
    reservation: null
  };
  const wrapped = mount(<PricingTable {...params} />);

  it("Renders <PricingTable /> with correct ", () => {
    expect(wrapped.find("#pricing-table button").length).toEqual(
      params.data.length
    );

    wrapped
      .find("#pricing-table button")
      .first()
      .simulate("click");

    expect(
      wrapped.find("#pricing-table #price-totals").containsAnyMatchingElements([
        <strong>
          <span>Total:</span> ${parseFloat(params.data[0].price).toFixed(2)}
        </strong>
      ])
    ).toEqual(true);
  });
});
