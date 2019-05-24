import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./services/utils";
/* Screens */
import ScreenHome from "./screens";
import ScreenLogin from "./screens/Login";

const Routes = () => {
  return (
    <Router>
        <PrivateRoute exact path="/" component={ScreenHome} />
        <Route path="/login" component={ScreenLogin} />
    </Router>
  );
};

export default Routes;
