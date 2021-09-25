import React from 'react';
import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';

const NoMatch = () => {
  const { pathname } = useLocation();
  return (
    <h3>
      Location: <code>{pathname}</code> <br /> does not exist.
    </h3>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/*" component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
