import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faPencilAlt, faTrashAlt, faSearch, faPlusSquare } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper } from '@material-ui/core';
import { IntegratedPaging, PagingState, DataTypeProvider, FilteringState, IntegratedFiltering } from '@devexpress/dx-react-grid'
import { Grid, PagingPanel, Table, TableHeaderRow, TableFilterRow, TableFixedColumns } from '@devexpress/dx-react-grid-material-ui'
import Condition from '../../models/Condition';
import UserService from '../../services/UserService';
import TruckGroupService from '../../services/TruckGroupService';
import { DialogEditTruckGroup, AlertResult, DialogBool, DialogInvitation } from '../dialog/DialogTruckGroup';
let truckGroupService = new TruckGroupService()
let userService = new UserService()
let pages = [1, 10, "id", 0]
let currentPage = 0
let setCurrentPage = 0
let pageSize = 4
let setPageSize = 4
let pageSizes = [4, 10, 15]
let conditions = []
let condition = new Condition(pages, conditions)
function TruckTable(props) {
    let [rows, setRows] = useState([])
    let [columns, setColumns] = useState([
        { name: 'index', title: 'STT' },
        { name: 'name', title: 'Tên' },
    ])
    useEffect(() => {
        userService.getTrucker(condition).then(value => {
            let i = 0
            rows = value.result.map(e => {
                i += 1
                return { index: i, name: e.name }
            })
            setRows(rows)
        })
    }, [])
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
    ]
    return (
        <div className='row'>
            <div className='col-12' style={{ textAlign: 'center' }}>Nhà thầu</div>
            <Paper style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <FilteringState
                        // defaultFilters={defaultFilters}
                        columnExtensions={filteringStateColumnExtensions}
                    />
                    <IntegratedFiltering />
                    <Table
                    // columnExtensions={tableColumnExtensions}
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
}
function GroupTable(props) {
    let [rows, setRows] = useState([])
    let [columns, setColumns] = useState([
        { name: 'index', title: 'STT' },
        { name: 'action', title: 'Thao tác' },
        { name: 'name', title: 'Tên' },

    ])
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let [data, setData] = useState({
        open: false
    })
    let [edit, setEdit] = useState({ open: false })
    let [invitation, setInvitation] = useState({ open: false })
    let [member, setMember] = useState([])
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
        { columnName: 'action', filteringEnabled: false },
    ]
    useEffect(() => {
        truckGroupService.search(condition).then(result => {
            let i = 0
            rows = result.result.map(e => {
                i += 1
                return {
                    index: i,
                    name: e.name,
                    id: e.id
                }
            })
            setRows(rows)
        })
    }, [props.reload])
    let getTruckerGroup = () => {
        truckGroupService.search(condition).then(result => {
            let i = 0
            rows = result.result.map(e => {
                i += 1
                return {
                    index: i,
                    name: e.name,
                    id: e.id
                }
            })
            setRows(rows)
        })
    }
    let clickTrash = (event) => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        setData({ open: true, id: id })
    }
    let clickEdit = (event) => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        setEdit({ open: true, id: id })
    }
    let clickInvitation = (event) => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        setInvitation({ open: true, id: id })
    }
    let clickView = (event) => {
        let id = parseInt(event.currentTarget.id.split('&')[1])
        props.changeView(id)
    }
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
                    onClick={clickInvitation}
                    id={'invitation&' + value.row.id}
                    style={{ background: '#00d25b', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPlusSquare} />
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
    let confirm = event => {
        switch (event) {
            case 'UPDATE_TRUCKER_GROUP_SUCCESS':
                setEdit({ open: false })
                setAlert({
                    open: true,
                    message: 'Cập nhật thành công',
                    severity: 'success'
                })
                getTruckerGroup()
                break;
            case 'DELETE_TRUCKER_GROUP_SUCCESS':
                setData({ open: false })
                setAlert({
                    open: true,
                    message: 'Xóa thành công',
                    severity: 'success'
                })
                getTruckerGroup()
                break;
            case 'INVITATION_TRUCKER_GROUP_SUCCESS':
                setInvitation({ open: false })
                setAlert({
                    open: true,
                    message: 'Gửi lời mời thành công',
                    severity: 'success'
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
    let cancel = (e) => {
        switch (e) {
            case 'EDIT_TRUCKER_GROUP':
                setEdit({ open: false })
                break;
            case 'DELETE_TRUCKER_GROUP':
                setData({ open: false })
                break;
            case 'INVITATION':
                setInvitation({ open: false })
                break;
            default:
                break;
        }
    }
    return (
        <div className='row'>
            <div className='col-12' style={{ textAlign: 'center' }}>Nhóm thầu</div>
            <DialogEditTruckGroup edit={edit} cancel={cancel} confirm={confirm} />
            <DialogInvitation data={invitation} cancel={cancel} confirm={confirm} />
            <DialogBool data={data} confirm={confirm} cancel={cancel} />
            <AlertResult
                data={alert}
                close={close} />
            <Paper style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    < ActionTypeProvider
                        for={['action']}
                    />
                    <FilteringState
                        // defaultFilters={defaultFilters}
                        columnExtensions={filteringStateColumnExtensions}
                    />
                    <IntegratedFiltering />
                    <Table
                    // columnExtensions={tableColumnExtensions}
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
}
function MemberTable(props) {
    let [rows, setRows] = useState([])
    let [columns, setColumns] = useState([
        { name: 'index', title: 'STT' },
        { name: 'action', title: 'Thao tác' },
        { name: 'name', title: 'Tên' },

    ])
    let [title, setTitle] = useState('')
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
        { columnName: 'action', filteringEnabled: false },
    ]
    useEffect(() => {
        if (props.view.id !== 0) {
            let i = 0
            truckGroupService.findById(props.view.id).then(value => {
                i += 1
                rows = value.result.truckers.map(e => {
                    return {
                        index: i,
                        id: e.truckId,
                        name: e.truckName
                    }
                })
                title = 'Thành viên nhóm ' + value.result.name
                setRows(rows)
                setTitle(title)
            })
        }
    }, [props.view.load])
    let ActionFormatter = (value) => {
        return (
            <div>
                <button
                    id={'trash&' + value.row.id}
                    onClick={clickTrash}
                    style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faTrashAlt} />
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
    let clickTrash = () => {
        console.log('aa');
    }
    
    return (
        <div className='row'>
            <div className='col-12' style={{ textAlign: 'center' }}>&nbsp;{title}</div>
            <Paper style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    < ActionTypeProvider
                        for={['action']}
                    />
                    <FilteringState
                        // defaultFilters={defaultFilters}
                        columnExtensions={filteringStateColumnExtensions}
                    />
                    <IntegratedFiltering />
                    <Table
                    // columnExtensions={tableColumnExtensions}
                    />
                    <TableHeaderRow />
                    <TableFilterRow />
                </Grid>
            </Paper>
        </div>
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
let TableTruck = connect(select)(TruckTable)
let TableGroup = connect(select)(GroupTable)
let TableMember = connect(select)(MemberTable)

export {
    TableTruck,
    TableGroup,
    TableMember
}