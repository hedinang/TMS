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
                    <Autocomplete
                        defaultValue={''}
                        onChange={changeBid}
                        options={bid}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '13rem' }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={2} />
            </>
        case 1:
            return <>
                <Grid item xs={2}>
                    <div>Nhóm thầu</div>
                    <Autocomplete
                        defaultValue={''}
                        onChange={changeBidGroup}
                        options={bidGroup}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '13rem' }}
                        renderInput={(params) => <TextField {...params} />}
                    />
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
    let addPickGood = () => {
        props.changeOrder(props.id, 'addPickGood', 'none')
    }
    let addDropGood = () => {
        props.changeOrder(props.id, 'addDropGood', 'none')
    }
    let closeOrderItem = () => {
        props.changeOrder(props.id, 'closeOrderItem', 'none')
    }
    let closeGood = (id, type) => {
        switch (type) {
            case 'pick':
                props.changeOrder(props.id, 'closePickGood', id)
                break;
            case 'drop':
                props.changeOrder(props.id, 'closeDropGood', id)
                break;
            default:
                break;
        }
    }
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
                <Grid item >COD</Grid>
                <Grid item ><Checkbox
                    value={props.data.cod}
                    onChange={
                        (event, value) => {
                            props.changeOrder(props.id, 'cod', value)
                        }
                    }
                /></Grid>
            </Grid>
            <Grid item xs={4} >
                <div>Nơi lấy</div>
                <TextField
                    value={props.data.pickName}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'pickName', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Nhân viên giao</div>
                <TextField
                    value={props.data.pickPerson}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'pickPerson', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Vị trí lấy</div>
                <TextField
                    value={props.data.pickLocation}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'pickLocation', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Thời gian lấy</div>
                <TextField
                    value={props.data.pickEta}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'pickEta', event.target.value)
                        }
                    }
                    id="datetime-local"
                    type="datetime-local"
                />
            </Grid>
            <Grid item xs={4} >
                <div>Nơi trả</div>
                <TextField
                    value={props.data.dropName}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'dropName', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Nhân viên nhận</div>
                <TextField
                    value={props.data.dropPerson}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'dropPerson', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Vị trí trả</div>
                <TextField
                    value={props.data.dropLocation}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'dropLocation', event.target.value)
                        }
                    } />
            </Grid>
            <Grid item xs={4} >
                <div>Thời gian trả</div>
                <TextField
                    value={props.data.dropEta}
                    onChange={
                        event => {
                            props.changeOrder(props.id, 'dropEta', event.target.value)
                        }
                    }
                    id="datetime-local"
                    type="datetime-local"
                />
            </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} >
            <Grid item xs={6} style={{ borderLeft: '2px solid #c1c1c1', borderRight: '2px solid #c1c1c1' }}>
                <Grid style={{ marginTop: '1rem' }}>
                    {props.data.pickGood.map(e => {
                        return <Grid item xs={12} container spacing={4}>
                            <Grid item xs={4} >
                                <div>Tên hàng</div>
                                <TextField value={e.name}
                                    onChange={event => {
                                        props.data.pickGood[e.id].name = event.target.value
                                        props.changeOrder(props.id, 'pickGood', props.data.pickGood)
                                    }} />
                            </Grid>
                            <Grid item xs={4} >
                                <div>Khối lượng</div>
                                <TextField value={e.weight}
                                    onChange={event => {
                                        props.data.pickGood[e.id].weight = parseInt(event.target.value)
                                        props.changeOrder(props.id, 'pickGood', props.data.pickGood)
                                    }} />
                            </Grid>
                            <Grid item xs={3} >
                                <div>Số gói</div>
                                <TextField value={e.pack}
                                    onChange={event => {
                                        props.data.pickGood[e.id].pack = parseInt(event.target.value)
                                        props.changeOrder(props.id, 'pickGood', props.data.pickGood)
                                    }} />
                            </Grid>
                            <Grid item xs={1}>
                                <button onClick={() => { closeGood(e.id, 'pick') }}
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
                            onClick={addPickGood}
                        >
                            <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                            + Hàng nhận
                            </button>
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={6}  >
                <Grid style={{ marginTop: '1rem' }}>
                    {props.data.dropGood.map(e => {
                        return <Grid item xs={12} container spacing={4}>
                            <Grid item xs={4} >
                                <div>Tên hàng</div>
                                <TextField value={e.name}
                                    onChange={event => {
                                        props.data.dropGood[e.id].name = event.target.value
                                        props.changeOrder(props.id, 'dropGood', props.data.dropGood)
                                    }} />
                            </Grid>
                            <Grid item xs={4} >
                                <div>Khối lượng</div>
                                <TextField value={e.weight}
                                    onChange={event => {
                                        props.data.dropGood[e.id].weight = parseInt(event.target.value)
                                        props.changeOrder(props.id, 'dropGood', props.data.dropGood)
                                    }} />
                            </Grid>
                            <Grid item xs={3} >
                                <div>Số gói</div>
                                <TextField value={e.pack}
                                    onChange={event => {
                                        props.data.dropGood[e.id].pack = parseInt(event.target.value)
                                        props.changeOrder(props.id, 'dropGood', props.data.dropGood)
                                    }} />
                            </Grid>
                            <Grid item xs={1}>
                                <button onClick={() => { closeGood(e.id, 'drop') }}
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
                            onClick={addDropGood}
                        >
                            <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                            + Hàng trả
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
            cod: false,
            pickName: '',
            pickPerson: '',
            pickLocation: '',
            pickEta: '',
            pickGood: [],
            dropName: '',
            dropPerson: '',
            dropLocation: '',
            dropEta: '',
            dropGood: []
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
            case 'cod':
                order[getIndexById(order, id)].cod = value
                break;
            case 'pickName':
                order[getIndexById(order, id)].pickName = value
                break;
            case 'pickPerson':
                order[getIndexById(order, id)].pickPerson = value
                break;
            case 'pickLocation':
                order[getIndexById(order, id)].pickLocation = value
                break;
            case 'pickEta':
                order[getIndexById(order, id)].pickEta = value
                break;
            case 'pickGood':
                order[getIndexById(order, id)].pickGood = value
                break;
            case 'dropName':
                order[getIndexById(order, id)].dropName = value
                break;
            case 'dropPerson':
                order[getIndexById(order, id)].dropPerson = value
                break;
            case 'dropLocation':
                order[getIndexById(order, id)].dropLocation = value
                break;
            case 'dropEta':
                order[getIndexById(order, id)].dropEta = value
                break;
            case 'dropGood':
                order[getIndexById(order, id)].dropGood = value
                break;
            case 'addPickGood':
                tmp = order[getIndexById(order, id)].pickGood
                order[getIndexById(order, id)].pickGood.push({ id: tmp.length, name: '', weight: 0, pack: 0 })
                break
            case 'addDropGood':
                tmp = order[getIndexById(order, id)].dropGood
                order[getIndexById(order, id)].dropGood.push({ id: tmp.length, name: '', weight: 0, pack: 0 })
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
            case 'closePickGood':
                for (let e of order[id].pickGood) {
                    if (e.id !== value) {
                        e.id = i
                        array.push(e)
                        i += 1
                    }
                }
                order[id].pickGood = array
                break
            case 'closeDropGood':
                for (let e of order[id].dropGood) {
                    if (e.id !== value) {
                        e.id = i
                        array.push(e)
                        i += 1
                    }
                }
                order[id].dropGood = array
                break
            default:
                break;

        }
        setOrder([...order])
        if (key === 'closePickGood' || key === 'pickGood' || key === 'closeOrderItem') {
            weight = 0
            order.forEach(e => {
                e.pickGood.forEach(f => {
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
                Thêm mới
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
                        <div>Tổng khối lượng nhận từ các đơn(kg)</div>
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
                    <Grid item xs={2} container spacing={2}>
                        <Grid item >Ghép chuyến</Grid>
                        <Grid item ><Checkbox
                            onChange={changeCombine}
                        /></Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ float: 'left' }}>Xe trở về</div>
                        <Checkbox style={{ float: 'left' }}
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
    let [order, setOrder] = useState({})
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
            orderService.findById(event.data.id)
                .then(value => {
                    order = value.result
                    return orderService.search(condition)
                })
                .then(value => {
                    parent = value.result
                })
                .finally(() => {
                    setOrder(order)
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
        orderService.update(order.id, order).then(value => {
            event.confirm('UPDATE_ORDER_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        order.cancel('UPDATE_ORDER')
    }
    let changeName = (e) => {
        order.name = e.target.value
    }
    let changeLocation = (e) => {
        order.location = e.target.value
    }
    let changeType = (e, value) => {
        if (value != null)
            order.type = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            order.parentId = value.id
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
                            defaultValue={order.name} title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vị trí</div>
                        <Input
                            defaultValue={order.location} title='Tên' onChange={changeLocation}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Địa chỉ cha</div>
                        <Autocomplete
                            defaultValue={getItem(order.parentId, parent)}
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
                            defaultValue={getItem(order.type, type)}
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
export { DialogCreateTrip, DialogEditTrip, AlertCustom }