import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog, TextField, Slider, Checkbox
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Condition from '../../models/Condition';
import OrderService from '../../services/OrderService';
import { faPlusSquare, faTimes } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
let pageSize = 10
let pages = [1, pageSize, 'id', 0]
let conditions = []
let condition = new Condition(pages, conditions)
let orderService = new OrderService()
function DialogCreateOrder(event) {
    let [open, setOpen] = useState(false)
    let [good, setGood] = useState([])
    let [name, setName] = useState('')
    let [openBid, setOpenBid] = useState('')
    let [closeBid, setCloseBid] = useState('')
    let [weight, setWeight] = useState(0)
    let [volumn, setVolumn] = useState([{
        label: '0m3',
        value: 0
    }])
    let [weightRequire, setWeightRequire] = useState([{
        label: '0kg',
        value: 0
    }])
    let [startName, setStartName] = useState('')
    let [startLocation, setStartLocation] = useState('')
    let [startEta, setStartEta] = useState('')
    let [endName, setEndName] = useState('')
    let [endLocation, setEndLocation] = useState('')
    let [endEta, setEndEta] = useState('')
    let [maxFee, setMaxFee] = useState([{
        label: '0 triệu đồng',
        value: 0
    }])
    let [isReturn, setIsReturn] = useState(false)
    let [isCombine, setIsCombine] = useState(false)
    useEffect(() => {
        setName('')
        setOpenBid('')
        setCloseBid('')
        setVolumn([{
            label: '0m3',
            value: 0
        }])
        setWeightRequire([{
            label: '0kg',
            value: 0
        }])
        setStartName('')
        setStartLocation('')
        setStartEta('')
        setEndName('')
        setEndLocation('')
        setEndEta('')
        setMaxFee([{
            label: '0 triệu đồng',
            value: 0
        }])
        setIsReturn(false)
        setIsCombine(false)
        setGood([
            {
                button: true
            }
        ])
        setOpen(event.create.open)
    }, [event.create.open])
    let addGood = () => {
        let i = 0
        good = good.map(e => {
            if (e.button === true)
                return {
                    id: i,
                    name: '',
                    mark: [{
                        value: 0,
                        label: '0kg',
                    }],
                    down: [{
                        value: 0,
                        label: '0oC',
                    }]
                    ,
                    up: [{
                        value: 0,
                        label: '0oC',
                    }],
                    button: false
                }
            i += 1
            return e
        })
        good.push({
            button: true
        })
        setGood(good)
    }
    let confirm = () => {

        let goodRequest = []

        for (let i = 0; i < good.length - 1; i++) {
            goodRequest.push({
                name: good[i].name,
                weight: good[i].mark[0].value,
                down: good[i].down[0].value,
                up: good[i].up[0].value,
            })
        }
        let orderRequest = {
            name: name,
            openBid: openBid,
            closeBid: closeBid,
            startName: startName,
            startLocation: startLocation,
            startEta: startEta,
            endName: endName,
            endLocation: endLocation,
            endEta: endEta,
            good: goodRequest,
            weight: weight,
            volumeRequire: volumn[0].value,
            weightRequire: weightRequire[0].value,
            isCombine: isCombine,
            isReturn: isReturn,
            maxFee: maxFee[0].value,
        }
        orderService.create(orderRequest).then(value => {
            event.confirm('CREATE_ORDER_SUCCESS')
        }).catch(error => {
            console.log('aa');
        })
        console.log('aaa');

    }
    let cancel = () => {
        event.cancel('CREATE_Order')
    }
    let changeName = (e) => {
        name = e.target.value
        setName(name)
    }
    let changeOpenBid = (e, value) => {
        openBid = e.target.value
        setOpenBid(openBid)
    }
    let changeCloseBid = (e) => {
        closeBid = e.target.value
        setCloseBid(closeBid)
    }
    let changeVolumn = (e, value) => {
        volumn = [{
            label: value + 'm3',
            value: value
        }]
        setVolumn(volumn)
    }
    let changeWeightRequire = (e, value) => {
        weightRequire = [{
            label: value + 'kg',
            value: value
        }]
        setWeightRequire(weightRequire)
    }
    let changeStartName = (e) => {
        startName = e.target.value
        setStartName(startName)
    }
    let changeStartLocation = (e) => {
        startLocation = e.target.value
        setStartLocation(startLocation)
    }
    let changeStartEta = (e) => {
        startEta = e.target.value
        setStartEta(startEta)
    }
    let changeEndName = (e) => {
        endName = e.target.value
        setEndName(endName)
    }
    let changeEndLocation = (e) => {
        endLocation = e.target.value
        setEndLocation(endLocation)
    }
    let changeEndEta = (e) => {
        endEta = e.target.value
        setEndEta(endEta)
    }
    let changeMaxFee = (e, value) => {
        maxFee = [{
            label: value + ' triệu đồng',
            value: value
        }]
        setMaxFee(maxFee)
    }
    let changeDown = (value, id) => {
        good = good.map(e => {
            if (e.id === id) {
                return {
                    id: id,
                    name: e.name,
                    mark: e.mark,
                    down: [{
                        value: value,
                        label: value + 'oC',
                    }],
                    up: e.up,
                    button: false
                }
            }
            return e
        })
        setGood(good)
    }
    let changeUp = (value, id) => {
        good = good.map(e => {
            if (e.id === id) {
                return {
                    id: id,
                    name: e.name,
                    mark: e.mark,
                    down: e.down,
                    up: [{
                        value: value,
                        label: value + 'oC',
                    }],
                    button: false
                }
            }
            return e
        })
        setGood(good)
    }
    let changeWeight = (value, id) => {
        weight = 0
        good = good.map(e => {
            if (e.id === id) {
                weight += value
                return {
                    id: id,
                    name: e.name,
                    mark: [{
                        value: value,
                        label: value + 'kg',
                    }],
                    down: e.down,
                    up: e.up,
                    button: false
                }
            }
            if (e.button === false)
                weight += e.mark[0].value
            return e
        })
        setWeight(weight)
        setGood(good)
    }
    let changeGoodName = (value, id) => {
        good = good.map(e => {
            if (e.id === id) {
                return {
                    id: id,
                    name: value,
                    mark: e.mark,
                    down: e.down,
                    up: e.up,
                    button: false
                }
            }
            return e
        })
        setGood(good)
    }
    let changeReturn = (e) => {
        setIsReturn(!isReturn)
    }
    let changeCombine = (e) => {
        setIsCombine(!isCombine)
    }
    let removeGood = (id) => {
        let array = []
        for (let i = 0; i < good.length; i++) {
            if (good[i].id !== id) {
                good[i].id = i
                array.push(good[i])
            }
        }
        setGood(array)
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
                        <TextField value={name}
                            name="name" title='Tên' onChange={changeName} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Thời gian mở thầu</div>
                        <TextField
                            onChange={changeOpenBid}
                            value={openBid}
                            id="datetime-local"
                            type="datetime-local"

                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Thời gian đóng thầu</div>
                        <TextField
                            onChange={changeCloseBid}
                            value={closeBid}
                            id="datetime-local"
                            type="datetime-local"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tổng khối lượng(kg)</div>
                        <TextField
                            value={weight}
                            InputProps={{ disableUnderline: true }}
                            name="username" title='Tên' />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Thể tích xe yêu cầu</div>
                        <Slider
                            value={volumn[0].value}
                            onChange={changeVolumn}
                            style={{ width: '10rem', }}
                            max={100}
                            defaultValue={0}
                            step={10}
                            marks={volumn}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tải trọng xe yêu cầu</div>
                        <Slider
                            value={weightRequire[0].value}
                            onChange={changeWeightRequire}
                            style={{ width: '10rem', }}
                            max={100}
                            defaultValue={0}
                            step={10}
                            marks={weightRequire}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Nơi lấy</div>
                        <TextField value={startName}
                            name="name" title='Tên' onChange={changeStartName} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vị trí lấy</div>
                        <TextField value={startLocation}
                            name="username" title='Tên' onChange={changeStartLocation} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Thời gian lấy</div>
                        <TextField
                            value={startEta} onChange={changeStartEta}
                            id="datetime-local"
                            type="datetime-local"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Nơi trả</div>
                        <TextField value={endName}
                            name="name" title='Tên' onChange={changeEndName} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vị trí trả</div>
                        <TextField value={endLocation}
                            name="username" title='Tên' onChange={changeEndLocation} />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Thời gian trả</div>
                        <TextField
                            value={endEta} onChange={changeEndEta}
                            id="datetime-local"
                            type="datetime-local"
                        />
                    </Grid>
                    <Grid item xs={4} container spacing={2}>
                        <Grid item >Ghép chuyến</Grid>
                        <Grid item ><Checkbox checked={isReturn}
                            onClick={changeReturn}
                        /></Grid>


                    </Grid>
                    <Grid item xs={4}>
                        <div style={{ float: 'left' }}>Xe trở về</div>
                        <Checkbox style={{ float: 'left' }} value={isCombine}
                            onClick={changeCombine}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Cước trần</div>
                        <Slider
                            value={maxFee[0].value}
                            onChange={changeMaxFee}
                            style={{ width: '10rem', }}
                            max={100}
                            defaultValue={0}
                            step={1}
                            marks={maxFee}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '2rem' }}>
                    <Grid item xs={12} style={{ border: '2px solid #c1c1c1', borderRadius: '5px' }}>
                        <div style={{ textAlign: 'center' }}>Chi tiết hàng</div>
                        {good.map(e => {
                            if (e.button === true)
                                return <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        style={{
                                            textAlign: 'center', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                                            color: 'white', width: '10rem', borderRadius: '5px', marginTop: '5px'
                                        }}
                                        onClick={addGood}
                                    >
                                        <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                            + Thêm hàng
                            </button>
                                </div>
                            else {
                                return <div>
                                    <Grid container>
                                        <Grid item xs={1}>
                                            <TextField style={{ width: '16rem', }} value={e.name} onChange={(event, value) => {
                                                changeGoodName(event.target.value, e.id)
                                            }}
                                                name="name" title='Tên' placeholder='Tên' />
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={3} container spacing={2}>
                                            <Grid item>Khối lượng</Grid>
                                            <Grid item>
                                                <Slider
                                                    value={e.mark[0].value}
                                                    onChange={(event, value) => {
                                                        changeWeight(value, e.id)
                                                    }}
                                                    style={{ width: '10rem', }}
                                                    max={100}
                                                    defaultValue={100}
                                                    step={10}
                                                    marks={e.mark}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} container spacing={2}>
                                            <Grid item>Ngưỡng dưới</Grid>
                                            <Grid item>
                                                <Slider
                                                    value={e.down[0].value}
                                                    onChange={(event, value) => {
                                                        changeDown(value, e.id)
                                                    }}
                                                    style={{ width: '10rem', }}
                                                    max={100}
                                                    defaultValue={e.down[0].value}
                                                    step={10}
                                                    marks={e.down}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} container spacing={2}>
                                            <Grid item>Ngưỡng trên</Grid>
                                            <Grid item>
                                                <Slider
                                                    value={e.up[0].value}
                                                    onChange={(event, value) => {
                                                        changeUp(value, e.id)
                                                    }}
                                                    style={{ width: '10rem', }}
                                                    max={100}
                                                    defaultValue={e.up[0].value}
                                                    step={10}
                                                    marks={e.up}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <button onClick={() => {
                                                removeGood(e.id)
                                            }} style={{ outlineStyle: 'none', border: 'none', color: 'red' }}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </Grid>
                                    </Grid>
                                </div>
                            }
                        })}
                    </Grid>
                    {/* <Grid item xs={6} style={{ border: '2px solid #c1c1c1', borderRadius: '5px', borderLeft: 'none' }}>
                        <div style={{ textAlign: 'center' }}>Nhiệt độ yêu cầu</div>
                        {temperature.map(e => {
                            if (e.button === true)
                                return <button
                                    onClick={addTemperature}
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
                                            <TextField style={{ width: '5rem', }} value={e.name}
                                                name="name" title='Tên' placeholder='Tên' />
                                        </Grid>

                                        <Grid item xs={4} container spacing={2}>
                                            <Grid item>Ngưỡng dưới</Grid>
                                            <Grid item>
                                                <Slider
                                                    value={e.down[0].value}
                                                    onChange={(event, value) => {
                                                        changeDown(value, e.id)
                                                    }}
                                                    style={{ width: '8rem', }}
                                                    max={100}
                                                    defaultValue={e.down[0].value}
                                                    step={10}
                                                    marks={e.down}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={4} container spacing={2}>
                                            <Grid item>Ngưỡng trên</Grid>
                                            <Grid item>
                                                <Slider
                                                    value={e.up[0].value}
                                                    onChange={(event, value) => {
                                                        changeUp(value, e.id)
                                                    }}
                                                    style={{ width: '8rem', }}
                                                    max={100}
                                                    defaultValue={e.up[0].value}
                                                    step={10}
                                                    marks={e.up}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <button onClick={() => {
                                                removeTemperature(e.id)
                                            }}
                                                style={{ outlineStyle: 'none', border: 'none', color: 'red' }}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </Grid>
                                    </Grid>
                                )
                        })}
                    </Grid> */}
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
            event.confirm('UPDATE_ORDER_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('UPDATE_ORDER')
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