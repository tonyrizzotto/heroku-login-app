import React from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Logout from './Logout';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="logo">Login Here</div>

          <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label for="checkbox_toggle" class="hamburger">
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
                <Link to="/logout">Logout</Link>
              </li>
            </div>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
