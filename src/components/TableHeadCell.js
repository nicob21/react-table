import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import Draggable from "react-draggable";

import "./TableHeadCell.css";

import bottomArrow from "../assets/images/bottom_arrow_icon.svg";

import { ORDER_ASC, ORDER_DESC } from "../constants/data";

const TableHeadCell = (props) => {
  const { title, currentSort, sortable, field, sortData } = props;
  const isFilterApplied = isEqual(field, currentSort.field);

  const filterColumn = () => {
    if (sortable) {
      let order = ORDER_ASC;
      if (isFilterApplied) {
        order = currentSort.order === ORDER_DESC ? ORDER_ASC : ORDER_DESC;
      }
      sortData(field, order);
    }
  };

  return (
    <th className="headCell" style={{ width: props.width }}>
      <div className="headCellContent">
        <div
          className="headCellTitle"
          onClick={filterColumn}
          style={{ cursor: sortable ? "pointer" : "" }}
        >
          <span>{title}</span>
          {isFilterApplied && (
            <img
              src={bottomArrow}
              alt="arrows"
              className="sortArrow"
              style={{
                transform:
                  currentSort.order === ORDER_ASC ? "rotate(180deg)" : "",
              }}
            />
          )}
        </div>
        {
          //index < props.columns.length - 2 && (
          <Draggable axis="x" onDrag={props.handleColumnResize}>
            <div className="resizeCursor" style={{ left: props.width }} />
          </Draggable>
        }
      </div>
    </th>
  );
};

TableHeadCell.propTypes = {
  title: PropTypes.string,
  currentSort: PropTypes.shape({
    field: PropTypes.array,
    order: PropTypes.oneOf([ORDER_ASC, ORDER_DESC]),
  }),
  sortable: PropTypes.bool,
  field: PropTypes.array,
  sortData: PropTypes.func,
  width: PropTypes.number,
};

export default TableHeadCell;
