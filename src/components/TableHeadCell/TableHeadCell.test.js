import React from "react";
import { shallow, mount } from "enzyme";

import { findByTestAttr } from "../../test/testUtils";
import TableHeadCell from "./TableHeadCell";
import { ORDER_ASC } from "../../constants/data";

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

test("TableHeadCell should be resizable", () => {
  const myTitle = "My Title";
  const handleColumnResize = jest.fn();
  const wrapper = mount(
    <TableHeadCell
      title={myTitle}
      handleColumnResize={handleColumnResize}
      // currentSort={currentSort}
      // sortable={sortable}
      // field={field}
      // sortData={sortData}
      // width={width}
    />
  );
  const drag = wrapper.find("Draggable");
  console.log(drag.length);
  drag.first().props("onDrag")(null, { deltaX: 50 }, 0);
  //   let resizer = findByTestAttr(wrapper, "table-head-cell-resize-cursor");
  //   console.log(resizer.length);

  //   // component
  //   //   .simulate("mouseDown")
  //   //   .simulate("mouseMove", { x: 20, y: 0 })
  //   //   .simulate("mouseUp");
  //   // expect(handleColumnResize).toHaveBeenCalled();

  //   const top = window.document.documentElement; // target the documentElement
  //   resizer.simulate("mouseDown", { preventDefault: () => true }); // uses enzyme to simulate this event, adding listener to documentElement on mousemove
  //   const mouseMove = new Event("mousemove"); // creates a new event
  //   top.dispatchEvent(mouseMove); // dispatches it
  //   const mouseUp = new Event("mouseup");
  //   top.dispatchEvent(mouseUp);
  //   expect(handleColumnResize).toBeCalled();
});

// it("highlights item as selected when being dragged", function () {
//   const handleColumnResize = jest.fn();
//   var container = TestUtils.renderIntoDocument(
//     <TableHeadCell
//       title="myTitle"
//       // currentSort={currentSort}
//       // sortable={sortable}
//       // field={field}
//       // sortData={sortData}
//       // width={width}
//       handleColumnResize={handleColumnResize}
//     />
//   );
//   var item = getItemFromContainer(container);
//   //var mockDataTransfer = { setData: jest.genMockFunction() };
//   //expect(item.props.className).toBe('');
//   TestUtils.Simulate.drag(item, { button: 0, clientX: "20" });
//   expect(handleColumnResize).toBeCalled();
// });
// function getItemFromContainer(container) {
//   return TestUtils.scryRenderedDOMComponentsWithTag(container, "Draggable")[0];
// }
