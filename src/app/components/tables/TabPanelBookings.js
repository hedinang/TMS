import { Checkbox, GridList, GridListTile, Input, Slider, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { FormElement } from '@progress/kendo-react-form'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'

class TabPanelBookings extends Component {
    state = {
        selectedBookings: this.props.state.selectedBookings,
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
        disabled: this.props.state.disabledBooking

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
                selectedBookings: [
                    ...this.state.selectedBookings.map(e => {
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
                selectedBookings: [
                    ...this.state.selectedBookings.map(e => {
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
    render() {
        switch (this.props.id) {
            case 0:
                return (
                    <div style={{ 'background-color': 'white', 'color': 'black' }}>
                        <button id='all' disabled={this.state.disabled}
                            type="button" className="btn btn-success" onClick={this.clickAll}>Chọn tất</button>
                        <div >Có {this.state.checked}/9 loại được chọn hiển thị</div>
                        <GridList cellHeight={50} cols={6} >
                            {this.state.selectedBookings.map(e => {
                                return <GridListTile key={e.field}>
                                    <div >
                                        <Checkbox id={e.field}
                                            checked={e.checked}
                                            onClick={this.clickAll} />
                                        {e.title}
                                    </div>
                                </GridListTile>
                            })}
                        </GridList>
                    </div>)
            case 1:
                return (
                    <div style={{ 'background-color': 'white', 'color': 'black' }}>
                        <FormElement className='row'>
                            <div className="col-3 ">
                                <div>Chi phí</div>
                                <Input name="fee" title='Chi phí' ></Input>
                                <div>Loại xe</div>
                                <DropDownList id='vehicle' data={this.state.vehicleType} defaultValue={this.state.vehicle} onChange={this.changeVehicle}></DropDownList>
                                <div>
                                    <button id='clear' type="button" className="btn btn-success mr-2">Làm mới</button>
                                    <button id='submit' type="button" className="btn btn-success ml-2">Xác nhận</button>
                                </div>
                            </div>
                            <div className="col-3 ">
                                <div>Nơi nhận</div>
                                <Input name="receiveAddress"></Input>
                                <div>Nơi gửi</div>
                                <Input name="sendAddress"></Input>
                            </div>
                            <div className="col-3">
                                <div>Loại hàng hóa</div>
                                <DropDownList id='good' data={this.props.state.goodType} defaultValue={this.props.state.good} onChange={this.changeVehicle} ></DropDownList>
                                <div>Khối lượng hàng</div>
                                <Slider defaultValue={this.props.state.marks[0].value}
                                    onChange={this.handleSliderChange}
                                    marks={this.props.state.marks} />
                            </div>
                            <div className="col-3">
                                <div>Ngày</div>
                                <DateTimePicker />
                            </div>
                        </FormElement>
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
export default connect(select)(TabPanelBookings);