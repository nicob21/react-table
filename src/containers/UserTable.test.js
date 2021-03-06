import React from "react";
import { mount } from "enzyme";

import UserTable from "./UserTable";

test("UserTable renders without error", async () => {
  const wrapper = await mount(<UserTable />);

  const component = wrapper.find("TableContainer");
  expect(component.length).toBe(1);

  const table = wrapper.find("table");
  expect(table.length).toBe(1);
});
