import React from "react";
import GreetingContainer from './greeting/greeting_container'
import { Route, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import SplashContainer from './splach_container';
import DashboardContainer from './dashboard/dashboard_container';



const App = () => (
  <div>
      <GreetingContainer />
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
        <AuthRoute exact path="/" component={SplashContainer} />
      </Switch>
  </div>
);

export default App;