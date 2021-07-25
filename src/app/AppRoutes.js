import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from './components/shared/Spinner';

const Dashboard = lazy(() => import('./components/pages/DashBoard'));
const Address = lazy(() => import('./components/pages/store/Address'));
const Booking = lazy(() => import('./components/pages/Booking'));
const Device = lazy(() => import('./components/pages/method/Device'));
const Account = lazy(() => import('./components/pages/employee/Account'));
const Role = lazy(() => import('./components/pages/employee/Role'));
const Buttons = lazy(() => import('./components/basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./components/basic-ui/Dropdowns'));
const Typography = lazy(() => import('./components/basic-ui/Typography'));

const BasicElements = lazy(() => import('./components/form-elements/BasicElements'));

const BasicTable = lazy(() => import('./components/charts/ChartJs'));

const Mdi = lazy(() => import('./components/icons/Mdi'));

const ChartJs = lazy(() => import('./components/charts/ChartJs'));

const Error404 = lazy(() => import('./components/error-pages/Error404'));
const Error500 = lazy(() => import('./components/error-pages/Error500'));

const Login = lazy(() => import('./components/user-pages/Login'));
const Register1 = lazy(() => import('./components/user-pages/Register'));

class PrivateRoute extends Component {
  render() {
    if (this.props.access === false) {
      if (window.location.pathname === '/login')
        return <Route path="/login" component={Login} />
      return <Redirect to="/login" />
    }
    else {
      if (window.location.pathname === '/login')
        return <Redirect to="/dashboard" />
      return <Route exact path={this.props.path} component={this.props.component} />

    }

  }
}
class AppRoutes extends Component {

  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch >
          <PrivateRoute access={this.props.access} path='/dashboard' component={Dashboard} />
          <PrivateRoute access={this.props.access} path='/booking' component={Booking} />
          <PrivateRoute access={this.props.access} path='/method/vehicle' component={Buttons} />
          <PrivateRoute access={this.props.access} path='/method/device' component={Device} />
          <PrivateRoute access={this.props.access} path='/employee/account' component={Account} />
          <PrivateRoute access={this.props.access} path='/employee/role' component={Role} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <PrivateRoute access={this.props.access} path="/store/address" component={Address} />
          <PrivateRoute access={this.props.access} path="/form-Elements/basic-elements" component={BasicElements} />
          <PrivateRoute access={this.props.access} path="/tables/basic-table" component={BasicTable} />
          <PrivateRoute access={this.props.access} path="/icons/mdi" component={Mdi} />
          <PrivateRoute access={this.props.access} path="/charts/chart-js" component={ChartJs} />
          <PrivateRoute access={this.props.access} path="/login" component={Login} />
          <PrivateRoute access={this.props.access} path="/user-pages/register-1" component={Register1} />
          <PrivateRoute access={this.props.access} path="/error-pages/error-404" component={Error404} />
          <PrivateRoute access={this.props.access} path="/error-pages/error-500" component={Error500} />
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;