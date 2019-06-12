import React from "react";
/* Components */
import Layout from "../components/UI/Layout";
import HoursRegister from "../components/Hours/Register";
import HoursList from "../components/Hours/List";
/* Style */
import "./style.css";

export default ({ location }) => {
  return (
      <Layout header="Hours Collective">
          <div className="home-screen">
              <div className="projects">
                  <HoursRegister elemento={localStorage.getItem("element")}/>
              </div>
              <div className="list">
                  <HoursList/>
              </div>
          </div>
      </Layout>
  );
};
