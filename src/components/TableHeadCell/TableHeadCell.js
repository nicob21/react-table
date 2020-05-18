import React from "react";
import PropTypes from "prop-types";
import { get, isEqual } from "lodash";
import Draggable from "react-draggable";

import "./TableHeadCell.css";

//import bottomArrow from "../assets/images/bottom_arrow_icon.svg";
import bottomArrow from "./bottom_arrow_icon.svg";

import { ORDER_ASC, ORDER_DESC } from "../../constants/data";

const TableHeadCell = (props) => {
  const { title, currentSort, sortable, field, sortData } = props;
  const isFilterApplied = isEqual(field, get(currentSort, ["field"]));

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
    <th
      className="headCell"
      style={{ width: props.width }}
      data-test="table-head-cell-component"
    >
      <div className="headCellContent">
        <div
          className="headCellTitle"
          onClick={filterColumn}
          style={{ cursor: sortable ? "pointer" : "" }}
          data-test="table-head-cell-title"
        >
          <span>{title}</span>
          {isFilterApplied && (
            <img
              src={bottomArrow}
              alt="arrows"
              className="sortArrow"
              style={{
                transform:
                  get(currentSort, ["order"]) === ORDER_ASC
                    ? "rotate(180deg)"
                    : "",
              }}
              data-test="table-head-cell-sort-arrow"
            />
          )}
        </div>
        <Draggable
          axis="x"
          onDrag={props.handleColumnResize}
          data-test="table-head-cell-resize-cursor"
        >
          <div className="resizeCursor" />
        </Draggable>
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
  handleColumnResize: PropTypes.func,
};

export default TableHeadCell;
