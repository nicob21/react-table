import React from "react";
import { get } from "lodash";

import { fetchGet } from "../fetch/fetch";

import LazyLoadContainer from "./LazyLoadContainer";
import TableContainer from "./TableContainer";

import { RANDOM_USER_API } from "../settings/api";
import { image, text } from "../constants/data";

/** Define the columns for the User Table */
const columns = [
  {
    title: "Picture",
    field: ["picture", "thumbnail"],
    sortable: false,
    type: image,
    initialWidth: 100,
  },
  {
    title: "First Name",
    field: ["name", "first"],
    sortable: true,
    type: text,
    initialWidth: 120,
  },
  {
    title: "Last Name",
    field: ["name", "last"],
    sortable: true,
    type: text,
    initialWidth: 120,
  },
  {
    title: "Gender",
    field: ["gender"],
    sortable: true,
    type: text,
    initialWidth: 120,
  },
  {
    title: "Email",
    field: ["email"],
    sortable: true,
    type: text,
    initialWidth: 250,
  },
  {
    title: "Cell",
    field: ["cell"],
    sortable: true,
    type: text,
    initialWidth: 150,
  },
];

const UserTable = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  /** Fetch a first chunk of users on mount */
  React.useEffect(() => {
    fetchData();
  }, []);

  /** Fetch data from the random user API */
  const fetchData = async () => {
    try {
      let res = await fetchGet("?results=30", RANDOM_USER_API);
      if (get(res, ["results"])) {
        setUsers((prevUsers) => [...prevUsers, ...get(res, ["results"])]);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <LazyLoadContainer loadMore={fetchData}>
      <TableContainer columns={columns} data={users} error={error} />
    </LazyLoadContainer>
  );
};

export default UserTable;
