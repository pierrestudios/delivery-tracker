import React from "react";
import { mount } from "enzyme";

import Modal from "./Modal";

describe("Renders <Modal /> with params correctly ", () => {
  const params = {
    show: true,
    title: "Modal Title",
    bodyContent: <div>Modal Content</div>,
    handleClose: () => {}
  };

  it('Renders <Modal /> with correct title, bodyContent, and "show" prop', () => {
    const wrapped = mount(<Modal {...params} />);

    expect(wrapped.find(".modal.fade").exists()).toEqual(true);

    expect(
      wrapped.find(".modal.fade .modal-content .modal-title").text()
    ).toEqual(params.title);

    expect(
      wrapped
        .find(".modal.fade .modal-content .modal-body")
        .containsAnyMatchingElements([params.bodyContent])
    ).toEqual(true);
  });
});
