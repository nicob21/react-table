import React from "react";

import "./App.css";

import UserTable from "../../containers/UserTable";

const App = () => {
  return (
    <div className="App" data-test="app-component">
      <header className="App-header">
        <UserTable />
      </header>
    </div>
  );
};

export default App;
