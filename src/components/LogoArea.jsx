import React from "react";

const LogoArea = ({ logo }) => {
  return (
    <div className="logo-area">
      <img src={logo} className="logo" alt="" />
      <h1>TOMATOR</h1>
      <h2>FROM FARMERS TO FARMERS</h2>
    </div>
  );
};

export default LogoArea;
