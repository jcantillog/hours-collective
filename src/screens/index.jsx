import React from "react";
/* Components */
import Layout from "../components/UI/Layout";
import HoursRegister from "../components/Hours/Register";
/* Style */
import "./style.css";

export default ({ location }) => {
  return (
      <Layout header="Hours Collective">
          <div className="home-screen">
              <div className="projects">
                  <HoursRegister />
              </div>
              <div className="list">
                  List
              </div>
          </div>
      </Layout>
  );
};
