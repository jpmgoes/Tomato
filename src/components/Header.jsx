import React from "react";
import Toggle from "./Toggle";
import LogoArea from "./LogoArea";

const Header = ({ themeToggler, logo }) => {
  return (
    <div className="header">
      <Toggle cb={themeToggler} />
      <LogoArea logo={logo} />
    </div>
  );
};

export default Header;
