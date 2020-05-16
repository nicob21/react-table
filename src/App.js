import React from "react";

import "./App.css";

import UserTable from "./containers/UserTable";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <UserTable />
      </header>
    </div>
  );
};

export default App;
