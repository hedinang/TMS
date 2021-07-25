import React, { Component, useEffect, useState } from 'react';
import { FormElement } from '@progress/kendo-react-form'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'
import { faAllergies } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Plugin, Template, TemplatePlaceholder
} from '@devexpress/dx-react-core';
import {
    AppBar, Button, Tab, Tabs, DialogActions, DialogContent, Input, Slider, GridListTile, GridList,
    DialogContentText, DialogTitle, Dialog, Paper, Grid, Checkbox, MenuItem, Select
} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Show(props) {

    let [selected, setSelected] = useState([])
    useEffect(() => {
        selected = [
            {
                'field': 'id',
                'title': 'STT',
                'width': '100px',
                'checked': true

            },
            {
                'field': 'action',
                'title': 'Thao tác',
                'width': '100px',
                'checked': true

            },
            {
                'field': 'bookingCode',
                'title': 'Mã đặt chuyến',
                'width': '150px',
                'checked': true
            },
            {
                'field': 'shipperName',
                'title': 'Tên người đặt',
                'width': '150px',
                'checked': true

            },
            {
                'field': 'contactNumber',
                'title': 'Số điện thoại',
                'width': '150px',
                'checked': true
            },
            {
                'field': 'city',
                'title': 'Địa chỉ',
                'width': '100px',
                'checked': true
            },
            {
                'field': 'vehicleType',
                'title': 'Loại xe',
                'width': '150px',
                'checked': true
            },
            {
                'field': 'vehicleNumber',
                'title': 'Biển số xe',
                'width': '150px',
                'checked': true
            }
            ,

            {
                'field': 'insurance',
                'title': 'Bảo hiểm',
                'width': '150px',
                'checked': true
            },
            {
                'field': 'status',
                'title': 'Trạng thái đặt chuyến',
                'width': '200px',
                'checked': true
            }]
        setSelected(selected)
    }, [])

    return (
        <div style={{ 'background-color': 'white', 'color': 'black', display: `${props.tab.open}` }}>
            <button id='all'
                // disabled={this.state.disabled}
                className="btn btn-success mt-1 mb-1"
            // onClick={this.clickAll}
            >
                <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                                Chọn tất</button>
            {/* <div >Có {this.state.checked}/9 loại được chọn hiển thị</div> */}
            <div >Có 1/9 loại được chọn hiển thị</div>

            <GridList cellHeight={50} cols={6} >
                {selected.map(e => {
                    return <GridListTile key={e.field}>
                        <div >
                            <Checkbox
                                style={{ color: '#fc424a' }}
                                id={e.field}
                                checked={e.checked}
                            // onClick={this.clickAll} 
                            />
                            {e.title}
                        </div>
                    </GridListTile>
                })}
            </GridList>
        </div>
    );
}

function Create(props) {
    const { children, value, index, ...other } = props;
    if (props.tab.index === 1)
        return (
            <div>
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>

            </div>
        );
    else
        return <div></div>
}
class TabPanelBooking extends Component {
    state = {
        selectedBooking: this.props.state.selectedBooking,
        bookColumn: [
            {
                'field': 'fee',
                'title': 'Chi phí',
                'width': '100px',
            },
            {
                'field': 'time',
                'title': 'Thời gian',
                'width': '100px',
            },
            {
                'field': 'vehicleType',
                'title': 'Loại xe',
                'width': '100px',
            },
            {
                'field': 'weight',
                'title': 'Tải trọng',
                'width': '100px',
            },
            {
                'field': 'goods',
                'title': 'Loại hàng hóa',
                'width': '100px',
            },
            {
                'field': 'cargoWeight',
                'title': 'Khối lượng hàng',
                'width': '100px',
            },
            {
                'field': 'receiveAddress',
                'title': 'Địa chỉ nhận',
                'width': '100px',
            },
            {
                'field': 'sendAddress',
                'title': 'Địa chỉ giao',
                'width': '100px',
            },

        ],
        vehicleType: [
            'Xe tải nhỏ', 'Xe tải to', 'Xe ABC', 'Xe XYZ'
        ],
        vehicle: '',
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
        time: '',
        date: '',
        checked: this.props.state.checkedBooking,
        disabled: this.props.state.disabledBooking,
        open: true,
        tab: {
            index: '',
            open: 'none'
        }
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
    clickAll = (event) => {
        if (event.nativeEvent.target.id === 'all') {
            this.setState({
                selectedBooking: [
                    ...this.state.selectedBooking.map(e => {
                        e.checked = true
                        return e
                    })
                ],
                checked: 9,
                disabled: true
            })
            this.props.dispatch(action('CHANGE_CHECKED', 9))
        } else {
            let checked = this.state.checked
            this.setState({
                selectedBooking: [
                    ...this.state.selectedBooking.map(e => {
                        if (e.field === event.nativeEvent.target.id) {
                            if (e.checked === true) {
                                e.checked = false
                                checked -= 1
                            } else {
                                e.checked = true
                                checked += 1
                            }
                        }
                        return e
                    })
                ],
                checked: checked
            })
            if (checked === 9) {
                this.setState({
                    disabled: true
                })
            }
            else {
                this.setState({
                    disabled: false
                })
            }
            this.props.dispatch(action('CHANGE_CHECKED', checked))
        }
        this.props.checked()
    }
    handleClose = (e) => {
        // this.props.dispatch(action('CHANGE_DIALOG', false))
        this.setState({
            open: false
        })
    }
    handleChange = (event, newValue) => {
        if (newValue === 0)
            if (this.state.tab.open === 'none')
                this.setState({
                    tab: {
                        index: newValue,
                        open: 'inline'
                    }
                })
            else
                this.setState({
                    tab: {
                        index: newValue,
                        open: 'none'
                    }
                })
        else
            this.setState({
                tab: {
                    index: newValue,
                    open: this.state.tab.open
                }
            })
    };
    render() {
        return (
            <Plugin>
                <Template name="toolbarContent" >
                    <div style={{ width: '80rem', borderStyle: 'none' }}>
                        <AppBar position="static" className='rounded-top' style={{
                            background: 'white', color: 'black',
                            borderStyle: 'none', boxShadow: 'none',
                        }}>
                            <Tabs
                                style={{ background: 'white' }}
                                value={this.state.tab}
                                onChange={this.handleChange} >
                                <Tab style={{ opacity: 1, textAlign: 'center' }} label={<div>
                                    <span>Hiển thị</span>
                                </div>} />
                                <Tab
                                    style={{ opacity: 1 }} label={<div>
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
                                            <span>Tạo mới</span>
                                        </button>
                                    </div>}
                                />
                            </Tabs>
                        </AppBar>
                        <Show value={this.state.tab} tab={this.state.tab}>
                            Item One
                        </Show >
                        <Create value={this.state.tab} tab={this.state.tab}>
                            Item Two
                        </Create>
                    </div>
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
export default connect(select)(TabPanelBooking);