import React from 'react';
import './Header.css';

const Header = ({ title = "SRI SRI ARCADE" }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-flex">
          <div className="header-items-center">
            <h1 className="header-title">{title}</h1>
          </div>
          <div className="header-button-container">
            <button className="header-button">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
