import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { AiOutlineMenu } from 'react-icons/ai'
class Sidebar extends Component {

  state = {};

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

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo"><img src={require('../../../assets/images/logo.svg')} alt="logo" /></a>
          <AiOutlineMenu size={26} onClick={() => document.body.classList.toggle('sidebar-icon-only')} />
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

          <li className={'nav-item menu-items'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Trang chủ</Trans></span>
            </Link>
          </li>
          <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('basicUiMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title"><Trans>Quản trị hệ thống</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link'} to="/basic-ui/buttons"><Trans>Danh mục</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link'} to="/basic-ui/dropdowns"><Trans>Cấu hình</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link'} to="/basic-ui/typography"><Trans>Phân quyền</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Quản lý kho</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'} to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title"><Trans>Quản lý vận chuyển</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'} to="/tables/basic-table"><Trans>Xe</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'} to="/tables/basic-table"><Trans>Thiết bị</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title"><Trans>Quản lý khách hàng</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'} to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title"><Trans>Báo cáo</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'} to="/icons/mdi"><Trans>Material</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>Bản đồ</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'} to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title"><Trans>Tài liệu</Trans></span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);