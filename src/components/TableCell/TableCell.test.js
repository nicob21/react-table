import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import { findByTestAttr } from "../../test/testUtils";
import TableCell from "./TableCell";

import { text, image } from "../../constants/data";

configure({ adapter: new Adapter() });

const setup = ({ data, dataType }) => {
  return shallow(<TableCell data={data} dataType={dataType} />);
};

test("TableCell renders without error", () => {
  const wrapper = setup({ data: "", dataTyep: text });
  const component = findByTestAttr(wrapper, "table-cell-component");
  expect(component.length).toBe(1);
});

test("TableCell renders correct text", () => {
  const myText = "my text";
  const wrapper = setup({ data: myText, dataType: text });
  const component = findByTestAttr(wrapper, "table-cell-data");
  expect(component.length).toBe(1);
  expect(component.text()).toBe(myText);
});

test("TableCell renders correct image", () => {
  const myImg = "http://lorempixel.com/400/200";
  const wrapper = setup({ data: myImg, dataType: image });
  const component = findByTestAttr(wrapper, "table-cell-content");
  expect(component.length).toBe(1);
  const src = wrapper.find("img").prop("src");
  expect(src).toBe(myImg);
});
