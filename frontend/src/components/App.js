import React from 'react';
import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import { Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
