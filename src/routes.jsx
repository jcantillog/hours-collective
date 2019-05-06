import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
/* Screens */
import ScreenHome from "./screens";

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={ScreenHome} />
    </Router>
  );
};

export default Routes;
