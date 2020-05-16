import React from "react";
import { get } from "lodash";

import { fetchGet } from "../fetch/fetch";

import TableContainer from "./TableContainer";

import { RANDOM_USER_API } from "../settings/api";
import { image, text } from "../constants/data";

const columns = [
  {
    title: "Picture",
    field: ["picture", "thumbnail"],
    sortable: false,
    type: image,
  },
  {
    title: "First Name",
    field: ["name", "first"],
    sortable: true,
    type: text,
  },
  {
    title: "Last Name",
    field: ["name", "last"],
    sortable: true,
    type: text,
  },
  {
    title: "Gender",
    field: ["gender"],
    sortable: true,
    type: text,
  },
  {
    title: "Email",
    field: ["email"],
    sortable: true,
    type: text,
  },
  {
    title: "Cell",
    field: ["cell"],
    sortable: true,
    type: text,
  },
];

const UserTable = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetchGet("?results=50", RANDOM_USER_API);
        if (get(res, ["results"])) {
          setUsers(get(res, ["results"]));
        }
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, []);

  return <TableContainer columns={columns} data={users} error={error} />;
};

export default UserTable;
