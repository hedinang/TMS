import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { BsToggleOn } from 'react-icons/bs'
import { connect } from 'react-redux'
import CookieService from '../../services/CookieService';


class Navbar extends Component {
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  state = {
    backgroundColor: 'white',
    textColor: 'black',
  }
  logout = (e) => {
    let cookieService = new CookieService()
    cookieService.delete('token')
  }
  render() {
    return (
      <nav className={"p-0 fixed-top d-flex flex-row " + "navbar"}
        style={{ background: `${this.state.backgroundColor}` }}
      >
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../../assets/images/logo-mini.svg')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <ul className="navbar-nav w-100">
            <li className="nav-item w-25" style={{ textAlign: "center", color: `${this.state.textColor}` }}>
              {this.props.navBar}
            </li>
            <li className="nav-item w-75">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search" >
                <input type="search"
                  className="form-control" placeholder="Tìm kiếm"
                  style={{ borderColor: `${this.state.backgroundColor}`, background: `${this.state.backgroundColor}` }} />
              </form>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link" onClick={event => {
                event.preventDefault()

              }}>
                <BsToggleOn style={{ color: `${this.state.textColor}` }} />
              </a>
            </li>
            <Dropdown alignRight as="li" className="nav-item border-left dropItem" >
              <Dropdown.Toggle as="a" className="nav-link count-indicator cursor-pointer">
                <i className="mdi mdi-email" style={{ color: `${this.state.textColor}` }}></i>
                <span className="count bg-success" style={{ fontSize: '15px' }}>7</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list" style={{ background: `${this.state.backgroundColor}` }}>
                <h6 className="p-3" style={{ color: `${this.state.textColor}` }}>Tin nhắn</h6>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item ">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img src={require('../../../assets/images/faces/face4.jpg')} alt="profile" className="rounded-circle profile-pic" />
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ width: '250px', color: `${this.state.textColor}` }}>
                    <p >Mạnh Hùng</p>
                    <div className="text-muted">
                      <span className='overflow'>Hôm qua đi đâu vậyssssssssssssssssssssssssssssssssss</span>
                      <span className='overflow'>&nbsp;- 1 phút</span>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img src={require('../../../assets/images/faces/face2.jpg')} alt="profile" className="rounded-circle profile-pic" />
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ width: '250px', color: `${this.state.textColor}` }}>
                    <p >Đức</p>
                    <div className="text-muted">
                      <span className='overflow'>Alo ông</span>
                      <span className='overflow'>&nbsp;- 1 giờ</span>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img src={require('../../../assets/images/faces/face3.jpg')} alt="profile" className="rounded-circle profile-pic" />
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ width: '250px', color: `${this.state.textColor}` }}>
                    <p >Mai Văn Hậu</p>
                    <div className="text-muted">
                      <span className='overflow'>Bạn: Về rồi, mệt quá</span>
                      <span className='overflow'>&nbsp;- 2 ngày</span>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center" style={{ color: `${this.state.textColor}` }}>Xem tất cả trong Messenger</p>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown alignRight as="li" className="nav-item border-left dropItem">
              <Dropdown.Toggle as="a" className="nav-link count-indicator cursor-pointer">
                <i className="mdi mdi-bell" style={{ color: `${this.state.textColor}` }}></i>
                <span className="count bg-danger" style={{ fontSize: '15px' }}>5</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list" style={{ background: `${this.state.backgroundColor}` }}>
                <div style={{ color: `${this.state.textColor}` }}>
                  <h6 className="p-3" style={{ float: 'left' }}>Thông báo</h6>
                  <Link className="p-3 " style={{ float: 'right' }}>Xem tất cả</Link>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ color: `${this.state.textColor}` }}>
                    <p className="preview-subject mb-1">Cảnh báo nhiệt độ chuyến 123ABC</p>
                    <p className="text-muted ellipsis mb-0">1 phút trước</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ color: `${this.state.textColor}` }}>
                    <p className="preview-subject mb-1">Cảnh báo cửa sau mở chuyến 345XYZ</p>
                    <p className="text-muted ellipsis mb-0">2 giờ trước</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-link-variant text-warning"></i>
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ color: `${this.state.textColor}` }}>
                    <p className="preview-subject mb-1">Cập nhật tọa độ chuyến ABCXYZ</p>
                    <p className="text-muted ellipsis mb-0">1 ngày trước</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown alignRight as="li" className="nav-item dropItem">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile" style={{ color: `${this.state.textColor}` }}>
                  <img className="img-xs rounded-circle" src={require('../../../assets/images/faces/face15.jpg')} alt="profile" />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">Trần Dũng</p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu" style={{ background: `${this.state.backgroundColor}` }}>

                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img src={require('../../../assets/images/faces/face4.jpg')} alt="profile" className="rounded-circle profile-pic" />
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ color: `${this.state.textColor}` }}>
                    <p className='mt-3'>Chuyển tài khoản</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ color: `${this.state.textColor}` }}>
                    <p className="preview-subject mb-1">Cài đặt tài khoản</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={this.logout} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content" style={{ color: `${this.state.textColor}` }}>
                    <p className="preview-subject mb-1">Đăng xuất</p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav >
    );
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(Navbar);