import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../container/dashboard';
import App from '../App';
import '../index.css'

//Note: Define routes here
const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Switch>
        {/* Note: Campaign List Route */}
        <Route component={App} path="/" exact={true} />
        {/* Note: Campaign Details Route */}
        <Route component={Dashboard} path="/dashboard" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter