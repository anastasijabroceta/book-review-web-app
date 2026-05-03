import React from "react";
import Navbar from "./Navbar";

const Header = ({ onLoginClick }) => {
  return (
    <header>
      <Navbar onLoginClick={onLoginClick} />
    </header>
  );
};

export default Header;