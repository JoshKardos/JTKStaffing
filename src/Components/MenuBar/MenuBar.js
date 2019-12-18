import React from 'react';
import './Styles/MenuBarStyles.css';
import MenuBarItem from './MenuBarItem'
import logo from '../../logo-1.png'

function MenuBar() {
  return (
    <div className="Bar">
      <div className="Left">
        <img src={logo} className="Logo" alt="logo" />
        <MenuBarItem label="Home" />
      </div>

      <div className="Right">
        <MenuBarItem label="Login" />
        <MenuBarItem label="Sign Up" />
      </div>
    </div>
  );
}

export default MenuBar;
