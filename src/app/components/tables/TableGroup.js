import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faSignOutAlt, faTrashAlt } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper } from '@material-ui/core';
import { IntegratedPaging, PagingState, DataTypeProvider, FilteringState, IntegratedFiltering, } from '@devexpress/dx-react-grid'
import { Grid, PagingPanel, Table, TableHeaderRow, TableFilterRow } from '@devexpress/dx-react-grid-material-ui'
import Condition from '../../models/Condition';
import UserService from '../../services/UserService';
import GroupService from '../../services/GroupService';
import { AlertResult, DialogBool } from '../dialog/DialogGroup';
import CookieService from '../../services/CookieService';
let groupService = new GroupService()
let userService = new UserService()
let pages = [1, 10, "id", 0]
let currentPage = 0
let setCurrentPage = 0
let pageSize = 4
let setPageSize = 4
let pageSizes = [4, 10, 15]
let conditions = []
let condition = new Condition(pages, conditions)
let cookieService = new CookieService()

function GroupTable(props) {
    let [rows, setRows] = useState([])
    let [columns, setColumns] = useState([
        { name: 'index', title: 'STT' },
        { name: 'action', title: 'Thao tác' },
        { name: 'name', title: 'Tên nhóm' },
        { name: 'ownerName', title: 'Chủ nhóm' },

    ])
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let [data, setData] = useState({
        open: false
    })
    let userId = parseInt(cookieService.read('userId'))
    let [edit, setEdit] = useState({ open: false })
    let [invitation, setInvitation] = useState({ open: false })
    let [member, setMember] = useState([])
    let filteringStateColumnExtensions = [
        { columnName: 'index', filteringEnabled: false },
        { columnName: 'action', filteringEnabled: false },
    ]
    useEffect(() => {
        groupService.getByUserId(userId, condition).then(result => {
            let i = 0
            rows = result.result.map(e => {
                i += 1
                return {
                    index: i,
                    id: e.id,
                    name: e.name,
                    ownerName: e.ownerName
                }
            })
            setRows(rows)
        })
    }, [props.reload])
    let getGroup = () => {
        groupService.getByUserId(userId, condition).then(result => {
            let i = 0
            rows = result.result.map(e => {
                i += 1
                return {
                    index: i,
                    id: e.id,
                    name: e.name,
                    ownerName: e.ownerName
                }
            })
            setRows(rows)
        })
    }
    let clickTrash = (event) => {
        let index = parseInt(event.currentTarget.id)
        let element = rows[index]
        setData({ open: true, id: element.id, name: element.name })

    }
    let ActionFormatter = (value) => {
        return (
            <div>
                <button
                    onClick={clickTrash}
                    id={value.row.index - 1}
                    style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
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
            case 'EXIT_GROUP_SUCCESS':
                setData({ open: false })
                setAlert({
                    open: true,
                    message: 'Rời nhóm thành công',
                    severity: 'success'
                })
                getGroup()
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
            case 'EXIT_GROUP':
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
                    <FilteringState columnExtensions={filteringStateColumnExtensions} />
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

    useEffect(() => {
        if (props.view.id !== 0) {
            groupService.findById(props.view.id).then(value => {
                rows = value.result.truckers
                title = 'Thành viên nhóm ' + value.result.name
                setRows(rows)
                setTitle(title)
            })
        }
    }, [props.view.id])
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
                    <Table
                    // columnExtensions={tableColumnExtensions}
                    />
                    <TableHeaderRow />
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
let TableGroup = connect(select)(GroupTable)
let TableMember = connect(select)(MemberTable)

export {
    TableGroup,
    TableMember
}