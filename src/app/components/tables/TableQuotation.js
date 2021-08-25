import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faPencilAlt, faTrashAlt, faSearch, faMoneyBillAlt, faBoxOpen } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper, Typography } from '@material-ui/core';
import { IntegratedPaging, PagingState, DataTypeProvider, FilteringState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import { Grid, PagingPanel, Table, TableHeaderRow, TableFixedColumns, TableFilterRow } from '@devexpress/dx-react-grid-material-ui'
import Condition from '../../models/Condition';
import OrderService from '../../services/OrderService';
import TripService from '../../services/TripService';
import { DialogBool } from '../dialog/DialogBool';
import { AlertCustom } from '../dialog/DialogOrder';
import CookieService from '../../services/CookieService';
import QuotationService from '../../services/QuotationService';
let orderService = new OrderService()
let tripService = new TripService()
let quotationService = new QuotationService()
let cookieService = new CookieService()
let userId = parseInt(cookieService.read('userId'))
function TemperatureTable(props) {
    let [selectedTemperature, setSelectedTemperature] = useState([])
    let [temperature, setTemperature] = useState([])
    useEffect(() => {
        selectedTemperature = [
            {
                'name': 'name',
                'title': 'Tên',
            },
            {
                'name': 'down',
                'title': 'Ngưỡng dưới',
            },
            {
                'name': 'up',
                'title': 'Ngưỡng trên',
            }]
        setSelectedTemperature(selectedTemperature)
        if (props.orderId !== 0) {
            orderService.findById(props.orderId)
                .then(value => {
                    temperature = value.result.temperature.map(e => {
                        return {
                            name: e.name,
                            down: e.down,
                            up: e.up,
                        }
                    })
                })
                .catch(error => {
                    console.log('aaa');
                }).finally(() => {
                    setTemperature(temperature)
                })
        }
    }, [props.orderId])
    if (props.value === props.index)
        return (
            <div className='row'>
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={temperature}
                        columns={selectedTemperature}
                    >
                        <Table
                        // columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
                    </Grid>
                </Paper>

            </div>
        )
    else return <div></div>
}
function GoodTable(props) {
    let [selectedGood, setSelectedGood] = useState([])
    let [good, setGood] = useState([])
    let tableColumnExtensions = [
        { columnName: 'name', width: '8rem' },
        { columnName: 'weight', width: '8rem' },
        { columnName: 'down', width: '10rem' },
        { columnName: 'up', width: '8rem' }]
    let [title, setTitle] = useState(' ')
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
        { columnName: 'action', filteringEnabled: false },
    ]
    useEffect(() => {
        selectedGood = [
            {
                'name': 'name',
                'title': 'Tên',
            },
            {
                'name': 'weight',
                'title': 'Khối lượng(kg)',
            },
            {
                'name': 'package',
                'title': 'Số gói hàng',
            }]
        setSelectedGood(selectedGood)
        if (props.data.orderId !== 0) {
            setTitle('Hàng nhận trong đơn ' + props.data.name)
            orderService.findById(props.data.orderId)
                .then(value => {
                    good = value.result.good.map(e => {
                        return {
                            name: e.name,
                            weight: e.weight,
                            package: e.pack
                        }
                    })
                })
                .catch(error => {
                    console.log('aaa');
                }).finally(() => {
                    setGood(good)
                })
        }
    }, [props.data])
    let StatusFormatter = (value) => {
        switch (value.column.name) {

            default:
                return <div style={{ whiteSpace: 'pre-wrap' }}>{value.value}</div>
        }
    }
    let StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={StatusFormatter}
            {...props}
        />
    )
    if (props.value === props.index)
        return (
            <div className='row'>
                <div className='col-12' style={{ textAlign: 'center' }}>{title}</div>
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={good}
                        columns={selectedGood}
                    >
                        < StatusTypeProvider
                            for={['name']}
                        />
                        <FilteringState columnExtensions={filteringStateColumnExtensions} />
                        <IntegratedFiltering />
                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
                        <TableFilterRow />
                    </Grid>
                </Paper>

            </div>
        )
    else return <div></div>

}
function QuotationTable(props) {
    let pages = [1, 10, 'id', 0]
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let [selectedQuotation, setSelectedQuotation] = useState([
        { name: 'name', title: 'Tên' },
        { name: 'value', title: 'Giá trị' }
    ])
    let [quotation, setQuotation] = useState([])
    let tmp = {
        id: 1, tripId: 1, tripName: 'name', truckerId: 1, truckerName: 'name', vehicleId: 1, driverId: 1,
        tripFee: 10, loading: 10, unloading: 10, waitFee: 10, waitFee: 10, returnFee: 10, cancelFee: 10
    }
    useEffect(() => {
        if (props.data.tripId !== 0)
            quotationService.search(new Condition(pages,
                [{ key: 'tripId', value: props.data.tripId, operation: 0 },
                { key: 'truckerId', value: userId, operation: 0 }]))
                .then(value => {
                    if (value.result.length !== 0) {
                        for (let e in value.result[0]) {
                            quotation.push({ name: e, value: tmp[e] })
                        }
                        setQuotation(quotation)
                    }
                })
                .catch(error => {
                    console.log('aaa');
                }).finally(() => {
                    console.log('aaa');

                    // setTitle('Thông tin chuyến hàng ' + props.data.name)
                })
    }, props.data)
    let tableColumnExtensions = [
        { columnName: 'name', width: '8rem' },
        { columnName: 'value', width: '16rem' },
    ]
    if (props.value === props.index)
        return (
            <div className='row'>
                <div className='col-12' style={{ textAlign: 'center' }}>Bảng giá chuyến số 1</div>
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={quotation}
                        columns={selectedQuotation}
                    >
                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
                    </Grid>
                </Paper>

            </div>
        )
    else return <div></div>
}
function OrderTable(props) {
    let pages = [1, 10, "id", 0]
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let [selectedOrder, setSelectedOrder] = useState([])
    let [order, setOrder] = useState([])
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let tableColumnExtensions = [
        { columnName: 'index', width: '4rem' },
        { columnName: 'action', width: '5rem' },
        { columnName: 'id', width: '4rem' },
        { columnName: 'name', width: '8rem' },
        { columnName: 'weight', width: '8rem' },
        { columnName: 'volumeRequire', width: '7rem' },
        { columnName: 'weightRequire', width: '7rem' },
        { columnName: 'isCombine', width: '7rem' },
        { columnName: 'isReturn', width: '5rem' },
        { columnName: 'maxFee', width: '6rem' },
        { columnName: 'status', width: '6rem' },
    ]
    let [dialogBool, setDialogBool] = useState({
        open: false,
        id: 0,
        table: 10,
        code: '',
        action: ''
    })

    let [edit, setEdit] = useState({
        open: false
    })
    let [title, setTitle] = useState(' ')
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
        { columnName: 'action', filteringEnabled: false },
    ]
    useEffect(() => {
        selectedOrder = props.state.selectedOrder.reduce((array, e) => {
            if (e.checked === true)
                array.push(
                    {
                        name: e.field,
                        title: e.title
                    })
            return array

        }, [])
        if (props.data.tripId !== 0)
            orderService.search(new Condition(pages, [{ key: 'tripId', value: props.data.tripId, operation: 0 }]))
                .then(value => {
                    let i = 0
                    order = value.result.map(e => {
                        i += 1
                        return {
                            index: i,
                            id: e.id,
                            name: e.name,
                            type: e.type,
                            cod: e.cod,
                            person: e.person,
                            location: e.location,
                            eta: e.eta,
                        }
                    })
                })
                .catch(error => {
                    console.log('aaa');
                }).finally(() => {
                    setOrder(order)
                    setTitle('Thông tin chuyến hàng ' + props.data.name)
                })
        setSelectedOrder(selectedOrder)

    }, [props.reload, props.data])
    let getOrder = () => {
        return orderService.search(condition)
            .then(value => {
                let i = 0
                order = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        id: e.id,
                        name: e.name,
                        startName: e.startName,
                        startLocation: e.startLocation,
                        startEta: e.startEta,
                        endName: e.endName,
                        endLocation: e.endLocation,
                        endEta: e.endEta,
                        weight: e.weight,
                        volumeRequire: e.volumeRequire,
                        weightRequire: e.weightRequire,
                        isCombine: e.isCombine,
                        isReturn: e.isReturn,
                        maxFee: e.maxFee,
                        // status: e.status
                        status: 0
                    }
                })
            })
            .catch(error => {
                console.log('aaa');
            })
    }
    let clickTrash = (id) => {
        setDialogBool({
            open: true,
            id: id,
            code: '',
            action: 'DELETE_ORDER'
        })
    }
    let clickEdit = event => {

    }
    let getElement = id => {
        return order.filter(e => e.id === id)[0]
    }
    let clickView = event => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        props.view(id, getElement(id).name)
    }
    let confirm = (event) => {
        switch (event) {
            case 'DELETE_ORDER_SUCCESS':
                getOrder()
                    .finally(() => {
                        setOrder(order)
                        setDialogBool({
                            open: false,
                        })
                        setAlert({
                            open: true,
                            message: 'Xóa thành công đơn hàng',
                            severity: 'success',
                        })

                    })
                break;
        }
    }

    let cancel = (e) => {
        switch (e) {
            case 'DELETE_ADDRESS_SUCCESS':
                console.log('aaa');
                break;
            case 'DELETE_ADDRESS':
                setDialogBool({
                    open: false,
                })
                break;
            case 'UPDATE_ADDRESS':
                setEdit({
                    open: false,
                })
                break;


            default:
                break;
        }
    }
    let close = (e) => {
        setAlert({
            open: false,
            message: 'Tạo thành công',
            severity: 'success'
        })
    }
    let TimeFormatter = (value) => {
        let date = new Date(value.value)
        return date.getHours() +
            'h ' +
            date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear()

    }
    let TimeTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={TimeFormatter}
            {...props}
        />
    )
    let StatusFormatter = (value) => {
        switch (value.column.name) {
            case 'cod':
                switch (value.value) {
                    case true:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#0abb88',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Có</span>
                    case false:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#ffab02',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Không</span>
                }
                break;
            case 'type':
                switch (value.value) {
                    case 0:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#0abb88',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Đơn nhận</span>
                    case 1:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#ffab02',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Đơn trả</span>
                }
                break;
            default:
                return <div style={{ whiteSpace: 'pre-wrap' }}>{value.value}</div>
        }
    }
    let StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={StatusFormatter}
            {...props}
        />
    )
    let ActionFormatter = (value) => {
        return (
            <div>
                <button
                    onClick={clickView}
                    id={'view&' + value.row.id}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        )
    }
    let ActionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={ActionFormatter}
            {...props}
        />
    )

    if (props.value === props.index)
        return (
            <div className='row'>
                <div className='col-12' style={{ textAlign: 'center' }}>{title}</div>
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <DialogBool cancel={cancel} confirm={confirm} data={dialogBool} />
                    <AlertCustom data={alert}
                        close={close}
                    />
                    <Grid
                        rows={order}
                        columns={selectedOrder}
                    >
                        < StatusTypeProvider
                            for={['cod', 'type']}
                        />
                        < ActionTypeProvider
                            for={['action']}
                        />

                        <TimeTypeProvider for={['eta']}
                        />
                        <FilteringState columnExtensions={filteringStateColumnExtensions} />
                        <IntegratedFiltering />
                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
                        <TableFilterRow />
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={setCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                        />
                        <IntegratedPaging />
                        <PagingPanel pageSizes={pageSizes} />
                    </Grid>
                </Paper>
            </div>
        )
    else return <div></div>
}
function TripTable(props) {
    let pages = [1, 10, "id", 0]
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let [selectedTrip, setSelectedTrip] = useState([])
    let [trip, setTrip] = useState([])
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let tableColumnExtensions = [
        { columnName: 'index', width: '4rem' },
        { columnName: 'action', width: '14rem' },
        { columnName: 'id', width: '4rem' },
        { columnName: 'name', width: '8rem' },
        { columnName: 'openBid', width: '8rem' },
        { columnName: 'closeBid', width: '8rem' },
        { columnName: 'bidStatusName', width: '9rem' },
        { columnName: 'weight', width: '8rem' },
        { columnName: 'volumeRequire', width: '7rem' },
        { columnName: 'weightRequire', width: '7rem' },
        { columnName: 'truckType', width: '7rem' },
        { columnName: 'temperature', width: '7rem' },
        { columnName: 'isCombine', width: '7rem' },
        { columnName: 'isReturn', width: '5rem' },
        { columnName: 'maxFee', width: '6rem' },
        { columnName: 'bidTypeName', width: '8rem' },
        { columnName: 'truckTypeName', width: '7rem' },
        { columnName: 'bidName', width: '6rem' },
        { columnName: 'bidNameGroup', width: '6rem' },
    ]
    let [dialogBool, setDialogBool] = useState({
        open: false,
        id: 0,
        table: 10,
        code: '',
        action: ''
    })

    let [edit, setEdit] = useState({
        open: false
    })
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
        { columnName: 'action', filteringEnabled: false },
    ]
    useEffect(() => {
        selectedTrip = props.state.selectedTripTrucker.reduce((array, e) => {
            if (e.checked === true)
                array.push(
                    {
                        name: e.field,
                        title: e.title
                    })
            return array

        }, [])
        tripService.searchByTruckId(userId, new Condition(pages, []))
            .then(value => {
                let i = 0
                trip = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        id: e.id,
                        customerName: e.customerName,
                        name: e.name,
                        openBid: e.openBid,
                        closeBid: e.closeBid,
                        weight: e.weight,
                        volumeRequire: e.volumeRequire,
                        weightRequire: e.weightRequire,
                        truckType: e.truckType,
                        truckTypeName: e.truckTypeName,
                        temperature: e.temperature,
                        temperatureName: e.temperatureName,
                        isCombine: e.isCombine,
                        isReturn: e.isReturn,
                        maxFee: e.maxFee,
                        bidTypeName: e.bidTypeName,
                        bidStatusName: e.bidStatusName,
                        truckTypeName: e.truckTypeName,
                        bidName: e.bidName,
                        bidNameGroup: e.bidNameGroup,
                        note: e.note
                    }
                })
            })
            .catch(error => {
                console.log('aaa');
            }).finally(() => {
                setTrip(trip)
                setSelectedTrip(selectedTrip)
            })
    }, [props.reload])
    let clickTrash = (id) => {
        setDialogBool({
            open: true,
            id: id,
            code: '',
            action: 'DELETE_ORDER'
        })
    }
    let clickEdit = event => {

    }
    let getElement = id => {
        return trip.filter(e => e.id === id)[0]
    }
    let clickView = event => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        props.view(id, getElement(id).name)
    }
    let confirm = (event) => {
        switch (event) {
            case 'DELETE_ORDER_SUCCESS':
                break;
        }
    }

    let cancel = (e) => {
        switch (e) {
            case 'DELETE_ADDRESS_SUCCESS':
                console.log('aaa');
                break;
            case 'DELETE_ADDRESS':
                setDialogBool({
                    open: false,
                })
                break;
            case 'UPDATE_ADDRESS':
                setEdit({
                    open: false,
                })
                break;


            default:
                break;
        }
    }
    let close = (e) => {
        setAlert({
            open: false,
            message: 'Tạo thành công',
            severity: 'success'
        })
    }
    let TimeFormatter = (value) => {
        let date = new Date(value.value)
        return date.getHours() +
            'h ' +
            date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear()

    }
    let TimeTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={TimeFormatter}
            {...props}
        />
    )
    let StatusFormatter = (value) => {
        switch (value.column.name) {
            case 'bidStatusName':
                switch (value.value) {
                    case 0:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#0abb88',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Mở thầu</span>
                    case 1:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#ffab02',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Đợi chuyến</span>
                }
                break;
            case 'isCombine':
                switch (value.value) {
                    case false:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#0abb88',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Không</span>
                    case true:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#ffab02',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Có</span>
                }
                break;
            case 'isReturn':
                switch (value.value) {
                    case false:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#0abb88',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Không</span>
                    case true:
                        return <span style={{
                            padding: '.5em .75em',
                            textAlign: 'center', background: '#ffab02',
                            borderRadius: '0.25rem', color: 'white',
                        }}>Có</span>
                }
                break;
            // case 'name':

            default:
                return <div style={{ whiteSpace: 'pre-wrap' }}>{value.value}</div>
        }
    }
    let StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={StatusFormatter}
            {...props}
        />
    )
    let ActionFormatter = (value) => {
        return (
            <div>
                <button
                    id={'trash&' + value.row.id}
                    onClick={() => {
                        clickTrash(value.row.id)
                    }}
                    style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    onClick={clickEdit}
                    id={'edit&' + value.row.id}
                    style={{ background: '#ffab02', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                    onClick={clickView}
                    id={'view&' + value.row.id}
                    style={{ background: '#28a745', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faMoneyBillAlt} />
                </button>
                <button
                    onClick={clickView}
                    id={'view&' + value.row.id}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faBoxOpen} />
                </button>
            </div>
        )
    }
    let ActionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={ActionFormatter}
            {...props}
        />
    )
    if (props.value === props.index)
        return (
            <div className='row'>
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <DialogBool cancel={cancel} confirm={confirm} data={dialogBool} />
                    <AlertCustom data={alert}
                        close={close}
                    />
                    <Grid
                        rows={trip}
                        columns={selectedTrip}
                    >
                        < StatusTypeProvider
                            for={['status', 'isCombine', 'isReturn', 'name', 'bidNameGroup', 'bidName', 'note']}
                        />
                        < ActionTypeProvider
                            for={['action']}
                        />
                        <TimeTypeProvider for={['openBid', 'closeBid', 'startEta', 'endEta']} />
                        <FilteringState columnExtensions={filteringStateColumnExtensions} />
                        <IntegratedFiltering />
                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
                        <TableFilterRow />
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={setCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                        />
                        <IntegratedPaging />
                        <PagingPanel pageSizes={pageSizes} />
                    </Grid>
                </Paper>
            </div>
        )
    else return <div></div>
}
function select(state) {
    return {
        state: state.reducer
    }
}
let TableTrip = connect(select)(TripTable)
let TableOrder = connect(select)(OrderTable)
let TableQuotation = connect(select)(QuotationTable)
let TableGood = connect(select)(GoodTable)
let TableTemperature = connect(select)(TemperatureTable)
export {
    TableOrder,
    TableQuotation,
    TableGood,
    TableTemperature,
    TableTrip
}