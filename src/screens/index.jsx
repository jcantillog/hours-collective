/* Basic */
import React from "react";
/* Animations */
/* Components */
import Layout from "../components/UI/Layout";
import HoursRegister from "../components/Hours/Register";
import HoursList from "../components/Hours/List";
/* Services */
/* Styles */
import styled from 'styled-components';
const Screen = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 100px;
    grid-gap: 20px;
    justify-content: center;
`;
const StyledHoursRegister = styled.div`
    grid-row: 1 / span 1;
`;
const StyledHoursList = styled.div`
    grid-row: 2 / span 1;
    align-self: center;
`;

export default ({ location }) => {
  return (
      <Layout header="Hours Collective">
          <Screen>
              <StyledHoursRegister as={HoursRegister} elemento={localStorage.getItem("element")} />
              <StyledHoursList>
                  {/*as={HoursList}*/}
                  List
              </StyledHoursList>
          </Screen>
      </Layout>
  );
};
