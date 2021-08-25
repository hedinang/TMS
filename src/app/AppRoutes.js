import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from './components/shared/Spinner';

const Dashboard = lazy(() => import('./components/pages/DashBoard'));
const Address = lazy(() => import('./components/pages/Address'));
const TruckGroup = lazy(() => import('./components/pages/TruckGroup'));
const Trip = lazy(() => import('./components/pages/Trip'));
const Quotation = lazy(() => import('./components/pages/Quotation'));
const Group = lazy(() => import('./components/pages/Group'));
const Account = lazy(() => import('./components/pages/Account'));
const Role = lazy(() => import('./components/pages/Role'));
const Login = lazy(() => import('./components/user-pages/Login'));
// cham co the la do mat mang load boostrap lau

function PrivateRoute(props) {
  if (props.access === false) {
    if (window.location.pathname === '/login')
      return <Route path="/login" component={Login} />
    return <Redirect to="/login" />
  }
  else {
    if (window.location.pathname === '/login')
      return <Redirect to="/dashboard" />
    return <Route exact path={props.path} component={props.component} />
  }
}
function AppRoutes(props) {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch >
        <PrivateRoute access={props.access} path='/dashboard' component={Dashboard} />
        <PrivateRoute access={props.access} path='/truck-group' component={TruckGroup} />
        <PrivateRoute access={props.access} path='/group' component={Group} />
        <PrivateRoute access={props.access} path='/trip' component={Trip} />
        <PrivateRoute access={props.access} path='/quotation' component={Quotation} />
        <PrivateRoute access={props.access} path='/account' component={Account} />
        <PrivateRoute access={props.access} path='/role' component={Role} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <PrivateRoute access={props.access} path="/address" component={Address} />
        <PrivateRoute access={props.access} path="/login" component={Login} />
        <Redirect to="/dashboard" />
      </Switch>
    </Suspense>
  )
}

export default AppRoutes;