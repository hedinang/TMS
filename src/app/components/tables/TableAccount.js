import Paper from '@material-ui/core/Paper';
import ToolbarPanel from '../shared/ToolbarPanel';
import { action } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import {
    FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSelection, IntegratedSorting,
    PagingState, SelectionState, SortingState, DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
    TableColumnReordering, TableColumnVisibility, TableFixedColumns, Grid, GroupingPanel,
    PagingPanel, Table, TableFilterRow, TableHeaderRow, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { faTrashAlt, faPencilAlt, faPowerOff } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react';
import Condition from '../../models/Condition';
import UserService from '../../services/UserService';
import { DialogEditAccount, DialogBool, AlertResult } from '../dialog/DialogAccount'
function TableAccount(props) {
    let leftColumns = ['index', 'action', 'name']
    let rightColumns = ['status']
    let tableColumnExtensions = [
        { columnName: 'id', width: 180 },
        { columnName: 'action', width: 180 },
        { columnName: 'name', width: 200 },
        { columnName: 'status', width: 170 },
    ]
    let actionColumns = ['action']
    let statusColumns = ['status']
    let filteringStateColumnExtensions = [
        { columnName: 'action', filteringEnabled: false },
        { columnName: 'status', filteringEnabled: false },
    ]
    let userService = new UserService();
    let pages = [1, 10, "id", 0]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let [edit, setEdit] = useState({
        open: false,
        id: 0
    })
    let [user, setUser] = useState([])
    let [selectedAccount, setSelectedAccount] = useState([])
    let [alert, setAlert] = useState({})
    let [bool, setBool] = useState({})
    useEffect(() => {
        userService.search(condition).then(value => {
            let i = 0
            user = value.result.map(e => {
                i += 1
                return {
                    index: i,
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    phone: e.phone,
                    roleName: e.roleName,
                    parentId: e.parentId,
                    parentName: e.parentName,
                    status: e.status
                }
            })
            setUser(user)
            
        }).catch(error => {
            console.log('aaaa');
        })
        selectedAccount = props.selectedAccount.reduce((array, e) => {
            if (e.checked === true)
                array.push(
                    {
                        name: e.field,
                        title: e.title
                    })
            return array

        }, [])
        setSelectedAccount(selectedAccount)
        setBool({
            action: ''
        })
    }, [props.selectedAccount, props.reload])
    let getUser = () => {
        return userService.search(condition).then(value => {
            let i = 0
            user = value.result.map(e => {
                i += 1
                return {
                    index: i,
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    phone: e.phone,
                    roleName: e.roleName,
                    parentId: e.parentId,
                    parentName: e.parentName,
                    status: e.status
                }
            })
            setUser(user)
        }).catch(error => {
            console.log('aaaa');
        })
    }
    let clickTrash = (event) => {
        let id = event.currentTarget.id.split('&')[1]
        let element = user.filter(e => e.id === parseInt(id))[0]
        setBool({
            open: true,
            id: element.id,
            name: element.name,
            email: element.email,
            action: 'DELETE_USER'
        })
    }
    let clickEdit = (event) => {
        let id = event.currentTarget.id.split('&')[1]
        let element = user.filter(e => e.id === parseInt(id))[0]
        setEdit({
            open: true,
            id: element.id,
        })
    }
    let clickReset = (event) => {
        let id = event.currentTarget.id.split('&')[1]
        let element = user.filter(e => e.id === parseInt(id))[0]
        setBool({
            open: true,
            id: element.id,
            name: element.name,
            email: element.email,
            action: 'RESET_USER'
        })
    }
    let StatusFormater = (value) => {
        switch (value.value) {
            case 0:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#feac08',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang chờ</span>
            case 1:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#fc424a',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang khóa</span>
            default:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#0abb87',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đã kích hoạt</span>


        }
    }
    let StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={StatusFormater}
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
                    id={'edit&' + value.row.id}
                    onClick={clickEdit}
                    style={{ background: '#ffab02', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button
                    id={'reset&' + value.row.id}
                    onClick={clickReset}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPowerOff} />
                </button>
            </div>
        )
    }
    let ActionTypeProvider = e => (
        <DataTypeProvider
            formatterComponent={ActionFormatter}
            {...e}
        />
    )
    let cancel = (event) => {
        switch (event) {
            case 'DELETE_USER':
                setBool({ open: false })
                break;
            case 'RESET_USER':
                setBool({ open: false })
                break;
            case 'CANCEL_USER_UPDATE':
                setEdit({ open: false })
                break;
            default:
                break;
        }
    }
    let confirm = (event, id) => {
        switch (event) {
            case 'DELETE_USER_SUCCESS':
                getUser()
                setAlert({
                    show: true,
                    message: 'Xóa người dùng thành công'
                })
                setBool({
                    open: false
                })
                break;
            case 'UPDATE_USER_SUCCESS':
                getUser()
                setAlert({
                    show: true,
                    message: 'Cập nhật người dùng thành công'
                })
                setEdit({
                    open: false
                })
                break;
            case 'RESET_USER_SUCCESS':
                setAlert({
                    show: true,
                    message: 'Reset mật khẩu người dùng thành công'
                })
                setBool({
                    open: false
                })
                break;
        }
    }
    let fail = event => {
        console.log('aaa');
    }
    let close = () => {
        setAlert({
            show: false
        })
    }

    return (
        <Paper>
            <DialogEditAccount edit={edit}
                confirm={confirm} cancel={cancel}
            />
            <AlertResult
                data={alert} close={close}
            />
            <DialogBool
                cancel={cancel} confirm={confirm} fail={fail} data={bool}
            />
            <Grid xs={12} rows={user} columns={selectedAccount} >
                <ActionTypeProvider for={actionColumns} />
                <StatusTypeProvider for={statusColumns} />
                <FilteringState columnExtensions={filteringStateColumnExtensions} />
                <IntegratedFiltering />
                <Table
                    columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow />
                <TableFilterRow />
                <TableFixedColumns
                    leftColumns={leftColumns}
                    rightColumns={rightColumns}
                />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                <IntegratedPaging />
                <TableColumnVisibility />
                <PagingPanel pageSizes={pageSizes} />
            </Grid>
        </Paper>
    )

}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TableAccount);





