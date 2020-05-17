import React from "react";
import PropTypes from "prop-types";
import "./TableCell.css";

import { text, image } from "../constants/data";

const TableCell = (props) => {
  const { data, dataType } = props;

  return (
    <td className="cell">
      <div className="cellContent">
        {dataType === image ? (
          <img src={data} alt={data} />
        ) : (
          <span>{data}</span>
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
