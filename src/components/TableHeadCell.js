import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

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
    <th onClick={filterColumn}>
      <span>{title}</span>
      {isFilterApplied && (
        <span
          style={{ backgroundColor: "white", width: "30px", height: "30px" }}
        >
          <img
            src={bottomArrow}
            alt="arrows"
            style={{
              transform:
                currentSort.order === ORDER_ASC ? "rotate(180deg)" : "",
            }}
          />
        </span>
      )}
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
};

export default TableHeadCell;
