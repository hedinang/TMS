import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog,
    TextField, Slider, Checkbox, List, ListItem, TextareaAutosize, Paper
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Condition from '../../models/Condition';
import OrderService from '../../services/OrderService';
import { faPlusSquare, faTimes } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TripService from '../../services/TripService';
import TruckGroupService from '../../services/TruckGroupService';
import CookieService from '../../services/CookieService';
import UserService from '../../services/UserService';
let pageSize = 10
let pages = [1, pageSize, 'id', 0]
let conditions = []
let condition = new Condition(pages, conditions)
let orderService = new OrderService()
let userService = new UserService()
let tripService = new TripService()
let truckGroupService = new TruckGroupService()
let cookieService = new CookieService()
let userId = parseInt(cookieService.read('userId'))
function TruckType(props) {
    let [temperature, setTempereature] = useState([
        {
            name: '0 ~ 5',
            key: 1
        },
        {
            name: '5 ~ 10',
            key: 2
        },
        {
            name: '10 ~ 15',
            key: 3
        }
    ])

    switch (props.truckType) {
        case 0:
            return <>
                <Grid item xs={2} />
            </>
        case 1:
            return <>
                <Grid item xs={2}>
                    <div>Nhiệt độ</div>
                    <Autocomplete
                        onChange={(e, value) => {
                            props.changeTemperature(value)
                        }}
                        defaultValue={temperature[0]}
                        options={temperature}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '13rem' }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
            </>
        default:
            return <>
                <Grid item xs={2} />
            </>
    }

}
function Bidding(props) {
    let [bidGroup, setBidGroup] = useState([])
    let [bid, setBid] = useState([])
    let [showBidGroup, setShowBidGroup] = useState([])
    useEffect(() => {
        conditions = [{
            key: 'userParent',
            value: 'userId',
            operation: 0
        }]
        condition = new Condition(pages, conditions)
        userService.getTrucker(new Condition(pages, [])).then(value => {
            bid = value.result.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                }
            })
        }).finally(() => {
            setBid(bid)
        })
        truckGroupService.search(condition).then(value => {
            let i = -1
            bidGroup = value.result.map(e => {
                i += 1
                return {
                    index: i,
                    id: e.id,
                    name: e.name,
                    value: e.truckers
                }
            })
        }).finally(() => {
            setBidGroup(bidGroup)
        })


    }, [props.bidType])
    let changeBid = (e, value) => {
        props.changeBid(value.id)
    }
    let changeBidGroup = (e, value) => {
        truckGroupService.findById(value.id).then(e => {
            showBidGroup = e.result.truckers
        }).finally(() => {
            setShowBidGroup(showBidGroup)
            props.changeBidGroup(value.id)
        })
    }
    switch (props.bidType) {
        case 0:
            return <>
                <Grid item xs={2}>
                    <div>Nhà thầu</div>
                    <div className='row'>
                        <Autocomplete
                            defaultValue={''}
                            onChange={changeBid}
                            options={bid}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                    </div>

                </Grid>
                <Grid item xs={2} />
            </>
        case 1:
            return <>
                <Grid item xs={2}>
                    <div>Nhóm thầu</div>
                    <div className='row'>
                        <Autocomplete
                            defaultValue={''}
                            onChange={changeBidGroup}
                            options={bidGroup}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                    </div>
                </Grid>
                <Grid item xs={2} >
                    <div>Danh sách nhà thầu</div>
                    <Paper style={{ maxHeight: '10rem', overflow: 'auto', maxWidth: '12rem' }} >
                        <List>
                            {
                                showBidGroup.map(e =>
                                    <ListItem>{e.truckName}</ListItem>
                                )
                            }
                        </List>
                    </Paper>
                </Grid>
            </>
        case 2:
            return <>
                <Grid item xs={2} />
                <Grid item xs={2} />
            </>
        default:
            return <></>;
    }
}
function OrderItem(props) {
    let addGood = () => {
        props.changeOrder(props.id, 'addGood', 'none')
    }

    let closeOrderItem = () => {
        props.changeOrder(props.id, 'closeOrderItem', 'none')
    }

    let [orderType, setOrderType] = useState([{ key: 0, name: 'Hàng nhận' },
    { key: 1, name: 'Hàng trả' }])

    return <Grid item xs={12} container spacing={2} style={{ border: '2px solid #c1c1c1', borderRadius: '5px', marginTop: '1rem' }}>
        <Grid item xs={6} container spacing={3} >
            <Grid item xs={4}>
                <button onClick={closeOrderItem}
                    style={{ outlineStyle: 'none', border: 'none', color: 'red' }}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </Grid>
            <Grid item xs={4} >
                <div>Tên đơn hàng</div>
                <TextField
                    value={props.data.name}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'name', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} container spacing={2}>
                <Grid item >
                    <div>
                        Loại đơn hàng
                    </div>
                    <Autocomplete
                        value={orderType[props.data.type]}
                        onChange={
                            (event, value) => {
                                props.changeOrder(props.id, 'type', value.key)
                            }
                        }
                        style={{ width: '10rem' }}
                        options={orderType}
                        getOptionLabel={option => option.name}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item >
                    <div>
                        COD
                    </div>
                    <Checkbox
                        value={props.data.cod}
                        onChange={
                            (event, value) => {
                                props.changeOrder(props.id, 'cod', value)
                            }
                        }
                    />
                </Grid>
            </Grid>
            <Grid item xs={4} >
                <div>Địa điểm</div>
                <TextField
                    value={props.data.location}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'location', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Người giao nhận</div>
                <TextField
                    value={props.data.person}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'person', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Thời gian</div>
                <TextField
                    value={props.data.eta}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'eta', event.target.value)
                        }
                    }
                    id="datetime-local"
                    type="datetime-local"
                />
            </Grid>
        </Grid>
        <Grid item xs={6} >
            <Grid>
                <Grid style={{ marginTop: '1rem' }}>
                    {props.data.good.map(e => {
                        return <Grid item xs={12} container spacing={4}>
                            <Grid item xs={4} >
                                <div>Tên hàng</div>
                                <TextField value={e.name}
                                    onChange={event => {
                                        props.data.good[e.id].name = event.target.value
                                        props.changeOrder(props.id, 'good', props.data.good)
                                    }} />
                            </Grid>
                            <Grid item xs={4} >
                                <div>Khối lượng</div>
                                <TextField value={e.weight}
                                    onChange={event => {
                                        props.data.good[e.id].weight = parseInt(event.target.value)
                                        props.changeOrder(props.id, 'good', props.data.good)
                                    }} />
                            </Grid>
                            <Grid item xs={3} >
                                <div>Số gói</div>
                                <TextField value={e.pack}
                                    onChange={event => {
                                        props.data.good[e.id].pack = parseInt(event.target.value)
                                        props.changeOrder(props.id, 'good', props.data.good)
                                    }} />
                            </Grid>
                            <Grid item xs={1}>
                                <button onClick={() => { props.changeOrder(props.id, 'closeGood', e.id) }}
                                    style={{ outlineStyle: 'none', border: 'none', color: 'red' }}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </Grid>
                        </Grid>
                    })}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
