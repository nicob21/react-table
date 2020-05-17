import React from "react";
import PropTypes from "prop-types";
import "./TableCell.css";

import { text, image } from "../../constants/data";

const TableCell = (props) => {
  const { data, dataType } = props;

  return (
    <td className="cell" data-test="table-cell-component">
      <div className="cellContent" data-test="table-cell-content">
        {dataType === image ? (
          <img src={data} alt={data} />
        ) : (
          <span data-test="table-cell-data">{data}</span>
        )}
      </div>
    </td>
  );
};

TableCell.propTypes = {
  data: PropTypes.string,
  dataType: PropTypes.oneOf([image, text]),
};

export default TableCell;
