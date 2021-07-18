import React, { Component } from 'react';
import { FormElement } from '@progress/kendo-react-form'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'
import { faAllergies } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AppBar, Button, Tab, Tabs, DialogActions, DialogContent, Input, Slider, GridListTile, GridList,
    DialogContentText, DialogTitle, Dialog, Paper, Grid, Checkbox, MenuItem, Select
} from '@material-ui/core';
import TabCustome from '../shared/TabCustome'
class TabPanelAccount extends Component {
    state = {
        selectedAccount: this.props.state.selectedAccount,
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
        checked: this.props.state.checkedAccount,
        disabled: this.props.state.disabledAccount,
        open: true,

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
                selectedAccount: [
                    ...this.state.selectedAccount.map(e => {
                        e.checked = true
                        return e
                    })
                ],
                checked: 9,
                disabled: true
            })
            this.props.dispatch(action('CHANGE_CHECKED_ACCOUNT', 9))
        } else {
            let checked = this.state.checked
            this.setState({
                selectedAccount: [
                    ...this.state.selectedAccount.map(e => {
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
            this.props.dispatch(action('CHANGE_CHECKED_ACCOUNT', checked))
        }
        this.props.checked()
    }
    handleClose = (e) => {
        // this.props.dispatch(action('CHANGE_DIALOG', false))
        this.setState({
            open: false
        })
    }
    render() {
        switch (this.props.id) {
            case 0:
                return (
                    <div style={{ 'background-color': 'white', 'color': 'black' }}>
                        <button id='all' disabled={this.state.disabled}
                            className="btn btn-success mt-1 mb-1" onClick={this.clickAll}>
                            <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                                Chọn tất</button>
                        <div >Có {this.state.checked}/9 loại được chọn hiển thị</div>
                        <GridList cellHeight={50} cols={6} >
                            {this.state.selectedAccount.map(e => {
                                return <GridListTile key={e.field}>
                                    <div >
                                        <Checkbox
                                            style={{ color: '#fc424a' }}
                                            id={e.field}
                                            checked={e.checked}
                                            onClick={this.clickAll} />
                                        {e.title}
                                    </div>
                                </GridListTile>
                            })}
                        </GridList>
                    </div>)
            default:
                // this.props.addItem()
                return <div></div>
        }
    }
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TabPanelAccount);