import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../test/testUtils";
import Table from "./Table";

import { API_CALL_FAILED } from "../../constants/errors";

const setup = ({
  columnsWidth = [],
  columns = [],
  data = [],
  error,
  currentSort,
  sortData,
  handleColumnResize = () => {},
}) => {
  return shallow(
    <Table
      columnsWidth={columnsWidth}
      columns={columns}
      data={data}
      error={error}
      currentSort={currentSort}
      sortData={sortData}
      handleColumnResize={handleColumnResize}
    />
  );
};

test("Table renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "table-component");
  expect(component.length).toBe(1);
});

test("Table renders error correctly", () => {
  const wrapper = setup({ error: API_CALL_FAILED });
  const component = findByTestAttr(wrapper, "table-error");
  expect(component.length).toBe(1);
  expect(component.text()).toBe(API_CALL_FAILED);
});

test("Table renders a 3 columns table", () => {
  const columns = new Array().fill(3).map((item, index) => ({
    title: `test${index}`,
  }));
  const wrapper = setup({ columns });
  const component = findByTestAttr(wrapper, "table-column");
  expect(component.length).toBe(columns.length);
});

test("Table renders a 4 columns table with 5 rows", () => {
  const columns = new Array().fill(4).map((item, index) => ({
    title: `test${index}`,
    field: [`test${index}`],
  }));
  const data = new Array().fill(5).map((item, index) => ({
    test1: "test1",
    test2: "test2",
    test3: "test3",
    test4: "test4",
  }));
  const wrapper = setup({ columns, data });
  const component = findByTestAttr(wrapper, "table-row");
  expect(component.length).toBe(data.length);
});
