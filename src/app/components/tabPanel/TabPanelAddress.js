import React, { Component, useEffect, useState } from 'react';
import { FormElement } from '@progress/kendo-react-form'
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import { connect } from 'react-redux'
import { action } from '../../redux/actions/actions'
import { faAllergies, faEye, faPlusSquare, faInfoCircle, faTv } from '@fortawesome/fontawesome-free-solid'
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
import { DialogCreateAddress, AlertCustom } from '../dialog/DialogAddress';
import AddressService from '../../services/AddressService';
import Condition from '../../models/Condition';
let addressService = new AddressService()
let pages = [1, 10, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)
let Show = connect(select)(props => {
    let [selected, setSelected] = useState([])
    let [checked, setChecked] = useState(0)
    let [disabled, setDisabled] = useState(false)
    useEffect(() => {
        selected = props.state.selectedAddress
        selected.map(e => {
            if (e.checked)
                checked += 1
        })
        setSelected(selected)
        setChecked(checked)
        if (checked === selected.length) setDisabled(true)
    }, [])
    let clickAll = (event) => {
        if (event.target.id === 'all') {
            selected = selected.map(e => {
                e.checked = true
                return e
            })
            checked = selected.length
            setSelected(selected)
            setChecked(checked)

        }
        else {
            if (event.target.checked) {
                checked += 1
                selected = selected.map(e => {
                    if (e.field === event.target.id)
                        e.checked = true
                    return e
                })
            } else {
                checked -= 1
                selected = selected.map(e => {
                    if (e.field === event.target.id)
                        e.checked = false
                    return e
                })
            }

            setSelected(selected)
            setChecked(checked)
        }
        if (checked === selected.length)
            setDisabled(true)
        else
            setDisabled(false)
        props.dispatch(action('CHANGE_SELECTED_ADDRESS', selected))
        props.loadSelected()
    }
    return (
        <div style={{ 'background-color': 'white', 'color': 'black', display: `${props.tab.open}` }}>
            <button id='all' disabled={disabled}
                style={{
                    textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'auto',
                    color: 'white', textTransform: 'none', width: '6rem', borderRadius: '4px'
                }}
                onClick={clickAll}>
                <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                Chọn tất
            </button>
            <div >Có {checked}/{selected.length} loại được chọn hiển thị</div>
            {/* <div >Có 1/9 loại được chọn hiển thị</div> */}
            <GridList cellHeight={50} cols={6} >
                {selected.map(e => {
                    return <GridListTile key={e.field}>
                        <div >
                            <Checkbox
                                style={{ color: '#fc424a' }}
                                id={e.field}
                                checked={e.checked}
                                onClick={clickAll}
                            />
                            {e.title}
                        </div>
                    </GridListTile>
                })}
            </GridList>
        </div >
    );
})
function TabPanelAddress(props) {

    let [tab, setTab] = useState({
        index: 0,
        open: 'none'
    })
    let [alert, setAlert] = useState(
        {
            show: false,
            message: ''
        }
    )
    let [data, setData] = useState({
        open: false
    })
    let confirm = (event) => {
        setData({
            open: false
        })
        // switch (event) {
        //     case 'CREATE_USER_SUCCESS':
        //         setState({
        //             alert: {
        //                 show: true,
        //                 message: 'Thêm người dùng thành công'
        //             }
        //         })
        //         props.confirm(event)
        //         break;

        //     default:
        //         break;
        // }

    }
    let cancel = (event) => {
        switch (event) {
            case 'CREATE_ADDRESS':
                setData({
                    open: false
                })
                break;
            // case 'CREATE_USER':
            //     setState({
            //         tab: {
            //             index: 0,
            //             open: tab.open
            //         }
            //     })
            //     break;
            // case 'DELETE_USER':
            //     setState({
            //         delete: {
            //             show: false
            //         }
            //     })
            //     break;
            // case 'RESET_USER':
            //     setState({
            //         delete: {
            //             show: false
            //         }
            //     })
            //     break;
            // case 'CANCEL_USER_UPDATE':
            //     setState({
            //         edit: {
            //             open: false
            //         }
            //     })
            //     break;
            default:
                break;
        }
    }
    let close = (e) => {
        setAlert({
            open: false
        })
    }
    let handleChange = (event, newValue) => {
        if (newValue === 0)
            if (tab.open === 'none')
                setTab({
                    index: newValue,
                    open: 'inline'
                })
            else
                setTab({
                    index: newValue,
                    open: 'none'
                })
        else {
            setTab({
                index: newValue,
                open: tab.open
            })
            setData({
                open: true
            })
        }
    }

    let addItem = (event) => {
        setData({
            open: false
        })
        props.confirm('CREATE_ADDRESS_SUCCESS')
    }

    return (
        <Plugin>
            <Template name="toolbarContent" >
                <div style={{ width: '80rem', borderStyle: 'none' }}>
                    <AlertCustom data={alert} close={close} />
                    <AppBar position="static" className='rounded-top' style={{
                        background: 'white', color: 'black',
                        borderStyle: 'none', boxShadow: 'none',
                    }}>
                        <Tabs
                            style={{ background: 'white' }}
                            value={tab}
                            onChange={handleChange} >
                            <Tab style={{ opacity: 1, textAlign: 'center' }} label={<div>
                                <FontAwesomeIcon icon={faEye} className='mr-2' />
                                <span>Hiển thị</span>
                            </div>} />
                            <Tab style={{ opacity: 1 }} label={<div>
                                <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                                <span>Tạo mới</span>
                            </div>} />
                        </Tabs>
                    </AppBar>
                    <Show value={tab} tab={tab} loadSelected={props.loadSelected} />
                    <DialogCreateAddress create={data} confirm={addItem} cancel={cancel} />
                </div>
            </Template>
        </Plugin>
    )

}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TabPanelAddress)