import React, { Component } from 'react';
import { connect } from 'react-redux'
import TableAccount from '../../tables/TableAccount'
class Account extends Component {

  // var sse = new EventSource('http://localhost:8090/tms/trip-monitor/sse');
  // sse.onmessage = function (evt) {
  //   console.log('aaa')
  // var el = document.getElementById('sse');
  // el.appendChild(document.createTextNode(evt.data));
  // el.appendChild(document.createElement('br'));
  // };
  
  state = {
    selected: this.props.state.selectedAccount,
    tab: this.props.state.tabAccount,
    display: this.props.state.displayAccount,
    textColor: 'black',
  }

  
  render() {
    return (
      <div>
        <div className="mb-2" style={{ textAlign: 'center', color: `${this.state.textColor}`, overflow: 'visible' }}>Danh sách nhân sự</div>
        <TableAccount/>
      </div >
    )
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(Account);