import React, { Component } from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import Footer from './components/shared/Footer';
import { connect } from 'react-redux'
import CookieService from './services/CookieService'
import { Redirect } from 'react-router';

class App extends Component {

  componentWillMount() {
    let path = 'Trang chủ'
    let page = window.location.pathname

    switch (page) {
      case '/bookings':
        path = 'Đặt chuyến'
        break;
      case '/method/vehicle':
        path = 'Phương tiện'
        break;
      case '/method/vehicle':
        path = 'Phương tiện'
        break;
      case '/store':
        path = 'Quản lý kho'
        break;
      case '/employee/account':
        path = 'Quản lý nhân sự'
        break;
      case '/employee/role':
        path = 'Quản lý nhân sự'
        break;
      default:
        break;
    }
    this.state = {
      navBar: path,
      backgroundColor: 'white',
      textColor: 'green',
    }
  }
  render() {
    let cookieService = new CookieService()
    if (cookieService.read('token') === '') {
      return (
        <div className='content-wrapper' style={{ background: `${this.state.backgroundColor}` }}>
          <AppRoutes access={false} />
        </div>
      )
    }
    else {
      return (
        <div className="container-scroller" >
          <Sidebar
          // click={() => {
          //   this.setState({
          //     navBar: this.props.state.navBar
          //   })
          // }} 
          />
          <div className="container-fluid page-body-wrapper">
            <Navbar
            //  navBar={this.state.navBar}
            />
            <div className="main-panel">
              <div className='content-wrapper'
                style={{ background: `${this.state.backgroundColor}` }}
              >
                <AppRoutes access={true} />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      )
    }
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}

export default (connect(select)(App));
