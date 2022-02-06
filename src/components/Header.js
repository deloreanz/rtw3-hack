import React from "react";
import './Header.css';
import logo from '../logo-risk.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />;
      </div>
    </header>
  );
}

export default Header