import React from "react";
import { shallow } from "enzyme";

import App from "./App";

import { findByTestAttr } from "../../test/testUtils";

test("App renders without error", () => {
  const wrapper = shallow(<App />);
  const component = findByTestAttr(wrapper, "app-component");
  expect(component.length).toBe(1);
});
