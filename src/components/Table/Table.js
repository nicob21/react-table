import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

import "./Table.css";

import TableHeadCell from "../TableHeadCell/TableHeadCell";
import TableCell from "../TableCell/TableCell";
import { image, text, ORDER_ASC, ORDER_DESC } from "../../constants/data";

const Table = (props) => {
  if (props.error) {
    return <div>{props.error}</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {props.columns.map((col, index) => (
            <TableHeadCell
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
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "white" : "rgba(0,0,0,0.01)",
            }}
          >
            {props.columns.map((col) => (
              <TableCell
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.shape({
        uuid: PropTypes.string,
      }),
      gender: PropTypes.string,
      name: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
      }),
      email: PropTypes.string,
      cell: PropTypes.string,
      picture: PropTypes.shape({
        large: PropTypes.string,
        medium: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
    })
  ),
  error: PropTypes.string,
  currentSort: PropTypes.shape({
    field: PropTypes.array,
    order: PropTypes.oneOf([ORDER_ASC, ORDER_DESC]),
  }),
  sortData: PropTypes.func,
  handleColumnResize: PropTypes.func.isRequired,
};

export default Table;
