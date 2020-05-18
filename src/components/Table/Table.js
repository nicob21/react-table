import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

import "./Table.css";

import TableHeadCell from "../TableHeadCell/TableHeadCell";
import TableCell from "../TableCell/TableCell";
import { image, text, ORDER_ASC, ORDER_DESC } from "../../constants/data";

const Table = (props) => {
  if (props.error) {
    return <div data-test="table-error">{props.error}</div>;
  }

  return (
    <table className="table" data-test="table-component">
      <thead>
        <tr>
          {props.columns.map((col, index) => (
            <TableHeadCell
              data-test="table-column"
              key={col.title}
              currentSort={props.currentSort}
              sortData={props.sortData}
              width={get(props, ["columnsWidth", index])}
              handleColumnResize={(e, ui) =>
                props.handleColumnResize(e, ui, index)
              }
              {...col}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            data-test="table-row"
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "white" : "rgba(0,0,0,0.01)",
            }}
          >
            {props.columns.map((col) => (
              <TableCell
                data-test="table-cell"
                key={`${col.title}${index}`}
                data={get(item, col.field)}
                dataType={col.type}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columnsWidth: PropTypes.arrayOf(PropTypes.number),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      field: PropTypes.array,
      sortable: PropTypes.bool,
      type: PropTypes.oneOf([image, text]),
      initialWidth: PropTypes.number,
    })
  ),
  data: PropTypes.array,
  error: PropTypes.string,
  currentSort: PropTypes.shape({
    field: PropTypes.array,
    order: PropTypes.oneOf([ORDER_ASC, ORDER_DESC]),
  }),
  sortData: PropTypes.func,
  handleColumnResize: PropTypes.func.isRequired,
};

export default Table;
