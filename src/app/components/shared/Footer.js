import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
class Footer extends Component {
  state = {
    backgroundColor: 'white',
    textColor: 'green',
    aiOutlineMenu: 'black'
  }
  render() {
    return (
      <footer className="footer" style={{ background: `${this.state.backgroundColor}` }}>
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © <a href="https://www.bootstrapdash.com/" target="_blank" rel="noopener noreferrer">logistic.com.vn </a>2020</span>
            {/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Free <a href="https://www.bootstrapdash.com/react-admin-templates/" target="_blank" rel="noopener noreferrer"> react admin </a> templates from BootstrapDash.com.  </span> */}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;