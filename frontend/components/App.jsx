import React from "react";
import GreetingContainer from './greeting/greeting_container'
import { Route, Switch } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import SplashContainer from './splach_container';
import DashboardContainer from './dashboard/dashboard_container';
import RoutesIndexContainer from './route/route_index_container';
import RoutesCreateContainer from './route/route_create_container';
import Footer from './greeting/footer'
import Modal from './modal/modal.jsx'



const App = () => (
  <div>
      <GreetingContainer />
      <Modal/>
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
        <ProtectedRoute exact path="/routes" component={RoutesIndexContainer} />
        <ProtectedRoute exact path="/routes/new" component={RoutesCreateContainer} />
        <AuthRoute exact path="/" component={SplashContainer} />
      </Switch>
      <Footer />
  </div>
);

export default App;