import { Checkbox, GridList, GridListTile} from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'

class TabPanelDashboard extends Component {
    state = {
        selectedMonitor: this.props.state.selectedMonitor,
        selectedDetail: this.props.state.selectedDetail,
        checkedMonitor: this.props.state.checkedMonitor,
        checkedDetail: this.props.state.checkedDetail,
        disabledMonitor: this.props.state.disabledMonitor,
        disabledDetail: this.props.state.disabledDetail
    }

    handleSliderChange = (event, newValue) => {
        this.setState({
            marks: [
                {
                    value: newValue,
                    label: newValue + 'kg',
                }
            ]
        })
    }
    changeVehicle = (event) => {
        switch (event.target.props.id) {
            case 'vehicle':
                this.setState({
                    vehicle: event.value
                })
                break;
            case 'good':
                this.setState({
                    good: event.value
                })
                break;
            default:
                break;
        }
    }
    clickMonitor = (event) => {
        if (event.nativeEvent.target.id === 'all') {
            this.setState({
                selectedMonitor: [
                    ...this.state.selectedMonitor.map(e => {
                        e.checked = true
                        return e
                    })
                ],
                checkedMonitor: 15,
                disabledMonitor: true
            })
            this.props.dispatch(action('CHANGE_CHECKED_MONITOR', 15))
        } else {
            let checkedMonitor = this.state.checkedMonitor
            this.setState({
                selectedMonitor: [
                    ...this.state.selectedMonitor.map(e => {
                        if (e.field === event.nativeEvent.target.id) {
                            if (e.checked === true) {
                                e.checked = false
                                checkedMonitor -= 1
                            } else {
                                e.checked = true
                                checkedMonitor += 1
                            }
                        }
                        return e
                    })
                ],
                checkedMonitor
            })
            if (checkedMonitor === 15) {
                this.setState({
                    disabledMonitor: true
                })
            }
            else {
                this.setState({
                    disabledMonitor: false
                })
            }
            this.props.dispatch(action('CHANGE_CHECKED_MONITOR', checkedMonitor))
        }
        this.props.checked()
    }
    clickDetail = (event) => {
        if (event.nativeEvent.target.id === 'all') {
            this.setState({
                selectedDetail: [
                    ...this.state.selectedDetail.map(e => {
                        e.checked = true
                        return e
                    })
                ],
                checkedDetail: 14,
                disabledDetail: true
            })
            this.props.dispatch(action('CHANGE_CHECKED_DETAIL', 14))
        } else {
            let checkedDetail = this.state.checkedDetail
            this.setState({
                selectedDetail: [
                    ...this.state.selectedDetail.map(e => {
                        if (e.field === event.nativeEvent.target.id) {
                            if (e.checked === true) {
                                e.checked = false
                                checkedDetail -= 1
                            } else {
                                e.checked = true
                                checkedDetail += 1
                            }
                        }
                        return e
                    })
                ],
                checkedDetail: checkedDetail
            })
            if (checkedDetail === 14) {
                this.setState({
                    disabledDetail: true
                })
            }
            else {
                this.setState({
                    disabledDetail: false
                })
            }
            this.props.dispatch(action('CHANGE_CHECKED_DETAIL', checkedDetail))
        }
        this.props.checked()
    }
    render() {
        switch (this.props.id) {
            case 0:
                return (
                    <div style={{ 'background-color': 'white', 'color': 'black' }}>
                        <button id='all' disabled={this.state.disabledMonitor}
                            type="button" className="btn btn-success" onClick={this.clickMonitor}>Chọn tất</button>
                        <div >Có {this.state.checkedMonitor}/15 loại được chọn hiển thị</div>
                        <GridList cellHeight={50} cols={6} >
                            {this.state.selectedMonitor.map(e => {
                                return <GridListTile key={e.field}>
                                    <div >
                                        <Checkbox id={e.field}
                                            checked={e.checked}
                                            onClick={this.clickMonitor} />
                                        {e.title}
                                    </div>
                                </GridListTile>
                            })}
                        </GridList>
                    </div>
                )
            case 1:
                return (
                    <div style={{ 'background-color': 'white', 'color': 'black' }}>
                        <button id='all' disabled={this.state.disabledDetail}
                            type="button" className="btn btn-success" onClick={this.clickDetail}>Chọn tất</button>
                        <div >Có {this.state.checkedDetail}/14 loại được chọn hiển thị</div>
                        <GridList cellHeight={50} cols={6} >
                            {this.state.selectedDetail.map(e => {
                                return <GridListTile key={e.field}>
                                    <div >
                                        <Checkbox id={e.field}
                                            checked={e.checked}
                                            onClick={this.clickDetail} />
                                        {e.title}
                                    </div>
                                </GridListTile>
                            })}
                        </GridList>
                    </div>
                )
            default:
                break;
        }
    }
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TabPanelDashboard);