import React from "react";
import { mount } from "enzyme";

import SelectPicker from "./SelectPicker";

describe("Renders <SelectPicker /> with params correctly ", () => {
  const params = {
    label: "SelectTitle",
    selectedValue: "",
    data: [
      { name: "Option 1", id: "1" },
      { name: "Option 2", id: "2" },
      { name: "Option 3", id: "3" }
    ],
    handleChange: val => {
      params.selectedValue = val;
    }
  };

  it("Renders <SelectPicker /> with correct label, data, and selectedValue", () => {
    const wrapped = mount(
      <SelectPicker
        selectLabel={params.label}
        selectedValue={params.selectedValue}
        handleChange={params.handleChange}
        data={params.data}
      />
    );

    const lastOption = params.data.slice().pop();

    expect(
      wrapped.find(".list-group .list-group-item select").exists()
    ).toEqual(true);

    expect(
      wrapped
        .find(".list-group .list-group-item strong")
        .last()
        .text()
    ).toEqual(`Select ${params.label}`);

    expect(
      wrapped.find(".list-group .list-group-item select option").length
    ).toEqual(params.data.length + 1);

    expect(
      wrapped
        .find(".list-group .list-group-item select option")
        .last()
        .text()
    ).toEqual(lastOption.name);

    wrapped
      .find(".list-group .list-group-item select")
      .last()
      .simulate("change", { target: { value: lastOption.id } });

    expect(params.selectedValue).toEqual(lastOption.id);
  });
});
