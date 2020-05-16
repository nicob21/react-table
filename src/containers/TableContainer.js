import React from "react";
import { get } from "lodash";

import Table from "../components/Table";

import { ORDER_ASC } from "../constants/data";

const TableContainer = (props) => {
  const [sort, setSort] = React.useState({
    field: ["name", "first"],
    order: ORDER_ASC,
  });

  const applySort = (a, b) => {
    if (get(a, sort.field).toLowerCase() < get(b, sort.field).toLowerCase()) {
      return sort.order === ORDER_ASC ? -1 : 1;
    }
    return sort.order === ORDER_ASC ? 1 : -1;
  };

  return (
    <Table
      columns={props.columns}
      data={props.data.sort(applySort)}
      error={props.error}
      currentSort={sort}
      sortData={(field, order) => setSort({ field, order })}
    />
  );
};

export default TableContainer;
