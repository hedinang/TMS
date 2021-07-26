import React from 'react';
import { connect } from 'react-redux'
import TableAddress from '../tables/TableAddress';
function Address() {
  return (
    <div>
      <div className="mb-2" style={{ textAlign: 'center', color: 'black', overflow: 'visible' }}>Danh sách địa chỉ</div>
      <TableAddress height={'600px'} />
    </div >
  )
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(Address);