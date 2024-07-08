import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
const Header = () => {
  const [selectedTab, setSelectedTab] = useState('/clients');
  const location = useLocation();

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location]);

  return (
    <div className="header__container">
      <div className="header__content">
        <div className="header__menu">
          <NavLink to="/clients"
            className={`header__menuItem ${(selectedTab.includes('/clients') || selectedTab === '/') ? 'header__selectedMenuItem' : 'header__menuItem'}`}>
            Clients
          </NavLink>
          <NavLink to="/transactions"
            className={`header__menuItem ${(selectedTab.includes('/transactions')) ? 'header__selectedMenuItem' : 'header__menuItem'}`}>
            Transactions
          </NavLink>
          <NavLink to="/extracts"
            className={`header__menuItem ${(selectedTab.includes('/extracts')) ? 'header__selectedMenuItem' : 'header__menuItem'}`}
          >
            Extracts
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
