import React from "react";
import { get } from "lodash";

import Table from "../components/Table/Table";

import { ORDER_ASC } from "../constants/data";

const TableContainer = (props) => {
  const [columnsWidth, setColumnWidth] = React.useState([]);
  const [sort, setSort] = React.useState({});

  const minColWidth = 50;

  // Initialize columns width
  React.useEffect(() => {
    if (props.columns) {
      setColumnWidth(props.columns.map((col) => col.initialWidth));
    }
  }, [props.columns]);

  const applySort = (a, b) => {
    if (
      get(a, sort.field) &&
      get(b, sort.field) &&
      get(a, sort.field).toLowerCase() < get(b, sort.field).toLowerCase()
    ) {
      return sort.order === ORDER_ASC ? -1 : 1;
    }
    return sort.order === ORDER_ASC ? 1 : -1;
  };

  const handleColumnResize = (e, ui, colIndex) => {
    if (columnsWidth[colIndex] + ui.deltaX > minColWidth) {
      let newColWidth = [...columnsWidth];
      newColWidth[colIndex] += ui.deltaX;
      setColumnWidth(newColWidth);
    }
  };

  return (
    <Table
      columnsWidth={columnsWidth}
      columns={props.columns}
      data={props.data.sort(applySort)}
      error={props.error}
      currentSort={sort}
      sortData={(field, order) => setSort({ field, order })}
      handleColumnResize={handleColumnResize}
    />
  );
};

export default TableContainer;
