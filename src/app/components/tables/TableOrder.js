import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faPencilAlt, faTrashAlt, faSearch } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper } from '@material-ui/core';
import { IntegratedPaging, PagingState, DataTypeProvider } from '@devexpress/dx-react-grid'
import { Grid, PagingPanel, Table, TableHeaderRow, TableFixedColumns } from '@devexpress/dx-react-grid-material-ui'
import Condition from '../../models/Condition';
import OrderService from '../../services/OrderService';
let orderService = new OrderService()
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
    useEffect(() => {
        selectedGood = [
            {
                'name': 'name',
                'title': 'Tên',
            },
            {
                'name': 'weight',
                'title': 'Khối lượng',
            }]
        setSelectedGood(selectedGood)
        if (props.orderId !== 0) {
            orderService.findById(props.orderId)
                .then(value => {
                    good = value.result.good.map(e => {
                        return {
                            name: e.name,
                            weight: e.weight,
                        }
                    })
                })
                .catch(error => {
                    console.log('aaa');
                }).finally(() => {
                    setGood(good)
                })
        }
    }, [props.orderId])
    if (props.value === props.index)
        return (
            <div className='row'>
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={good}
                        columns={selectedGood}
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
function ReceiveTable(props) {
    let [selectedReceive, setSelectedReceive] = useState([])
    let [receive, setReceive] = useState([])
    let tableColumnExtensions = [
        { columnName: 'name', width: '7rem' },
        { columnName: 'type', width: '7rem' },
        { columnName: 'location', width: '20rem' },
        { columnName: 'eta', width: '5rem' },
    ]
    useEffect(() => {
        selectedReceive = [{
            'name': 'name',
            'title': 'Tên',
        },
        {
            'name': 'type',
            'title': 'Loại',
        },
        {
            'name': 'location',
            'title': 'Địa chỉ',
        },
        {
            'name': 'eta',
            'title': 'Thời gian',
        }]
        setSelectedReceive(selectedReceive)
        if (props.orderId !== 0) {
            orderService.findById(props.orderId)
                .then(value => {
                    receive = value.result.point.map(e => {
                        return {
                            name: e.name,
                            type: e.type,
                            location: e.location,
                            eta: e.eta,
                        }
                    })
                })
                .catch(error => {
                    console.log('aaa');
                }).finally(() => {
                    setReceive(receive)
                })
        }
    }, [props.orderId, props.reload])
    let StatusFormatter = (value) => {
        switch (value.value) {
            case 0:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#ffab02',
                    borderRadius: '0.25rem', color: 'white',
                }}>Nhận hàng</span>
            case 1:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#fc424a',
                    borderRadius: '0.25rem', color: 'white',
                }}>Trả hàng</span>
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
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={receive}
                        columns={selectedReceive}
                    >
                        < StatusTypeProvider
                            for={['type']}
                        />

                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
                        <TableFixedColumns
                            leftColumns={['name', 'type']}
                            rightColumns={['eta']}
                        />
                    </Grid>
                </Paper>
            </div>
        )
    else return <div></div>

}
function QuotationTable(props) {
    let pages = [1, 10, "id", 0]
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let [selectedQuotation, setSelectedQuotation] = useState([])
    let [quotation, setQuotation] = useState([])
    let tableColumnExtensions = [
        { columnName: 'index', width: '4rem' },
        { columnName: 'action', width: '6rem' },
        { columnName: 'id', width: '3rem' },
        { columnName: 'truckerId', width: '7rem' },
        { columnName: 'truckerName', width: '8rem' },
        { columnName: 'vehicleId', width: '4rem' },
        { columnName: 'licensePlate', width: '6rem' },
        { columnName: 'weight', width: '8rem' },
        { columnName: 'volumeRequire', width: '6rem' },
        { columnName: 'tripFee', width: '7rem' },
        { columnName: 'waitFee', width: '5rem' },
        { columnName: 'returnFee', width: '7rem' },
        { columnName: 'loading', width: '8rem' },
        { columnName: 'unloading', width: '7rem' },
        { columnName: 'cancel', width: '5rem' },
    ]
    useEffect(() => {
        selectedQuotation = props.state.selectedQuotation.reduce((array, e) => {
            if (e.checked === true)
                array.push(
                    {
                        name: e.field,
                        title: e.title
                    })
            return array

        }, [])
        setSelectedQuotation(selectedQuotation)
    }, [props.reload])
    let clickTrash = (event) => {

    }
    let clickEdit = event => {

    }

    let StatusFormatter = (value) => {
        switch (value.value) {
            case 0:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#ffab02',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang chờ</span>
            case 1:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#fc424a',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang khóa</span>
            case 2:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#0abb88',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang sử dụng</span>


        }
    }
    let StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={StatusFormatter}
            {...props}
        />
    )

    let ActionPermissionFormatter = (value) => {
        return (
            <div>
                <button
                    id={'trash&permission&' + value.row.id}
                    onClick={clickTrash}
                    style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    onClick={clickEdit}
                    id={'edit&permission&' + value.row.id}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            </div>
        )
    }
    let ActionPermissionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={ActionPermissionFormatter}
            {...props}
        />
    )
    if (props.value === props.index)
        return (
            <div className='row'>
                <div className='col-12' style={{ textAlign: 'center' }}>Bảng giá đơn hàng số 1</div>

                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={quotation}
                        columns={selectedQuotation}
                    >
                        < StatusTypeProvider
                            for={['status']}
                        />
                        < ActionPermissionTypeProvider
                            for={['action']}
                        />
                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
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
    let tableColumnExtensions = [
        { columnName: 'index', width: '4rem' },
        { columnName: 'action', width: '10rem' },
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
    let orderService = new OrderService()
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
        orderService.search(condition)
            .then(value => {
                let i = 0
                order = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        id: e.id,
                        name: e.name,
                        weight: e.weight,
                        volumeRequire: e.volumeRequire,
                        weightRequire: e.weightRequire,
                        isCombine: e.isCombine,
                        isReturn: e.isReturn,
                        maxFee: e.maxFee,
                        status: e.status
                    }
                })
            })
            .catch(error => {
                console.log('aaa');
            }).finally(() => {
                setOrder(order)
                setSelectedOrder(selectedOrder)
            })
    }, [props.reload])
    let clickTrash = (event) => {

    }
    let clickEdit = event => {

    }
    let clickView = event => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        props.view(id)
    }

    let StatusFormatter = (value) => {
        switch (value.column.name) {
            case 'status':
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
            default:
                break;
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
                    onClick={clickTrash}
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
                <Paper className='col-12' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <Grid
                        rows={order}
                        columns={selectedOrder}
                    >
                        < StatusTypeProvider
                            for={['status', 'isCombine', 'isReturn']}
                        />
                        < ActionTypeProvider
                            for={['action']}
                        />
                        <Table
                            columnExtensions={tableColumnExtensions}
                        />
                        <TableHeaderRow />
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
let TableOrder = connect(select)(OrderTable)
let TableQuotation = connect(select)(QuotationTable)
let TableGood = connect(select)(GoodTable)
let TableReceive = connect(select)(ReceiveTable)
let TableTemperature = connect(select)(TemperatureTable)
export {
    TableOrder,
    TableQuotation,
    TableGood,
    TableReceive,
    TableTemperature
}