import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import './App.css';

const App = () => {
  // destory the user and user session
  const logout = async () => {
    await fetch('/api/logout')
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };
  return (
    <Router>
      <div>
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

        <Switch>
          <Route exact path="/" component={Login} />

          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
