import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog, TextField, Slider, Grow
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Condition from '../../models/Condition';
import OrderService from '../../services/OrderService';
import { faPlusSquare, faAllergies, faEye, faMinusSquare, faTimes } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddressService from '../../services/AddressService';
import { makeStyles } from '@material-ui/core/styles';
let pageSize = 10
let pages = [1, pageSize, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)
let addressService = new AddressService()
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
function DialogCreateOrder(event) {
    let [open, setOpen] = useState(false)
    let [address, setAddress] = useState([])
    let [good, setGood] = useState([])
    let [temperature, setTemperature] = useState([])
    let [listAddress, setListAddress] = useState([])
    let [addressType, setAddressType] = useState([
        'Nơi nhận', 'Nơi giao'
    ])
    let [markTemperature, setMarkTemperature] = useState([
        {
            value: 100,
            label: '100kg',
        }
    ])

    const classes = useStyles()
    let getItem = (id, array) => {
        if (id === undefined)
            return {}
        let a = array.filter(e => e.id === id)[0]
        return a
    }
    useEffect(() => {
        address = [
            {
                button: true
            }
        ]
        good = [
            {
                name: 'Hải sản',
                weight: 100,
                button: false
            },
            {
                button: true
            }
        ]
        temperature = [
            {
                name: 'N1',
                down: 10,
                up: 20,
                button: false
            },
            {
                button: true
            }
        ]
        addressService.search(condition)
            .then(value => {
                listAddress = value.result
            })
            .finally(() => {
                setListAddress(listAddress)
                setAddress(address)
                setGood(good)
                setTemperature(temperature)
                setOpen(event.create.open)
            })
    }, [event.create.open])
    let addAddress = () => {
        address = address.map(e => {
            if (e.button === true)
                return {
                    name: '',
                    type: '',
                    eta: '',
                    button: false
                }
            return e
        })
        address.push({
            button: true
        })
        setAddress(address)
    }
    let confirm = () => {
        console.log('aaa');
    }
    let cancel = () => {
        event.cancel('CREATE_Order')
    }
    let changeName = (e) => {
        console.log('aaa');
    }
    let changeLocation = (e) => {
        console.log('aaa');
    }
    let changeTemperature = (e, value) => {
        setMarkTemperature([{
            value: value,
            label: value + 'kg',
        }])
    }

    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}
        >

            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Thêm mới
            </DialogTitle>
            <DialogContent style={{ height: '50rem', width: '110rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Tên đơn hàng</div>
                        <TextField
                            name="name" title='Tên' onChange={changeName} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tổng khối lượng</div>
                        <TextField
                            name="username" title='Tên' onChange={changeLocation} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Thể tích xe yêu cầu</div>
                        <TextField
                            name="name" title='Tên' onChange={changeName} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tải trọng xe yêu cầu</div>
                        <TextField
                            name="username" title='Tên' onChange={changeLocation} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Cước trần</div>
                        <TextField
                            name="name" title='Tên' onChange={changeName} />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={6}>
                        <div>Nơi nhận hàng</div>
                        {address.map(e => {
                            if (e.button === true)
                                return <button
                                    style={{
                                        textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                                        color: 'white', width: '10rem', borderRadius: '5px', marginTop: '5px'
                                    }}
                                    onClick={addAddress}
                                >
                                    <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                            + Thêm địa chỉ
                            </button>
                            else {
                                return <div>
                                    <TextField style={{ width: '10rem', }}
                                        name="name" title='Tên' placeholder='Tên' />
                                   -
                                    <TextField style={{ width: '15rem', }}
                                        name="name" title='Tên' placeholder='Vị trí' />
                                    -
                                    <TextField
                                        style={{ width: '14rem', }}
                                        id="datetime-local"
                                        type="datetime-local"
                                        placeholder='Thời gian'
                                        className={classes.textField}

                                    />

                                        -<Autocomplete
                                        // onChange={changeParent}
                                        defaultValue={e}
                                        options={addressType}
                                        getOptionLabel={option => option}
                                        style={{ width: '8rem', display: 'inline-block' }}
                                        renderInput={(params) => <TextField placeholder='Loại' {...params} />}
                                    />
                                    <button
                                        style={{
                                            outlineStyle: 'none', border: 'none',
                                            color: 'red', borderRadius: '5px'
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} className='mr-3' />
                                    </button>
                                </div>

                            }
                        })}
                    </Grid>
                    <Grid item xs={3}>
                        <div>Chi tiết hàng</div>
                        {good.map(e => {
                            if (e.button === true)
                                return <button
                                    style={{
                                        textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                                        color: 'white', width: '9rem', borderRadius: '5px', marginTop: '5px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlusSquare}/>
                        + Thêm hàng
                        </button>
                            else
                                return <div>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <TextField style={{ width: '8rem', }}
                                                name="name" title='Tên' placeholder='Tên' />
                                        </Grid>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={5}>
                                            <Slider
                                                onChange={changeTemperature}
                                                style={{ width: '10rem', }}
                                                max={100}
                                                defaultValue={100}
                                                step={10}
                                                marks={markTemperature}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <button style={{ outlineStyle: 'none', border: 'none', color: 'red' }}>
                                                <FontAwesomeIcon icon={faTimes}/>
                                            </button>
                                        </Grid>
                                    </Grid>



                                    {/* <TextField style={{ width: '8rem', }}
                                        name="name" title='Tên' placeholder='Khối lượng' /> */}

                                </div>
                        })}
                    </Grid>
                    <Grid item xs={3}>
                        <div>Nhiệt độ yêu cầu</div>
                        {temperature.map(e => {
                            if (e.button === true)
                                return <button
                                    style={{
                                        textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                                        color: 'white', width: '10rem', borderRadius: '5px', marginTop: '5px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                        + Thêm nhiệt độ
                        </button>
                            else
                                return (
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <TextField style={{ width: '5rem', }}
                                                name="name" title='Tên' placeholder='Tên' />
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                onChange={changeTemperature}
                                                style={{ width: '5rem', }}
                                                max={100}
                                                defaultValue={100}
                                                step={10}
                                                marks={markTemperature}
                                            />
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={3}>
                                            <Slider
                                                onChange={changeTemperature}
                                                style={{ width: '5rem', }}
                                                max={100}
                                                defaultValue={100}
                                                step={10}
                                                marks={markTemperature}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <button style={{ outlineStyle: 'none', border: 'none', color: 'red' }}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </Grid>
                                    </Grid>
                                )




                            // <div>
                            //     <TextField style={{ width: '5rem' }} name="name" title='Tên' placeholder='Tên' />từ
                            // <TextField style={{ width: '7rem' }} name="name" title='Tên' placeholder='Ngưỡng dưới' /> đến
                            // <TextField style={{ width: '7rem' }} name="name" title='Tên' placeholder='Ngưỡng trên' />
                            //     <button
                            //         style={{
                            //             outlineStyle: 'none', border: 'none',
                            //             color: 'red', borderRadius: '5px'
                            //         }}
                            //     >
                            //         <FontAwesomeIcon icon={faTimes} className='mr-3' />
                            //     </button>
                            // </div>
                        })}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">
                    Hủy
                </Button>
                <Button onClick={confirm} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}
function DialogEditOrder(event) {
    let [open, setOpen] = useState(false)
    let [Order, setOrder] = useState({})
    let [type, setType] = useState([])
    let [parent, setParent] = useState([])
    let getItem = (id, array) => {
        if (id === undefined)
            return {}
        let a = array.filter(e => e.id === id)[0]
        return a
    }
    useEffect(() => {
        if (event.data.open === true) {
            OrderService.findById(event.data.id)
                .then(value => {
                    Order = value.result
                    return OrderService.search(condition)
                })
                .then(value => {
                    parent = value.result
                })
                .finally(() => {
                    setOrder(Order)
                    setParent(parent)
                    setType(type)
                    setOpen(true)
                })
            type = [
                { id: 0, name: 'Tỉnh' },
                { id: 1, name: 'Huyện' },
                { id: 2, name: 'Xã' }
            ]
        }
        else
            setOpen(false)
    }, [event.data.open])
    let confirm = () => {
        OrderService.update(Order.id, Order).then(value => {
            event.confirm('UPDATE_Order_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('UPDATE_Order')
    }
    let changeName = (e) => {
        Order.name = e.target.value
    }
    let changeLocation = (e) => {
        Order.location = e.target.value
    }
    let changeType = (e, value) => {
        if (value != null)
            Order.type = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            Order.parentId = value.id
    }

    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Thêm mới
                </DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Tên địa chỉ</div>
                        <Input
                            defaultValue={Order.name} title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vị trí</div>
                        <Input
                            defaultValue={Order.location} title='Tên' onChange={changeLocation}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Địa chỉ cha</div>
                        <Autocomplete
                            defaultValue={getItem(Order.parentId, parent)}
                            onChange={changeParent}
                            options={parent}
                            getOptionLabel={option => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Loại</div>
                        <Autocomplete
                            defaultValue={getItem(Order.type, type)}
                            onChange={changeType}
                            options={type}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">
                    Hủy
                    </Button>
                <Button onClick={confirm} color="primary">
                    Xác nhận
                    </Button>
            </DialogActions>
        </Dialog>
    )
}
function AlertCustom(event) {
    return (<Snackbar open={event.data.open} autoHideDuration={3000}
        onClose={event.close}
    >
        <Alert
            style={{ background: '#00d25b', color: 'white' }}
            onClose={event.close}
            severity={event.data.severity}>
            {event.data.message}
        </Alert>
    </Snackbar>)
}
export { DialogCreateOrder, DialogEditOrder, AlertCustom }