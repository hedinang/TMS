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
import RoleService from '../../services/RoleService';
// import { DialogDelete } from '../dialog/DialogDelete'
import { AlertCustom, DialogEditAddress } from '../dialog/DialogAddress';
import TabPanelAddress from '../tabPanel/TabPanelAddress';
import AddressService from '../../services/AddressService';
import { DialogBool } from '../dialog/DialogBool';
function TableAddress(props) {
    let addressService = new AddressService()
    let leftColumns = ['id', 'action', 'name']
    let rightColumns = ['status']
    let tableColumnExtensions = [
        { columnName: 'id', width: 180 },
        { columnName: 'action', width: 180 },
        { columnName: 'name', width: 200 },
        { columnName: 'status', width: 170 },
    ];
    let actionColumns = ['action']
    let statusColumns = ['status']
    let filteringStateColumnExtensions = [
        { columnName: 'action', filteringEnabled: false },
        { columnName: 'status', filteringEnabled: false },
    ]
    let pages = [1, 10, "id", 0]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let [edit, setEdit] = useState({
        open: false
    })
    let [data, setData] = useState({
        show: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let [address, setAddress] = useState([])
    let [selectedAddress, setSelectedAddress] = useState([])
    let [dialogBool, setDialogBool] = useState({
        open: false,
        id: 0,
        table: 10,
        code: '',
        action: ''
    })
    useEffect(() => {
        selectedAddress = props.state.selectedAddress.reduce((array, e) => {
            if (e.checked === true)
                array.push(
                    {
                        name: e.field,
                        title: e.title,
                        // checked:e.checked
                    })
            return array

        }, [])
        addressService.search(condition)
            .then(value => {
                let i = 0
                address = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        id: e.id,
                        name: e.name,
                        parentId: e.parentId,
                        location: e.location,
                        type: e.type
                    }
                })
            })
            .finally(() => {
                setAddress(address)
                setSelectedAddress(selectedAddress)
            })
    }, [])
    let getAddress = () => {
        return addressService.search(condition)
            .then(value => {
                let i = 0
                address = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        id: e.id,
                        name: e.name,
                        parentId: e.parentId,
                        location: e.location,
                        type: e.type
                    }
                })
            })
    }
    let clickTrash = (e) => {
        let id = e.currentTarget.id.split('&')[1]
        setDialogBool({
            open: true,
            id: id,
            code: '',
            action: 'DELETE_ADDRESS'
        })
    }
    let clickEdit = (e) => {
        let id = e.currentTarget.id.split('&')[1]
        setEdit({
            open: true,
            id: id
        })
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
            case 'DELETE_ADDRESS_SUCCESS':
                setData({
                    show: false,
                    message: 'Xóa thành công địa chỉ',
                    severity: 'success'
                })
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
    let ActionFormatter = (value) => {
        return (
            <div>
                <button
                    id={'trash&' + value.row.id}
                    onClick={clickTrash}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    id={'edit&' + value.row.id}
                    onClick={clickEdit}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            </div>
        )
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
    );

    let ActionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={ActionFormatter}
            {...props}
        />
    )
    let loadSelected = (event) => {
        selectedAddress = props.state.selectedAddress.reduce((array, e) => {
            if (e.checked === true)
                array.push(
                    {
                        name: e.field,
                        title: e.title
                    })
            return array

        }, [])
        setSelectedAddress(selectedAddress)
    }
    let confirm = (event) => {
        switch (event) {
            case 'CREATE_ADDRESS_SUCCESS':
                getAddress()
                    .finally(() => {
                        setAddress(address)
                        setAlert({
                            open: true,
                            message: 'Tạo thành công địa chỉ',
                            severity: 'success',
                        })
                    })
                break;
            case 'UPDATE_ADDRESS_SUCCESS':
                getAddress()
                    .finally(() => {
                        setAddress(address)
                        setEdit({
                            open: false,
                        })
                        setAlert({
                            open: true,
                            message: 'Cập nhật thành công địa chỉ',
                            severity: 'success',
                        })
                    })
                break
            case 'DELETE_ADDRESS_SUCCESS':
                getAddress()
                    .finally(() => {
                        setAddress(address)
                        setDialogBool({
                            open: false,

                        })
                        setAlert({
                            open: true,
                            message: 'Xóa thành công địa chỉ',
                            severity: 'success',
                        })
                    })
                break;
        }
    }
    return (
        <Paper>
            <DialogEditAddress data={edit}
                confirm={confirm}
                cancel={cancel}
            />
            <DialogBool cancel={cancel} confirm={confirm} data={dialogBool}
            // fail={fail} 
            />
            <AlertCustom data={alert}
                close={close}
            />
            {/* <DialogDelete cancel={this.cancel} confirm={this.confirm} fail={this.fail} data={this.state.delete} /> */}
            <Grid xs={12}
                rows={address}
                columns={selectedAddress} >
                <ActionTypeProvider for={actionColumns} />
                {/* <StatusTypeProvider for={statusColumns} /> */}
                <FilteringState columnExtensions={filteringStateColumnExtensions} />
                <IntegratedFiltering />
                <Table
                // columnExtensions={tableColumnExtensions}
                />
                <TableHeaderRow />
                <TableFilterRow />
                <TableFixedColumns
                // leftColumns={leftColumns}
                // rightColumns={rightColumns}
                />
                <PagingState
                    currentPage={currentPage}
                    onCurrentPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                />
                <IntegratedPaging />
                <TableColumnVisibility />
                <Toolbar />
                <TabPanelAddress
                    loadSelected={loadSelected}
                    confirm={confirm}
                />
                <PagingPanel pageSizes={pageSizes} />
            </Grid>
        </Paper >
    )

}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TableAddress);





