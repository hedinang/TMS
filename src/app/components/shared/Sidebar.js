import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { AiOutlineMenu } from 'react-icons/ai'
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'

class Sidebar extends Component {

  state = {
    backgroundColor: 'white',
    textColor: 'green',
    aiOutlineMenu: 'black',
    width: '200px',
  }

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }
  changeNavBar = (e) => {
    let navBar = e.currentTarget.id
    let strNavBar = ''
    switch (navBar) {
      case 'dashboard':
        strNavBar = 'Trang chủ'
        break;
      case 'booking':
        strNavBar = 'Đặt chuyến'
        break;
      case '/method/vehicle':
        strNavBar = 'Phương tiện'
        break;
      case '/method/device':
        strNavBar = 'Phương tiện'
        break;
      case 'store':
        strNavBar = 'Quản lý kho'
        break;
      default:
        break;
    }
    this.props.dispatch(action('CHANGE_NAVBAR', strNavBar))
    this.props.click()
  }
  clickAiOutlineMenu = (e) => {
    document.body.classList.toggle('sidebar-icon-only')
    if (this.state.width === '')
      this.setState({
        width: '200px',
      })
    else
      this.setState({
        width: '',
      })
  }
  render() {

    return (
      <nav className="sidebar" id="sidebar" style={{
        backgroundColor: `${this.state.backgroundColor}`,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top"
        style={{ backgroundColor: `${this.state.backgroundColor}` }}
        >
          <a className="sidebar-brand brand-logo"><img src={require('../../../assets/images/icons/logistic_icon.png')} alt="logo" /></a>
          <AiOutlineMenu size={26} onClick={this.clickAiOutlineMenu} style={{ color: `${this.state.aiOutlineMenu}` }} />
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <Dropdown alignRight>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}  >
            <Link style={{ width: `${this.state.width}` }} id='dashboard' className="nav-link" to="/dashboard" onClick={
              this.changeNavBar
            }>
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }}>Trang chủ</span>
            </Link>
          </li>
          <li className={this.isPathActive('/booking') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link style={{ width: `${this.state.width}` }} className="nav-link" to="/booking" id='booking' onClick={
              this.changeNavBar
            }>
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }}>Đặt chuyến</span>
            </Link>
          </li>
          <li className={this.isPathActive('/method') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div style={{ width: `${this.state.width}` }} className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }}>Phương tiện</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link style={{ color: `${this.state.textColor}` }} id='/method/vehicle' className={this.isPathActive('/method/vehicle') ? 'nav-link active' : 'nav-link'} to="/method/vehicle" onClick={
                    this.changeNavBar
                  }>Xe</Link></li>
                  <li className="nav-item"> <Link style={{ color: `${this.state.textColor}` }} id='/method/device' className={this.isPathActive('/method/device') ? 'nav-link active' : 'nav-link'} to="/method/device" onClick={
                    this.changeNavBar
                  }>Thiết bị</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/store') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link style={{ width: `${this.state.width}` }} className="nav-link" to="/store" id='store' onClick={
              this.changeNavBar
            }>
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }}>Quản lý kho</span>
            </Link>
          </li>
          <li className={this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div style={{ width: `${this.state.width}` }} className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }}>Tài xế</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link style={{ color: `${this.state.textColor}` }} className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi">Material</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div style={{ width: `${this.state.width}` }} className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }} >Đấu thầu</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1" style={{ color: `${this.state.textColor}` }} >Login</Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1" style={{ color: `${this.state.textColor}` }} >Register</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a style={{ width: `${this.state.width}` }} className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }} >Quản lý nhân sự</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a style={{ width: `${this.state.width}` }} className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }} >Cài đặt hệ thống</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a style={{ width: `${this.state.width}` }} className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }} >Báo cáo</span>
            </a>
          </li>
          <li className="nav-item menu-items">
            <a style={{ width: `${this.state.width}` }} className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title" style={{ color: `${this.state.textColor}` }} >Cài đặt ứng</span>
            </a>
          </li>
        </ul>
      </nav >
    );
  }
  isPathActive(path) {
    return this.props.location.pathname.startsWith(path)
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default withRouter(connect(select)(Sidebar))