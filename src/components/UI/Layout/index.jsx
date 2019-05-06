import React from "react";
/* Styles */
import "./style.css";

const Layout = ({ children, header }) => {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
