import React, { Component, useEffect, useState } from 'react';
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
import { DialogBool } from '../../dialog/DialogBool'
function Role(props) {
    let permissionService = new PermissionService()
    let roleService = new RoleService()
    let pages = [1, 10, "id", 0]
    let currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    let columnRole = [
        { name: 'index', title: 'STT' },
        { name: 'action', title: 'Thao tác' },
        { name: 'roleCode', title: 'Mã  vai trò' },
        { name: 'roleName', title: 'Vai trò' },
        { name: 'permissionCode', title: 'Mã  quyền hạn' },
        { name: 'permissionName', title: 'Quyền hạn' },
    ]
    let columnPermission = [
        { name: 'index', title: 'STT' },
        { name: 'action', title: 'Thao tác' },
        { name: 'code', title: 'Mã quyền hạn' },
        { name: 'name', title: 'Tên quyền hạn' },
        { name: 'status', title: 'Trạng thái' },

    ]
    let tableColumnExtensions = [
        { columnName: 'index', width: '4rem' },
        { columnName: 'action', width: '6rem' },
        { columnName: 'roleCode', width: '10rem' },
        { columnName: 'roleName', width: '12rem' },
        { columnName: 'permissionCode', width: '10rem' },
        { columnName: 'permissionName', width: '12rem' },
    ]
    let conditions = []
    let condition = new Condition(pages, conditions)
    let [selected, setSelected] = useState()
    let [tab, setTab] = useState()
    let [display, setDisplay] = useState()
    let textColor = 'black'
    let [permission, setPermission] = useState([])
    let [role, setRole] = useState([])
    let [openCreatePermission, setOpenCreatePermission] = useState({
        open: false,
        title: ''
    })
    let [openEditPermission, setOpenEditPermission] = useState({
        open: false,
        title: ''
    })
    let [openCreateRole, setOpenCreateRole] = useState({
        open: false,
        title: 'Tạo mới'
    })
    let [openEditRole, setOpenEditRole] = useState({
        open: false,
        title: 'Chỉnh sửa',
        id: 0
    })
    let [dialogBool, setDialogBool] = useState({
        open: false,
        id: 0,
        table: 10,
        code: '',
        action: ''
    })
    let [alertCustom, setAlertCustom] = useState({
        show: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    useEffect(() => {
        permissionService.search(condition)
            .then(value => {
                let i = 0
                permission = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        id: e.id,
                        code: e.code,
                        name: e.name,
                        status: e.status
                    }

                })
                return roleService.search(condition)
            })
            .then(value => {
                let i = 0
                role = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        roleId: e.id,
                        roleCode: e.code,
                        roleName: e.name,
                        items: e.permission.map(f => {
                            return {
                                parentId: e.id,
                                permissionId: f.id,
                                permissionCode: f.code,
                                permissionName: f.name,
                            }
                        })
                    }
                    i += 1
                })
            })
            .catch(error => {
                console.log('aaaa');
            })
            .finally(() => {
                setTab(props.state.tabRole)
                setDisplay(props.state.displayAccount)
                setRole(role)
                setPermission(permission)
            })
    }, [])
    let clickTrash = (event) => {
        let table = event.currentTarget.id.split('&')
        let remove
        switch (table[1]) {
            case 'permission':
                remove = permission.filter(e => e.id === parseInt(table[2]))[0]
                setDialogBool(
                    {
                        show: true,
                        id: remove.id,
                        code: remove.code,
                        action: 'DELETE_PERMISSION'
                    }
                )
                break;
            case 'role':
                switch (table[2]) {
                    case 'parent':
                        remove = role.filter(e => e.roleId === parseInt(table[3]))[0]
                        setDialogBool(
                            {
                                open: true,
                                roleId: remove.roleId,
                                roleCode: remove.roleCode,
                                action: 'DELETE_ROLE'
                            }
                        )
                        break;
                    case 'children':
                        setDialogBool(
                            {
                                open: true,
                                roleId: parseInt(table[3]),
                                permissionId: parseInt(table[5]),
                                permissionCode: table[4],
                                action: 'DELETE_PERMISSION_ROLE'
                            }
                        )
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    let clickEdit = event => {
        let table = event.currentTarget.id.split('&')
        let remove
        switch (table[1]) {
            case 'permission':
                remove = permission.filter(e => e.id === parseInt(table[2]))[0]
                setOpenEditPermission(
                    {
                        open: true,
                        title: 'Chỉnh sửa',
                        code: remove.code,
                        id: remove.id,
                    },
                )
                break;
            case 'role':
                setOpenEditRole({
                    open: true,
                    title: 'Chỉnh sửa',
                    id: parseInt(table[2])
                },
                )
                break;

            default:
                break;
        }
    }
    let getChildRows = (row, rootRows) => {
        return (row ? row.items : rootRows)
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
    let ActionRoleFormatter = (value) => {
        if (value.column.name === 'action') {
            if (value.row.roleCode !== undefined)
                return (
                    <div>
                        <button
                            id={'trash&role&parent&' + value.row.roleId}
                            onClick={clickTrash}
                            style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <button
                            onClick={clickEdit}
                            id={'edit&role&' + value.row.roleId}
                            style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>

                    </div>
                )
            else
                return (
                    <div>
                        <button onClick={clickTrash}
                            id={'trash&role&children&' + value.row.parentId + '&' + value.row.permissionCode + '&' + value.row.permissionId}
                            style={{ background: '#fc424a', color: 'white' }} className="btn btn-rounded btn-icon">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>)
        }
        return <div>{value.value}</div>
    }
    let ActionRoleTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={ActionRoleFormatter}
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
    let getPermission = () => {
        return permissionService.search(condition).then(value => {
            let i = 0
            permission = value.result.map(e => {
                i += 1
                return {
                    index: i,
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status
                }

            })
            return roleService.search(condition)
        })
            .then(value => {
                let i = 0
                role = value.result.map(e => {
                    i += 1
                    return {
                        index: i,
                        roleId: e.id,
                        roleCode: e.code,
                        roleName: e.name,
                        items: e.permission.map(f => {
                            return {
                                parentId: e.id,
                                permissionId: f.id,
                                permissionCode: f.code,
                                permissionName: f.name,
                            }
                        })
                    }

                })
            })
            .catch(error => {
                console.log('aaaa');
            })
    }
    let getRole = () => {
        return roleService.search(condition).then(value => {
            let i = 0
            role = value.result.map(e => {
                i += 1
                return {
                    index: i,
                    roleId: e.id,
                    roleCode: e.code,
                    roleName: e.name,
                    items: e.permission.map(f => {
                        return {
                            parentId: e.id,
                            permissionId: f.id,
                            permissionCode: f.code,
                            permissionName: f.name,
                        }
                    })
                }
                i += 1
            })
        }).catch(error => {
            console.log('aaaa');
        })
    }
    let deleteAction = e => {
        switch (e) {
            // case 0:
            //     let roleService = new RoleService();
            //     roleService.delete(deletePermission.id).then(value => {
            //         setState({
            //             deletePermission: {
            //                 show: false
            //             },
            //             alertCustome: {
            //                 show: true,
            //                 message: 'Xóa thành công'
            //             }
            //         })
            //         getRole()
            //         setState({
            //             openRole: false
            //         })
            //     }).catch(error => {
            //         console.log('aaaa');
            //     })

            //     break;
            // case 1:
            //     let permissionService = new PermissionService();
            //     permissionService.delete(deletePermission.id).then(value => {
            //         setState({
            //             deletePermission: {
            //                 show: false
            //             },
            //             alertCustome: {
            //                 show: true,
            //                 message: 'Xóa thành công'
            //             }
            //         })
            //         getPermission()
            //         getRole()
            //         setState({
            //             openPermission: false
            //         })

            //     }).catch(error => {
            //         console.log('aaaa');
            //     })
            //     break;
            default:
                break;
        }

    }
    let confirm = (event) => {
        switch (event) {
            case 'DELETE_ROLE_SUCCESS':
                getRole()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Xóa vai trò thành công'
                        })
                        setDialogBool({
                            show: false,
                            id: 0,
                            code: ''
                        })
                        setRole(role)
                    })
                break;
            case 'DELETE_PERMISSION_ROLE_SUCCESS':
                getRole()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Xóa quyền trong vai trò thành công'
                        })
                        setDialogBool({
                            show: false,
                            id: 0,
                            code: ''
                        })
                        setRole(role)
                    })
                break;
            case 'DELETE_PERMISSION_SUCCESS':
                getPermission()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Xóa quyền thành công'
                        })
                        setDialogBool({
                            show: false,
                            id: 0,
                            code: ''
                        })
                        setRole(role)
                        setPermission(permission)
                    })
                break;
            case 'CREATE_ROLE_SUCCESS':
                getRole()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Tạo mới vai trò thành công'
                        })
                        setOpenCreateRole({
                            open: false
                        })
                        setRole(role)
                    })
                break;
            case 'CREATE_PERMISSION_SUCCESS':
                getPermission()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Tạo quyền thành công'
                        })
                        setOpenCreatePermission({
                            open: false
                        })
                        setRole(role)
                        setPermission(permission)
                    })

                break;

            case 'UPDATE_PERMISSION_SUCCESS':

                getPermission()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Cập nhật quyền thành công'
                        })
                        setOpenEditPermission({
                            open: false
                        })
                        setRole(role)
                        setPermission(permission)
                    })
                break
            case 'UPDATE_ROLE_SUCCESS':
                getRole()
                    .finally(() => {
                        setAlertCustom({
                            show: true,
                            message: 'Cập nhật vai trò thành công'
                        })
                        setOpenEditRole({
                            open: false
                        })
                        setRole(role)
                    })
                break;
            default:
                break
        }
    }
    let cancel = (event) => {
        switch (event) {
            case 'CREATE_PERMISSION':
                setOpenCreatePermission({
                    open: false,
                    id: 0
                })
                break;
            case 'CREATE_ROLE':
                setOpenCreateRole({
                    open: false,
                    id: 0
                })
                break;
            case 'UPDATE_PERMISSION':
                setOpenEditPermission({
                    open: false,
                    id: 0
                })
                break

            case 'UPDATE_ROLE':
                setOpenEditRole({
                    open: false,
                    id: 0
                })
                break
            case 'DELETE_PERMISSION_ROLE':
                setDialogBool({
                    show: false,
                    id: 0,
                    code: ''
                })
                break;
            case 'DELETE_ROLE':
                setDialogBool({
                    show: false,
                    id: 0,
                    code: ''
                })
                break;
            case 'DELETE_PERMISSION_ROLE':
                setDialogBool({
                    show: false,
                    id: 0,
                    code: ''
                })
                break;
            case 'DELETE_PERMISSION':
                setDialogBool({
                    show: false,
                    id: 0,
                    code: ''
                })
                break;
            case 'CLOSE_ALERT':
                setAlertCustom({
                    show: false,
                    message: 'Tạo thành công',
                    severity: 'success'
                })
                break;
            default:
                break;
        }
    }
    let fail = (e) => {
        switch (e) {
            // case 'UPDATE_ROLE_FAIL':
            //     setState({
            //         alertCustome: {
            //             show: true,
            //             message: 'Cập nhật vai trò không thành công',
            //             severity: 'error'
            //         },
            //         openEditRole: {
            //             open: false
            //         }
            //     })
            //     break;
            // case 1:
            //     setState({
            //         alertCustome: {
            //             show: true,
            //             message: 'Tạo không thành công',
            //             severity: 'error'
            //         },
            //         openPermission: false
            //     })
            //     break;
            // case 3:
            //     setState({
            //         alertCustome: {
            //             show: true,
            //             message: 'Xóa không thành công',
            //             severity: 'error'
            //         },
            //         delete: {
            //             show: false,
            //             id: 0,
            //             table: 0,
            //             code: ''
            //         }
            //     })
            //     break;
            // case 4:
            //     setState({
            //         alertCustome: {
            //             show: true,
            //             message: 'Xóa không thành công',
            //             severity: 'error'
            //         },
            //         delete: {
            //             show: false,
            //             id: 0,
            //             table: 0,
            //             code: ''
            //         }
            //     })
            //     break;
            default:
                break;
        }

    }
    let addItem = (e) => {
        switch (e.currentTarget.id) {
            case 'role':
                setOpenCreateRole(
                    {
                        open: true,
                        title: 'Tạo mới'
                    })
                break
            case 'permission':
                setOpenCreatePermission({
                    open: true,
                    title: 'Tạo mới',
                })
                break
            default:
                break
        }

    }
    return (
        <div className='row'>
            <DialogBool cancel={cancel} confirm={confirm} fail={fail} data={dialogBool} />
            <AlertCustom data={alertCustom} close={cancel} />
            <Paper className='col-7' >
                <div style={{ textAlign: 'center', color: `${textColor}` }}>Vai trò</div>
                <div>
                    <Button id='role'
                        style={{
                            textAlign: 'text-top', background: '#00d25b', height: '2rem',
                            color: 'white', textTransform: 'none', width: '7rem'
                        }}
                        onClick={addItem}>
                        <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                               Thêm mới
                            </Button>
                    <DialogCreateRole fail={fail} data={openCreateRole} cancel={cancel} confirm={confirm} />
                    <DialogEditRole fail={fail} data={openEditRole} cancel={cancel} confirm={confirm} />
                </div>
                <Grid rows={role} columns={columnRole}>
                    < ActionRoleTypeProvider for={['roleCode', 'action']} />
                    <TreeDataState />
                    <CustomTreeData getChildRows={getChildRows} />
                    <Table columnExtensions={tableColumnExtensions} />
                    <TableHeaderRow />
                    <TableTreeColumn for="roleCode" />
                    <TableFixedColumns
                    // leftColumns={leftColumns}
                    // rightColumns={rightColumns} 
                    />
                    <PagingState currentPage={currentPage}
                        onCurrentPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize} />
                    <IntegratedPaging />
                    <PagingPanel pageSizes={pageSizes} />
                </Grid>
            </Paper>
            <Paper className='col-5' style={{ borderLeft: 'solid 1px', borderColor: '#c1c1c1', marginTop: '13px' }}>
                <div style={{ textAlign: 'center', color: `${textColor}` }}>Quyền hạn</div>
                <div>
                    <Button id='permission'
                        style={{
                            textAlign: 'text-top', background: '#00d25b', height: '2rem',
                            color: 'white', textTransform: 'none', width: '7rem'
                        }}
                        onClick={addItem}>
                        <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                               Thêm mới
                        </Button>
                    <DialogCreatePermission fail={fail} data={openCreatePermission} cancel={cancel}
                        confirm={confirm} />
                    <DialogEditPermission fail={fail} data={openEditPermission} cancel={cancel}
                        confirm={confirm} />
                </div>
                <Grid
                    rows={permission}
                    columns={columnPermission}
                >
                    < StatusTypeProvider
                        for={['status']}
                    />
                    < ActionPermissionTypeProvider
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
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(Role);