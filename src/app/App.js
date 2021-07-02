import React, { Component } from 'react';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import Footer from './components/shared/Footer';
import { connect } from 'react-redux'

class App extends Component {

  componentWillMount() {
    let path = 'Trang chủ'
    switch (window.location.pathname) {
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
      default:
        break;
    }
    this.state = {
      navBar: path
    }
  }
  render() {

    return (
      <div className="container-scroller">
        <Sidebar click={() => {
          this.setState({
            navBar: this.props.state.navBar
          })
        }} />
        <div className="container-fluid page-body-wrapper">
          <Navbar navBar={this.state.navBar} />
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}

export default (connect(select)(App));
