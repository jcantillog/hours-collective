/* Basic */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./services/utils";
import ParticlesContainer from "./components/UI/Particles";
/* Screens */
import ScreenHome from "./screens";
import ScreenLogin from "./screens/Login";

const Routes = () => {
  return (
    <Router>
        <ParticlesContainer/>
        <PrivateRoute exact path="/" component={ScreenHome} redirectTo="/login"/>
        <PrivateRoute exact path="/login" component={ScreenLogin} redirectTo="/"/>
    </Router>
  );
};

export default Routes;