function DialogCreateTrip(event) {
    let [open, setOpen] = useState(false)
    let [good, setGood] = useState([])
    let [name, setName] = useState('')
    let [openBid, setOpenBid] = useState()
    let [closeBid, setCloseBid] = useState()
    let [weight, setWeight] = useState(0)
    let [volumn, setVolumn] = useState([{
        label: '0m3',
        value: 0
    }])
    let [weightRequire, setWeightRequire] = useState([{
        label: '0kg',
        value: 0
    }])
    let [maxFee, setMaxFee] = useState([{
        label: '0 triệu đồng',
        value: 0
    }])
    let [isReturn, setIsReturn] = useState(false)
    let [isCombine, setIsCombine] = useState(false)
    let [bidType, setBidType] = useState({
        list: [
            { key: 0, name: 'Chỉ định' },
            { key: 1, name: 'Mở trong nhóm' },
            { key: 2, name: 'Mở công khai' },
        ],
        value: 0
    })
    let [bidGroup, setBidGroup] = useState(0)
    let [bid, setBid] = useState(0)
    // [{
    //     name: 'Chỉnh sửa thông tin',
    //     color: '#0090e7'
    // },
    // {
    //     name: 'Chỉnh sửa nhà thầu',
    //     color: '#ff9900'
    // },
    // {
    //     name: 'Đóng thầu',
    //     color: '#fc424a'
    // }]
    let [bidStatus, setBidStatus] = useState({
        key: 0,
        name: 'Chỉnh sửa thông tin',
        color: '#0090e7'
    })
    let [truckType, setTruckType] = useState({
        list: [
            { key: 0, name: 'Thường' },
            { key: 1, name: 'Lạnh' },
            { key: 2, name: 'Container' },
        ],
        value: 0
    })
    let [temperature, setTemperature] = useState({ key: 0, name: 'Thường' })
    let [order, setOrder] = useState([])
    let [note, setNote] = useState('')
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

        setMaxFee([{
            label: '0 triệu đồng',
            value: 0
        }])
        setIsReturn(false)
        setIsCombine(false)
        setOrder([])
        setOpen(event.create.open)
    }, [event.create.open])
    let addOrder = () => {
        order.push({
            id: order.length,
            name: '',
            type: 0,
            cod: false,
            person: '',
            location: '',
            eta: '',
            good: [],
        })
        order = [...order]
        setOrder(order)
    }
    let confirm = () => {
        let tripRequest = {
            userId: userId,
            name: name,
            openBid: openBid,
            closeBid: closeBid,
            weight: weight,
            volumeRequire: volumn[0].value,
            weightRequire: weightRequire[0].value,
            truckType: truckType.value,
            temperature: temperature.key,
            isCombine: isCombine,
            isReturn: isReturn,
            maxFee: maxFee[0].value,
            bidType: bidType.value,
            bidId: bid,
            bidGroup: bidGroup,
            bidStatus: bidStatus.key,
            truckType: truckType.value,
            note: note,
            listOrderDetailRequests: order
        }
        tripService.create(tripRequest).then(value => {
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
        bidStatus = {
            key: 0,
            name: 'Chỉnh sửa thông tin',
            color: '#0090e7'
        }
        setBidStatus(bidStatus)
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

    let changeMaxFee = (e, value) => {
        maxFee = [{
            label: value + ' triệu đồng',
            value: value
        }]
        setMaxFee(maxFee)
    }


    let changeBidGroup = (e) => {
        setBidGroup(e)
    }
    let changeBid = e => {
        setBid(e)
    }
    let changeNote = e => {
        setNote(e.target.value)
    }

    let changeReturn = (e, value) => {
        setIsReturn(value)
    }
    let changeCombine = (e, value) => {
        setIsCombine(value)
    }
    let changeBidType = (e, value) => {
        bidType.value = value.key
        setBidType({ ...bidType })
    }
    let changeTruckType = (e, value) => {
        truckType.value = value.key
        if (value.key === 0) setTemperature({ key: 0, name: 'Thường' })
        else setTemperature({ name: '0 ~ 5', key: 1 })
        setTruckType({ ...truckType })
    }
    let changeTemperature = (value) => {
        setTemperature(value)
    }
    let getIndexById = (list, id) => {
        let i = 0
        let index = 0
        for (let e of list) {
            if (e.id === id) {
                index = i
                break
            }
            i += 1
        }
        return index
    }
    let changeOrder = (id, key, value) => {
        let tmp = 0
        let i = 0
        let array = []
        switch (key) {
            case 'name':
                order[getIndexById(order, id)].name = value
                break;
            case 'type':
                order[getIndexById(order, id)].type = value
                break;
            case 'cod':
                order[getIndexById(order, id)].cod = value
                break;
            case 'person':
                order[getIndexById(order, id)].person = value
                break;
            case 'location':
                order[getIndexById(order, id)].location = value
                break;
            case 'eta':
                order[getIndexById(order, id)].eta = value
                break;
            case 'good':
                order[getIndexById(order, id)].good = value
                break;
            case 'addGood':
                tmp = order[getIndexById(order, id)].good
                order[getIndexById(order, id)].good.push({ id: tmp.length, name: '', weight: 0, pack: 0 })
                break
            case 'closeOrderItem':
                for (let e of order) {
                    if (e.id !== id) {
                        e.id = i
                        array.push(e)
                        i += 1
                    }
                }
                order = array
                break;
            case 'closeGood':
                for (let e of order[id].good) {
                    if (e.id !== value) {
                        e.id = i
                        array.push(e)
                        i += 1
                    }
                }
                order[id].good = array
                break
            default:
                break;

        }
        setOrder([...order])
        if (key === 'closeGood' || key === 'good' || key === 'closeOrderItem' || key === 'type') {
            weight = 0
            order.forEach(e => {
                if (e.type === 0) e.good.forEach(f => {
                    weight += f.weight
                })
            })
            setWeight(weight)
        }
    }
    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ float: 'left' }}>  Thêm mới (</div>
                <div style={{ float: 'left', fontSize: '1rem', color: '#fc424a' }}>* là bắt buộc nhập</div>
                <div>)</div>
            </DialogTitle>
            <DialogContent style={{ height: '50rem', width: '110rem', maxWidth: 'none' }}>
                <Grid container >
                    <Grid item xs={2}>
                        <div>Tên chuyến hàng</div>
                        <div class="row">
                            <TextField style={{ float: 'left' }} value={name} onChange={changeName} />
                            <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                        </div>
                        <div class="row" style={{ color: '#fc424a', fontSize: '15px' }}>Lỗi ABC</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Tổng khối lượng từ các đơn nhận(kg)</div>
                        <TextField value={weight} InputProps={{ disableUnderline: true }} />
                    </Grid>
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
                        <div >Ghép chuyến</div>
                        <Checkbox
                            onChange={changeCombine}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div>Xe trở về</div>
                        <Checkbox
                            onChange={changeReturn}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <div>Trạng thái thầu</div>
                        <div style={{ color: bidStatus.color }}>{bidStatus.name}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Loại thầu</div>
                        <Autocomplete
                            defaultValue={bidType.list[0]}
                            onChange={changeBidType}
                            options={bidType.list}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div>Thời gian mở thầu</div>
                        <div className='row'>
                            <TextField
                                onChange={changeOpenBid}
                                value={openBid}
                                id="datetime-local"
                                type="datetime-local"
                            />
                            <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                        </div>
                        <div class="row" style={{ color: '#fc424a', fontSize: '15px' }}>Lỗi ABC</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Thời gian đóng thầu</div>
                        <div className='row'>
                            <TextField
                                onChange={changeCloseBid}
                                value={closeBid}
                                id="datetime-local"
                                type="datetime-local"
                            />
                            <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                        </div>
                        <div class="row" style={{ color: '#fc424a', fontSize: '15px' }}>Lỗi ABC</div>
                    </Grid>
                    <Bidding bidType={bidType.value} changeBidGroup={changeBidGroup} changeBid={changeBid} />
                    <Grid item xs={2}>
                        <div>Loại xe</div>
                        <Autocomplete
                            defaultValue={truckType.list[0]}
                            onChange={changeTruckType}
                            options={truckType.list}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <TruckType truckType={truckType.value} changeTemperature={changeTemperature} />
                    <Grid item xs={4}>
                        <div>Ghi chú</div>
                        <TextareaAutosize onChange={changeNote} aria-label="minimum height" rowsMax={3} style={{ width: '30rem' }} />
                    </Grid>
                </Grid>
                <div style={{ textAlign: 'center' }}>Đơn hàng</div>
                <Grid style={{ marginTop: '2rem' }}>
                    {order.map(e => {
                        return <OrderItem changeOrder={changeOrder} id={e.id} data={e} />
                    })}
                    <Grid style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                style={{
                                    textAlign: 'center', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                                    color: 'white', width: '10rem', borderRadius: '5px', marginTop: '5px'
                                }}
                                onClick={addOrder}
                            >
                                <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                            + Thêm đơn
                            </button>
                        </div>
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
function DialogEditTrip(event) {
    let [open, setOpen] = useState(false)
    let [good, setGood] = useState([])
    let [name, setName] = useState('')
    let [openBid, setOpenBid] = useState()
    let [closeBid, setCloseBid] = useState()
    let [weight, setWeight] = useState(0)
    let [volumn, setVolumn] = useState([{
        label: '0m3',
        value: 0
    }])
    let [weightRequire, setWeightRequire] = useState([{
        label: '0kg',
        value: 0
    }])
    let [maxFee, setMaxFee] = useState([{
        label: '0 triệu đồng',
        value: 0
    }])
    let [isReturn, setIsReturn] = useState(false)
    let [isCombine, setIsCombine] = useState(false)
    let [bidType, setBidType] = useState({
        list: [
            { key: 0, name: 'Chỉ định' },
            { key: 1, name: 'Mở trong nhóm' },
            { key: 2, name: 'Mở công khai' },
        ],
        value: 0
    })
    let [bidGroup, setBidGroup] = useState(0)
    let [bid, setBid] = useState(0)
    // [{
    //     name: 'Chỉnh sửa thông tin',
    //     color: '#0090e7'
    // },
    // {
    //     name: 'Chỉnh sửa nhà thầu',
    //     color: '#ff9900'
    // },
    // {
    //     name: 'Đóng thầu',
    //     color: '#fc424a'
    // }]
    let [bidStatus, setBidStatus] = useState({
        key: 0,
        name: 'Chỉnh sửa thông tin',
        color: '#0090e7'
    })
    let [truckType, setTruckType] = useState({
        list: [
            { key: 0, name: 'Thường' },
            { key: 1, name: 'Lạnh' },
            { key: 2, name: 'Container' },
        ],
        value: 0
    })
    let [temperature, setTemperature] = useState({ key: 0, name: 'Thường' })
    let [order, setOrder] = useState([])
    let [note, setNote] = useState('')
    useEffect(() => {
        if (event.edit.open === true)
            tripService.findById(event.edit.id)
                .then(value => {
                    let result = value.result
                    if (result.bidGroup !== null) setBidGroup(result.bidGroup)
                    if (result.bidId !== null) setBid(result.bidId)
                    if (result.bidStatus !== null) setBidStatus(result.bidStatus)
                    if (result.bidType !== null) setBidType({
                        list: [
                            { key: 0, name: 'Chỉ định' },
                            { key: 1, name: 'Mở trong nhóm' },
                            { key: 2, name: 'Mở công khai' },
                        ],
                        value: result.bidType
                    })
                    if (result.closeBid !== null) setCloseBid(new Date(result.closeBid))
                    if (result.isCombine !== null) setIsCombine(result.isCombine)
                    if (result.isReturn !== null) setIsReturn(result.isReturn)
                    if (result.maxFee !== null) setMaxFee([{
                        label: '0 triệu đồng',
                        value: result.maxFee
                    }])
                    if (result.openBid !== null) setOpenBid(new Date(result.openBid))
                    if (result.temperature !== null) setTemperature({ key: result.temperature, name: 'Thường' })
                    if (result.truckType !== null) setTruckType({
                        list: [
                            { key: 0, name: 'Thường' },
                            { key: 1, name: 'Lạnh' },
                            { key: 2, name: 'Container' },
                        ],
                        value: result.truckType
                    })
                    if (result.volumeRequire !== null) setVolumn([{
                        label: result.volumeRequire + 'm3',
                        value: result.volumeRequire
                    }])
                    if (result.weight !== null) setWeight(result.weight)
                    if (result.weightRequire !== null) setWeightRequire([{
                        label: result.weightRequire + 'kg',
                        value: result.weightRequire
                    }])
                    return orderService.find([{ key: 'tripId', value: event.edit.id, operation: 0 }])
                }).then(value => {
                    let result = value.result
                    result.forEach(e => order.push({
                        id: e.id,
                        name: e.name,
                        type: e.type,
                        cod: e.cod,
                        person: e.person,
                        location: e.location,
                        eta: e.eta,
                        good: e.good,
                    }))
                    order = [...order]
                    setOrder(order)
                    console.log('aaa');
                }).catch(error => {
                    console.log('aa');
                })
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

        setMaxFee([{
            label: '0 triệu đồng',
            value: 0
        }])
        setIsReturn(false)
        setIsCombine(false)
        setOrder([])
        setOpen(event.edit.open)
    }, [event.edit.open])

    let addOrder = () => {
        order.push({
            id: order.length,
            name: '',
            type: 0,
            cod: false,
            person: '',
            location: '',
            eta: '',
            good: [],
        })
        order = [...order]
        setOrder(order)
    }
    let confirm = () => {
        let tripRequest = {
            userId: userId,
            name: name,
            openBid: openBid,
            closeBid: closeBid,
            weight: weight,
            volumeRequire: volumn[0].value,
            weightRequire: weightRequire[0].value,
            truckType: truckType.value,
            temperature: temperature.key,
            isCombine: isCombine,
            isReturn: isReturn,
            maxFee: maxFee[0].value,
            bidType: bidType.value,
            bidId: bid,
            bidGroup: bidGroup,
            bidStatus: bidStatus.key,
            truckType: truckType.value,
            note: note,
            listOrderDetailRequests: order
        }
        tripService.create(tripRequest).then(value => {
            event.confirm('CREATE_ORDER_SUCCESS')
        }).catch(error => {
            console.log('aa');
        })
        console.log('aaa');

    }
    let cancel = () => {
        event.cancel('EDIT_TRIP')
    }
    let changeName = (e) => {
        name = e.target.value
        setName(name)
    }
    let changeOpenBid = (e, value) => {
        openBid = e.target.value
        setOpenBid(openBid)
        bidStatus = {
            key: 0,
            name: 'Chỉnh sửa thông tin',
            color: '#0090e7'
        }
        setBidStatus(bidStatus)
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

    let changeMaxFee = (e, value) => {
        maxFee = [{
            label: value + ' triệu đồng',
            value: value
        }]
        setMaxFee(maxFee)
    }


    let changeBidGroup = (e) => {
        setBidGroup(e)
    }
    let changeBid = e => {
        setBid(e)
    }
    let changeNote = e => {
        setNote(e.target.value)
    }

    let changeReturn = (e, value) => {
        setIsReturn(value)
    }
    let changeCombine = (e, value) => {
        setIsCombine(value)
    }
    let changeBidType = (e, value) => {
        bidType.value = value.key
        setBidType({ ...bidType })
    }
    let changeTruckType = (e, value) => {
        truckType.value = value.key
        if (value.key === 0) setTemperature({ key: 0, name: 'Thường' })
        else setTemperature({ name: '0 ~ 5', key: 1 })
        setTruckType({ ...truckType })
    }
    let changeTemperature = (value) => {
        setTemperature(value)
    }
    let getIndexById = (list, id) => {
        let i = 0
        let index = 0
        for (let e of list) {
            if (e.id === id) {
                index = i
                break
            }
            i += 1
        }
        return index
    }
    let changeOrder = (id, key, value) => {
        let tmp = 0
        let i = 0
        let array = []
        switch (key) {
            case 'name':
                order[getIndexById(order, id)].name = value
                break;
            case 'type':
                order[getIndexById(order, id)].type = value
                break;
            case 'cod':
                order[getIndexById(order, id)].cod = value
                break;
            case 'person':
                order[getIndexById(order, id)].person = value
                break;
            case 'location':
                order[getIndexById(order, id)].location = value
                break;
            case 'eta':
                order[getIndexById(order, id)].eta = value
                break;
            case 'good':
                order[getIndexById(order, id)].good = value
                break;
            case 'addGood':
                tmp = order[getIndexById(order, id)].good
                order[getIndexById(order, id)].good.push({ id: tmp.length, name: '', weight: 0, pack: 0 })
                break
            case 'closeOrderItem':
                for (let e of order) {
                    if (e.id !== id) {
                        e.id = i
                        array.push(e)
                        i += 1
                    }
                }
                order = array
                break;
            case 'closeGood':

                for (let e of order[getIndexById(order, id)].good) {
                    if (e.id !== value) {
                        e.id = i
                        array.push(e)
                        i += 1
                    }
                }
                order[id].good = array
                break
            default:
                break;

        }
        setOrder([...order])
        if (key === 'closeGood' || key === 'good' || key === 'closeOrderItem' || key === 'type') {
            weight = 0
            order.forEach(e => {
                if (e.type === 0) e.good.forEach(f => {
                    weight += f.weight
                })
            })
            setWeight(weight)
        }
    }
    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ float: 'left' }}>  Thêm mới (</div>
                <div style={{ float: 'left', fontSize: '1rem', color: '#fc424a' }}>* là bắt buộc nhập</div>
                <div>)</div>
            </DialogTitle>
            <DialogContent style={{ height: '50rem', width: '110rem', maxWidth: 'none' }}>
                <Grid container >
                    <Grid item xs={2}>
                        <div>Tên chuyến hàng</div>
                        <div class="row">
                            <TextField style={{ float: 'left' }} value={name} onChange={changeName} />
                            <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                        </div>
                        <div class="row" style={{ color: '#fc424a', fontSize: '15px' }}>Lỗi ABC</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Tổng khối lượng từ các đơn nhận(kg)</div>
                        <TextField value={weight} InputProps={{ disableUnderline: true }} />
                    </Grid>
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
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
                    <Grid item xs={2}>
                        <div >Ghép chuyến</div>
                        <Checkbox
                            onChange={changeCombine}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div>Xe trở về</div>
                        <Checkbox
                            onChange={changeReturn}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <div>Trạng thái thầu</div>
                        <div style={{ color: bidStatus.color }}>{bidStatus.name}</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Loại thầu</div>
                        <Autocomplete
                            defaultValue={bidType.list[0]}
                            onChange={changeBidType}
                            options={bidType.list}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div>Thời gian mở thầu</div>
                        <div className='row'>
                            <TextField
                                onChange={changeOpenBid}
                                value={openBid}
                                id="datetime-local"
                                type="datetime-local"
                            />
                            <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                        </div>
                        <div class="row" style={{ color: '#fc424a', fontSize: '15px' }}>Lỗi ABC</div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>Thời gian đóng thầu</div>
                        <div className='row'>
                            <TextField
                                onChange={changeCloseBid}
                                value={closeBid}
                                id="datetime-local"
                                type="datetime-local"
                            />
                            <div style={{ float: 'left', fontSize: '2rem', color: '#fc424a' }}>*</div>
                        </div>
                        <div class="row" style={{ color: '#fc424a', fontSize: '15px' }}>Lỗi ABC</div>
                    </Grid>
                    <Bidding bidType={bidType.value} changeBidGroup={changeBidGroup} changeBid={changeBid} />
                    <Grid item xs={2}>
                        <div>Loại xe</div>
                        <Autocomplete
                            defaultValue={truckType.list[0]}
                            onChange={changeTruckType}
                            options={truckType.list}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <TruckType truckType={truckType.value} changeTemperature={changeTemperature} />
                    <Grid item xs={4}>
                        <div>Ghi chú</div>
                        <TextareaAutosize onChange={changeNote} aria-label="minimum height" rowsMax={3} style={{ width: '30rem' }} />
                    </Grid>
                </Grid>
                <div style={{ textAlign: 'center' }}>Đơn hàng</div>
                <Grid style={{ marginTop: '2rem' }}>
                    {order.map(e => {
                        return <OrderItem changeOrder={changeOrder} id={e.id} data={e} />
                    })}
                    <Grid style={{ marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                style={{
                                    textAlign: 'center', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                                    color: 'white', width: '10rem', borderRadius: '5px', marginTop: '5px'
                                }}
                                onClick={addOrder}
                            >
                                <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                            + Thêm đơn
                            </button>
                        </div>
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
function DialogBool(event) {
    let [title, setTitle] = useState('')
    let [open, setOpen] = useState(false)
    let [data, setData] = useState({ name: '' })
    useEffect(() => {
        if (event.data.open === true)
            tripService.findById(event.data.id).then(value => {
                data = value.result
                title = 'Bạn có chắc chắn xóa chuyến hàng ' + data.name + ' ?'

            }).finally(() => {
                setTitle(title)
                setData(data)
                setOpen(event.data.open)
            })
        else
            setOpen(event.data.open)
    }, [event.data.open])

    let cancel = e => {
        event.cancel('DELETE_TRIP')
    }
    let confirm = e => {
        tripService.delete(event.data.id).then(value => {
            event.confirm('DELETE_TRIP_SUCCESS')
        })
    }
    return (
        <Dialog open={open} onClose={cancel}>
            <DialogTitle>Cảnh báo</DialogTitle>
            <DialogContent >{title}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">Hủy</Button>
                <Button onClick={confirm} color="primary">Đồng ý</Button>
            </DialogActions>
        </Dialog>
    )
}
export { DialogCreateTrip, DialogEditTrip, AlertCustom, DialogBool }