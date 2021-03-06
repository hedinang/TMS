import {
    Plugin, Template, TemplatePlaceholder
} from '@devexpress/dx-react-core';
import {
    AppBar, Button, Tab, Tabs, DialogActions, DialogContent, Input, Slider, Select,
    DialogContentText, DialogTitle, Dialog, Paper, Grid, MenuItem, TextField
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'
import { faEye, faPlusSquare, faInfoCircle, faTv } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TabPanelDashboard from '../tables/TabPanelDashboard';

import TabPanelBooking from '../tables/TabPanelBooking';
import { DialogCreateAccount, DialogEditAccount } from '../dialog/DialogAccount'
class ToolbarPanel extends React.PureComponent {
    state = {
        selectedBooking: this.props.state.selectedBooking,
        selectedMonitor: this.props.state.selectedMonitor,
        selectedDetail: this.props.state.selectedDetail,
        selectedAccount: this.props.state.selectedAccount,

        tab: this.props.state.tabBooking,
        tabAccount: this.props.state.tabAccount,

        display: this.props.state.displayBooking,
        displayAccount: this.props.state.displayAccount,

        open: false,
        vehicleType: [
            'Xe tải nhỏ', 'Xe tải to', 'Xe ABC', 'Xe XYZ'
        ],
        vehicle: 'aaaa',
        goodType: [
            'Hoa quả', 'Thịt', 'Rau', 'Sữa', 'Cá', 'Bim bim'
        ],
        good: '',
        marks: [
            {
                value: 0,
                label: '0kg',
            }
        ],
        status: [
            { id: 0, name: 'Đang chờ' },
            { id: 1, name: 'Đang khóa' },
            { id: 2, name: 'Đã kích hoạt' }
        ],
        account: {
            open: false,
        },
    }

    changeTab = (e, value) => {
        if (this.props.state.selectStateBookings === true) {
            if (this.props.state.tabBookings === value) {
                this.props.dispatch(action('CHANGE_STATE_TAB', {
                    selectState: false,
                    display: 'none',
                    id: 1//1 la bookings
                }))
                this.setState({
                    display: 'none'
                })
            }
        }
        else {
            this.props.dispatch(action('CHANGE_STATE_TAB', {
                selectState: true,
                display: 'inline',
                id: 1
            }))
            this.setState({
                display: 'inline'
            })
        }
        this.props.dispatch(action('CHANGE_VALUE_TAB', {
            tab: value,
            id: 1
        }))
        this.setState({
            tab: value
        })
    }
    changeTabBooking = (e, value) => {
        if (value === 0) {
            if (this.props.state.selectStateBooking === true) {
                this.props.dispatch(action('CHANGE_STATE_TAB', {
                    selectState: false,
                    display: 'none',
                }))
                this.setState({
                    display: 'none',
                    tab: value
                })
            } else {
                this.props.dispatch(action('CHANGE_STATE_TAB', {
                    selectState: true,
                    display: 'inline',
                }))
                this.props.dispatch(action('CHANGE_VALUE_TAB', {
                    tab: value,
                    id: 1
                }))
                this.setState({
                    display: 'inline',
                    tab: value
                })

            }
        } else {
            if (this.state.open === false) {
                if (this.props.state.dialog === false) {
                    this.setState({
                        open: true,
                    })
                    this.props.dispatch(action('CHANGE_DIALOG', true))
                } else {
                    this.setState({
                        open: false
                    })
                }
            } else {
                if (this.props.state.dialog === false) {
                    this.setState({
                        open: false
                    })
                }
            }
        }
    }

    handleClose = (e) => {
        this.props.dispatch(action('CHANGE_DIALOG', false))

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

    changeDropDownList = (event) => {
        // this.props.dispatch(action('CHANGE_DIALOG', true))
        switch (event.target.id) {
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
    addItem = (event) => {
        switch (event) {
            case 'CREATE_USER_SUCCESS':
                this.setState({
                    account: false
                })
                break;
            case 3:
                break;
            default:
                break;
        }
        this.props.addItem(event)

    }
    cancel = (event) => {
        switch (event) {
            case 1:
                this.setState({
                    account: {
                        open: false,
                    }
                })
                break;
            case 'CANCEL_USER_UPDATE':
                this.props.cancel('CANCEL_USER_UPDATE')
                break;
            default:
                break;
        }

    }

    confirm = (event) => {

    }
    selectPanel = () => {
        switch (this.props.panel) {
            case 'monitor':
                return <div style={{ width: '120rem', borderStyle: 'none' }}>
                    <AppBar position="static" className='rounded-top'
                        style={{ background: 'white', color: 'black', borderStyle: 'none', boxShadow: 'none' }}>
                        <Tabs value={this.state.tab
                        } onChange={this.changeTab} >
                            <Tab label={<div>
                                <FontAwesomeIcon icon={faTv} className='mr-2' />
                                <span>Giám sát</span>
                            </div>} />
                            <Tab label={<div>
                                <FontAwesomeIcon icon={faInfoCircle} className='mr-2' />
                                <span>Chi tiết</span>
                            </div>} />
                        </Tabs>
                    </AppBar>
                    <div id='tabPanel' style={{ display: `${this.state.display}`, borderStyle: 'none', background: 'white', }} >
                        <TabPanelDashboard checked={() => {
                            this.props.reload()
                            this.setState({
                                selectedMonitor: this.props.state.selectedMonitor
                            })
                        }} selected={this.state.selectedMonitor} id={this.state.tab} />
                    </div>
                </div>
            case 'detail':
                return <div style={{ width: '120rem', borderStyle: 'none', textAlign: 'center', color: '#679b2f' }}>
                    Chi tiết chuyến xe 2345
                </div>
            
            case 'booking':
                return (
                    <div style={{ width: '80rem', borderStyle: 'none' }}>
                        <AppBar position="static" className='rounded-top' style={{
                            background: 'white', color: 'black',
                            borderStyle: 'none', boxShadow: 'none',
                        }}>
                            <Tabs value={this.state.tab}
                                TabIndicatorProps={{ style: { background: "white", } }}
                                onChange={this.changeTabBooking} >
                                <Tab style={{ opacity: 1, textAlign: 'center' }} label={<div>
                                    <FontAwesomeIcon icon={faEye} className='mr-2' />
                                    <span>Hiển thị</span>
                                </div>} />
                                <Tab
                                    id='tab' style={{ opacity: 1 }} label={<div>
                                        <button
                                            style={{ border: 'none', textTransform: 'uppercase' }}
                                            onClick={
                                                e => {
                                                    this.setState({
                                                        account: {
                                                            open: true,
                                                            id: 0
                                                        }
                                                    })
                                                }
                                            }>
                                            <FontAwesomeIcon
                                                icon={faPlusSquare} className='mr-2' />
                                            <span>Tạo mới</span>
                                        </button>
                                        {/* <DialogCreateAccount create={this.state.account}
                                        confirm={this.addItem} cancel={this.cancel} />
                                    <DialogEditAccount edit={this.props.edit}
                                        confirm={this.addItem} cancel={this.cancel} /> */}
                                    </div>}
                                />
                            </Tabs>
                        </AppBar>
                        <div id='tabPanel' style={{ display: `${this.state.display}`, borderStyle: 'none', background: 'white', }} >
                            <TabPanelBooking checked={() => {
                                this.props.reload()
                                this.setState({
                                    selectedBooking: this.props.state.selectedBooking
                                })
                            }} selected={this.state.selectedBooking} id={this.props.state.tabBooking} />
                        </div>
                    </div>
                )
        }
    }
    render() {
        return (
            <Plugin>
                <Template name="toolbarContent" >
                    <this.selectPanel />
                </Template>
            </Plugin>
        )
    }
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(ToolbarPanel);