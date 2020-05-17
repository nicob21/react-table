import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

import { findByTestAttr } from "../../test/testUtils";
import TableHeadCell from "./TableHeadCell";
import { ORDER_ASC } from "../../constants/data";

configure({ adapter: new Adapter() });

const setup = ({ title, currentSort, sortable, field, sortData, width }) => {
  return shallow(
    <TableHeadCell
      title={title}
      currentSort={currentSort}
      sortable={sortable}
      field={field}
      sortData={sortData}
      width={width}
    />
  );
};

test("TableHeadCell renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "table-head-cell-component");
  expect(component.length).toBe(1);
});

test("TableHeadCell renders correct title", () => {
  const myTitle = "My Title";
  const wrapper = setup({ title: myTitle });
  const component = findByTestAttr(wrapper, "table-head-cell-title");
  expect(component.length).toBe(1);
  expect(component.text()).toBe(myTitle);
});

test("TableHeadCell renders arrow if filter is active", () => {
  const myTitle = "My Title";
  const wrapper = setup({
    title: myTitle,
    currentSort: {
      field: ["test1", "test2"],
      order: ORDER_ASC,
    },
    field: ["test1", "test2"],
  });
  const component = findByTestAttr(wrapper, "table-head-cell-sort-arrow");
  expect(component.length).toBe(1);
});

test("TableHeadCell do not render arrow if filter is inactive", () => {
  const myTitle = "My Title";
  const wrapper = setup({
    title: myTitle,
    currentSort: {
      field: ["test1", "test2"],
      order: ORDER_ASC,
    },
    field: ["test3"],
  });
  const component = findByTestAttr(wrapper, "table-head-cell-sort-arrow");
  expect(component.length).toBe(0);
});

// test("TableCell renders correct image", () => {
//   const myImg = "http://lorempixel.com/400/200";
//   const wrapper = setup({ data: myImg, dataType: image });
//   const component = findByTestAttr(wrapper, "table-cell-content");
//   expect(component.length).toBe(1);
//   const src = wrapper.find("img").prop("src");
//   expect(src).toBe(myImg);
// });
