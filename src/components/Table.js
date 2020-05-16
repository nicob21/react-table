import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";

import TableHeadCell from "./TableHeadCell";
import TableCell from "./TableCell";

const Table = (props) => {
  if (props.error) {
    return <div>{props.error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((col) => (
            <TableHeadCell
              key={col.title}
              currentSort={props.currentSort}
              sortData={props.sortData}
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
              backgroundColor: index % 2 === 0 ? "white" : "rgba(0,0,0,0.02)",
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
  sortData: PropTypes.func,
};

export default Table;
