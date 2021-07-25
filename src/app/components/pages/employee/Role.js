import React, { Component } from 'react';
import PermissionService from '../../../services/PermissionService'
import RoleService from '../../../services/RoleService'
import Condition from '../../../models/Condition'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core';
import { faPencilAlt, faTrashAlt, faPlusSquare } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    TableTreeColumn, Grid, TableFixedColumns, PagingPanel, Table, TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'

import {
    DataTypeProvider, PagingState, IntegratedPaging, TreeDataState, CustomTreeData,
} from '@devexpress/dx-react-grid';
import { DialogCreatePermission, DialogEditPermission, AlertCustom } from '../../dialog/DialogPermission'
import { DialogCreateRole, DialogEditRole } from '../../dialog/DialogRole'
import { DialogDelete } from '../../dialog/DialogDelete'
class Role extends Component {
    state = {
        selected: this.props.state.selectedAccount,
        tab: this.props.state.tabRole,
        display: this.props.state.displayAccount,
        textColor: 'black',
        permission: [],
        role: [],
        openCreatePermission: {
            open: false,
            title: ''
        },
        openEditPermission: {
            open: false,
            title: ''
        },
        openCreateRole: {
            open: false,
            title: 'Tạo mới',
        },
        openEditRole: {
            open: false,
            title: 'Chỉnh sửa',
            id: 0
        },
        delete: {
            open: false,
            id: 0,
            table: 10,
            code: '',
            action: ''
        },
        alertCustome: {
            show: false,
            message: 'Tạo thành công',
            severity: 'success'
        }
    }
    clickTrash = (event) => {
        let table = event.currentTarget.id.split('&')
        let remove
        switch (table[1]) {
            case 'permission':
                remove = this.state.permission.filter(e => e.id === parseInt(table[2]))[0]
                this.setState({
                    delete: {
                        show: true,
                        id: remove.id,
                        code: remove.code,
                        action: 'DELETE_PERMISSION'
                    }
                })
                break;
            case 'role':
                switch (table[2]) {
                    case 'parent':
                        remove = this.state.role.filter(e => e.id === parseInt(table[3]))[0]
                        this.setState({
                            delete: {
                                open: true,
                                parentId: remove.id,
                                childrenId: 0,
                                parentCode: remove.code,
                                action: 'DELETE_ROLE'
                            }
                        })
                        break;
                    case 'children':
                        remove = this.state.role.filter(e => e.id === parseInt(table[3]))[0]
                        this.setState({
                            delete: {
                                open: true,
                                parentId: remove.id,
                                childrenId: parseInt(table[5]),
                                parentCode: remove.code,
                                action: 'DELETE_PERMISSION_ROLE'
                            }
                        })
                        console.log('aaa');
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    clickEdit = event => {
        let table = event.currentTarget.id.split('&')
        let remove
        switch (table[1]) {
            case 'permission':
                remove = this.state.permission.filter(e => e.id === parseInt(table[2]))[0]
                this.setState({
                    openEditPermission: {
                        open: true,
                        title: 'Chỉnh sửa',
                        code: remove.code,
                        id: remove.id,
                    },
                })
                break;
            case 'role':
                this.setState({
                    openEditRole: {
                        open: true,
                        title: 'Chỉnh sửa',
                        id: parseInt(table[2])
                    },
                })
                break;

            default:
                break;
        }
    }
    componentDidMount() {
        this.getPermission()
        this.getRole()
    }
    getChildRows = (row, rootRows) => {
        return (row ? row.items : rootRows)
    }
    StatusFormatter = (value) => {
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
    StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.StatusFormatter}
            {...props}
        />
    )
    ActionRoleFormatter = (value) => {
        if (value.column.name === 'action') {
            if (value.row.parent === 0)
                return (
                    <div>
                        <button
                            onClick={this.clickEdit}
                            id={'edit&role&' + value.row.id}
                            style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                            id={'trash&role&parent&' + value.row.id}
                            onClick={this.clickTrash}
                            style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>

                )
            else
                return (
                    <div>
                        <button onClick={this.clickTrash}
                            id={'trash&role&children&' + value.row.parent + '&' + value.row.code + '&' + value.row.id}
                            style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>)
        }
        return <div>{value.value}</div>
    }
    ActionRoleTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.ActionRoleFormatter}
            {...props}
        />
    )
    ActionPermissionFormatter = (value) => {
        return (
            <div>
                <button
                    id={'trash&permission&' + value.row.id}
                    onClick={this.clickTrash}
                    style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    onClick={this.clickEdit}
                    id={'edit&permission&' + value.row.id}
                    style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
            </div>
        )
    }
    ActionPermissionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.ActionPermissionFormatter}
            {...props}
        />
    )
    getPermission() {
        let permissionService = new PermissionService();
        let pages = [1, 10, "id", 0]
        let conditions = []
        let condition = new Condition(pages, conditions)
        permissionService.search(condition).then(value => {
            this.setState({
                permission: value.result
            })
        }).catch(error => {
            console.log('aaaa');
        })
    }
    getRole() {
        let roleService = new RoleService();
        let pages = [1, 10, "id", 0]
        let conditions = []
        let condition = new Condition(pages, conditions)
        roleService.search(condition).then(value => {
            this.setState({
                role: value.result.map(e => {
                    return {
                        id: e.id,
                        code: e.code,
                        name: e.name,
                        parent: 0,
                        items: e.permission.map(f => {
                            return {
                                id: f.id,
                                code: f.code,
                                name: f.name,
                                parent: e.id
                            }
                        })
                    }
                })
            })
        }).catch(error => {
            console.log('aaaa');
        })
    }
    cancelAlert = (e) => {
        this.setState({
            deletePermission: {
                show: false
            }
        })
        this.getPermission()
    }
    delete = e => {
        switch (e) {
            case 0:
                let roleService = new RoleService();
                roleService.delete(this.state.deletePermission.id).then(value => {
                    this.setState({
                        deletePermission: {
                            show: false
                        },
                        alertCustome: {
                            show: true,
                            message: 'Xóa thành công'
                        }
                    })
                    this.getRole()
                    this.setState({
                        openRole: false
                    })
                }).catch(error => {
                    console.log('aaaa');
                })

                break;
            case 1:
                let permissionService = new PermissionService();
                permissionService.delete(this.state.deletePermission.id).then(value => {
                    this.setState({
                        deletePermission: {
                            show: false
                        },
                        alertCustome: {
                            show: true,
                            message: 'Xóa thành công'
                        }
                    })
                    this.getPermission()
                    this.getRole()
                    this.setState({
                        openPermission: false
                    })

                }).catch(error => {
                    console.log('aaaa');
                })
                break;
            default:
                break;
        }

    }
    confirm = (event) => {
        switch (event) {
            case 'UPDATE_ROLE_SUCCESS':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Cập nhật vai trò thành công'
                    },
                    openEditRole: {
                        open: false
                    }
                })
                this.getRole()
                break;
            case 'CREATE_ROLE_SUCCESS':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Tạo mới vai trò thành công'
                    },
                    openCreateRole: {
                        open: false
                    }
                })
                this.getRole()
                break;
            case 'DELETE_ROLE_SUCCESS':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Xóa vai trò thành công'
                    },
                    delete: {
                        open: false
                    }
                })
                this.getRole()
                break;
            case 'DELETE_PERMISSION_ROLE':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Xóa quyền trong vai trò thành công'
                    },
                    delete: {
                        open: false
                    }
                })
                this.getRole()
                break;
            case 'CREATE_PERMISSION_SUCCESS':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Tạo quyền thành công'
                    },
                    openCreatePermission: {
                        open: false
                    }
                })
                this.getPermission()
                break;
            case 'DELETE_PERMISSION_SUCCESS':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Xóa quyền thành công'
                    },
                    delete: {
                        open: false
                    }
                })
                this.getRole()
                this.getPermission()
                break;
            case 'UPDATE_PERMISSION_SUCCESS':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Cập nhật quyền thành công'
                    },
                    openEditPermission: {
                        open: false
                    }
                })
                this.getRole()
                this.getPermission()
                break;
            default:
                break;
        }
    }
    cancel = (event) => {
        switch (event) {
            case 'CREATE_PERMISSION':
                this.setState({
                    openCreatePermission: {
                        open: false,
                        id: 0
                    }
                })
                break;
            case 'CREATE_ROLE':
                this.setState({
                    openCreateRole: {
                        open: false,
                        id: 0
                    }
                })
                break;
            case 'CREATE_PERMISSION_SUCCESS':
                this.setState({
                    openCreatePermission: {
                        open: false
                    }
                })
                break;
            case 'UPDATE_PERMISSION':
                this.setState({
                    openEditPermission: {
                        open: false
                    }
                })
                break;
            case 'DELETE_PERMISSION_ROLE':
                this.setState({
                    delete: {
                        show: false,
                        id: 0,
                        table: 0,
                        code: ''
                    }
                })
                break;
            case 'DELETE_ROLE':
                this.setState({
                    delete: {
                        show: false,
                        id: 0,
                        table: 0,
                        code: ''
                    }
                })
                break;

            default:
                break;
        }
    }
    fail = (e) => {
        switch (e) {
            case 'UPDATE_ROLE_FAIL':
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Cập nhật vai trò không thành công',
                        severity: 'error'
                    },
                    openEditRole: {
                        open: false
                    }
                })
                break;
            case 1:
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Tạo không thành công',
                        severity: 'error'
                    },
                    openPermission: false
                })
                break;
            case 3:
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Xóa không thành công',
                        severity: 'error'
                    },
                    delete: {
                        show: false,
                        id: 0,
                        table: 0,
                        code: ''
                    }
                })
                break;
            case 4:
                this.setState({
                    alertCustome: {
                        show: true,
                        message: 'Xóa không thành công',
                        severity: 'error'
                    },
                    delete: {
                        show: false,
                        id: 0,
                        table: 0,
                        code: ''
                    }
                })
                break;
            default:
                break;
        }

    }
    addItem = (e) => {
        switch (e.currentTarget.id) {
            case 'role':
                this.setState({
                    openCreateRole: {
                        open: true,
                        title: 'Tạo mới'
                    }
                })
                break;

            case 'permission':
                this.setState({
                    openCreatePermission: {
                        open: true,
                        title: 'Tạo mới',
                    },
                })
                break;
            default:
                break;
        }

    }
    cancelAlert = (e) => {
        this.setState({
            alertCustome: {
                show: false,
            }
        })
    }
    render() {
        let currentPage = 0
        let setCurrentPage = 0
        let pageSize = 4
        let setPageSize = 4
        let pageSizes = [4, 10, 15]
        let columns = [
            { name: 'name', title: 'Quyền' },
            { name: 'action', title: 'Thao tác' }
        ]
        let columnPermission = [
            { name: 'id', title: 'STT' },
            { name: 'action', title: 'Thao tác' },
            { name: 'code', title: 'Mã quyền hạn' },
            { name: 'name', title: 'Tên quyền hạn' },
            { name: 'status', title: 'Trạng thái' },

        ]
        let tableColumnExtensions = [
            { columnName: 'name', width: '24rem' },
        ]
        let rightColumns = ['action']
        return (
            <div className='row'>
                <DialogDelete cancel={this.cancel} confirm={this.confirm} fail={this.fail} data={this.state.delete} />
                <AlertCustom value={this.state.alertCustome} close={this.cancelAlert} />
                <Paper className='col-4' >
                    <div className="mb-2" style={{ textAlign: 'center', color: `${this.state.textColor}` }}>Vai trò</div>
                    <div>
                        <Button id='role'
                            style={{
                                textAlign: 'text-top', background: '#00d25b', height: '2rem',
                                color: 'white', textTransform: 'none', width: '7rem'
                            }}
                            onClick={this.addItem}>
                            <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                               Thêm mới
                            </Button>
                        <DialogCreateRole fail={this.fail} data={this.state.openCreateRole} cancel={this.cancel} confirm={this.confirm} />
                        <DialogEditRole fail={this.fail} data={this.state.openEditRole} cancel={this.cancel} confirm={this.confirm} />
                    </div>
                    <Grid rows={this.state.role}
                        columns={columns}>
                        <this.ActionRoleTypeProvider for={['name', 'action']} />
                        <TreeDataState />
                        <CustomTreeData getChildRows={this.getChildRows} />
                        <Table columnExtensions={tableColumnExtensions} />
                        <TableTreeColumn for="name" />
                        <TableFixedColumns
                            // leftColumns={leftColumns}
                            rightColumns={rightColumns} />
                        <PagingState currentPage={currentPage}
                            onCurrentPageChange={setCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize} />
                        <IntegratedPaging />
                        <PagingPanel pageSizes={pageSizes} />
                    </Grid>
                </Paper>
                <Paper className='col-8' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1' }}>
                    <div className="mb-2" style={{ textAlign: 'center', color: `${this.state.textColor}` }}>Quyền hạn</div>
                    <div>
                        <Button id='permission'
                            style={{
                                textAlign: 'text-top', background: '#00d25b', height: '2rem',
                                color: 'white', textTransform: 'none', width: '7rem'
                            }}
                            onClick={this.addItem}>
                            <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                               Thêm mới
                        </Button>
                        <DialogCreatePermission fail={this.fail} data={this.state.openCreatePermission} cancel={this.cancel}
                            confirm={this.confirm} />
                        <DialogEditPermission fail={this.fail} data={this.state.openEditPermission} cancel={this.cancel}
                            confirm={this.confirm} />
                    </div>
                    <Grid
                        rows={this.state.permission}
                        columns={columnPermission}
                    >
                        <this.StatusTypeProvider
                            for={['status']}
                        />
                        <this.ActionPermissionTypeProvider
                            for={['action']}
                        />
                        <Table
                        // columnExtensions={tableColumnExtensions}
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
    }
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(Role);