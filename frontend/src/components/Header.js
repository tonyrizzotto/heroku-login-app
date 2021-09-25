import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  // destory the user and user session
  const logout = async () => {
    await fetch('/api/logout')
      .then((res) => res.json())
      .then((data) => {
        history.push('/');
      });
  };
  return (
    <nav className="navbar">
      <div className="logo">Login Here</div>

      <ul className="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>
        <div className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <a
              href="/"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Header;
