import {
    Plugin, Template, TemplatePlaceholder
} from '@devexpress/dx-react-core';
import {
    AppBar, Button, Tab, Tabs, DialogActions, DialogContent, Input, Slider,
    DialogContentText, DialogTitle, Dialog, Paper, Grid
} from '@material-ui/core';
import React, { useState } from 'react';
import TabPanelBookings from '../../tables/TabPanelBookings'
import { connect } from 'react-redux'
import { action } from '../../../redux/actions/actions'
import { faEye, faPlusSquare, faInfoCircle, faTv } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TabPanelDashboard from '../../tables/TabPanelDashboard';
import Draggable from 'react-draggable';
import { FormElement } from '@progress/kendo-react-form'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
class ToolbarPanel extends React.PureComponent {
    state = {
        selectedBooking: this.props.state.selectedBookings,
        selectedMonitor: this.props.state.selectedMonitor,
        selectedDetail: this.props.state.selectedDetail,
        tab: this.props.state.tabBookings,
        display: this.props.state.displayBookings,
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
            if (this.props.state.selectStateBookings === true) {
                this.props.dispatch(action('CHANGE_STATE_TAB', {
                    selectState: false,
                    display: 'none',
                }))
                this.setState({
                    display: 'none'
                })
            } else {
                this.props.dispatch(action('CHANGE_STATE_TAB', {
                    selectState: true,
                    display: 'inline',
                }))
                this.setState({
                    display: 'inline'
                })
            }
        } else {
            this.setState({
                display: 'inline'
            })
            // if (this.state.open === false) {
            //     if (this.props.state.dialog === false) {
            //         this.setState({
            //             open: true,
            //         })
            //         this.props.dispatch(action('CHANGE_DIALOG', true))
            //     } else {
            //         this.setState({
            //             open: false
            //         })
            //     }
            // } else {
            //     if (this.props.state.dialog === false) {
            //         this.setState({
            //             open: false
            //         })
            //     }
            // else {

            // }
        }


    }
    createBook = () => {

        console.log('aaa');
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
    changeFee = (e) => {
        console.log('aaaa');
        // this.props.dispatch(action('CHANGE_DIALOG', true))
    }
    changeDropDownList = (event) => {
        this.props.dispatch(action('CHANGE_DIALOG', true))
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
    selectPanel = () => {
        switch (this.props.panel) {
            case 'monitor':
                return <div style={{ width: '120rem', borderStyle: 'none' }}>
                    <AppBar position="static" className='rounded-top' style={{ background: 'white', color: 'black', borderStyle: 'none' }}>
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
            default:
                return <div style={{ width: '120rem', borderStyle: 'none' }}>
                    <AppBar position="static" className='rounded-top' style={{ background: 'white', color: 'black', borderStyle: 'none' }}>
                        <Tabs value={this.state.tab}
                            TabIndicatorProps={{ style: { background: "white", } }}
                            onChange={this.changeTabBooking} >
                            <Tab style={{ opacity: 1 }} label={<div>
                                <FontAwesomeIcon icon={faEye} className='mr-2' />
                                <span>Hiển thị</span>
                            </div>} />
                            <Tab id='tab' style={{ opacity: 1 }} label={<div>
                                <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                                <span>Tạo mới</span>

                            </div>}
                            />
                        </Tabs>
                    </AppBar>
                    <div id='tabPanel' style={{ display: `${this.state.display}`, borderStyle: 'none', background: 'white', }} >
                        <TabPanelBookings checked={() => {
                            this.props.reload()
                            this.setState({
                                selectedBooking: this.props.state.selectedBooking
                            })
                        }} selected={this.state.selectedBooking} id={this.state.tab} />
                    </div>
                </div>
        }
    }
    render() {
        return (
            <Plugin>
                <Template name="toolbarContent" >
                    {/* <TemplatePlaceholder /> */}
                    <this.selectPanel />
                </Template>
            </Plugin>
        );
    }
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(ToolbarPanel);