import React from "react";
import AppRoute from "./AppRoute";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <AppRoute />
      </Router>
    </>
  );
};

export default App;
