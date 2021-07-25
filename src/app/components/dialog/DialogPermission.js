import React, { useEffect, useState } from 'react';
import {
    Snackbar, Button, DialogActions, DialogContent,
    Input, DialogTitle, Dialog, Grid, TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import PermissionService from '../../services/PermissionService'
import RoleService from '../../services/RoleService'
let permissionService = new PermissionService();
function DialogCreatePermission(event) {
    let [open, setOpen] = useState(false)
    let [permission, setPermision] = useState({})
    let [status, setStatus] = useState('')
    useEffect(() => {
        if (event.data.open === true) {
            status = [
                { id: 0, name: 'Đang chờ' },
                { id: 1, name: 'Đang khóa' },
                { id: 2, name: 'Đã kích hoạt' }
            ]
            setStatus(status)
        }
        setOpen(event.data.open)
    }, [event.data.open])
    let changeName = (e) => {
        permission.name = e.target.value
    }
    let changeCode = (e) => {
        permission.code = e.target.value
    }
    let changeStatus = (e, value) => {
        if (value != null)
            permission.status = value.id
    }
    let confirm = (e) => {
        permissionService.create(permission).then(value => {
            event.confirm('CREATE_PERMISSION_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('CREATE_PERMISSION')
    }
    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{event.data.title}</DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Mã</div>
                        <Input onChange={changeCode} name="code" title='Mã' ></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên</div>
                        <Input onChange={changeName} name="name" title='Tên' ></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Trạng thái</div>
                        <Autocomplete
                            onChange={changeStatus}
                            options={status}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">Hủy</Button>
                <Button onClick={confirm} color="primary">Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}
function DialogEditPermission(event) {
    let getItem = (id, array) => {
        if (id === undefined)
            return {}
        let a = array.filter(e => e.id === id)[0]
        return a
    }
    let [open, setOpen] = useState(false)
    let [permission, setPermision] = useState({})
    let [status, setStatus] = useState('')
    useEffect(() => {
        if (event.data.open === true) {
            permissionService.findById(event.data.id)
                .then(value => {
                    permission = value.result
                })
                .finally(() => {
                    setPermision(permission)
                    setStatus(status)
                    setOpen(true)
                })
            status = [
                { id: 0, name: 'Đang chờ' },
                { id: 1, name: 'Đang khóa' },
                { id: 2, name: 'Đã kích hoạt' }
            ]
            setStatus(status)
        }
        else
            setOpen(false)
    }, [event.data.open])

    let changeName = (e) => {
        permission.name = e.target.value
    }
    let changeCode = (e) => {
        permission.code = e.target.value
    }
    let changeStatus = (e, value) => {
        if (value != null)
            permission.status = value.id
    }
    let confirm = (e) => {
        let permissionService = new PermissionService();
        permissionService.update(event.data.id, permission).then(value => {
            event.confirm('UPDATE_PERMISSION_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('UPDATE_PERMISSION')
    }
    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{event.data.title}</DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Mã</div>
                        <Input defaultValue={permission.code} onChange={changeCode} name="code" title='Mã' ></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên</div>
                        <Input defaultValue={permission.name} onChange={changeName} name="name" title='Tên' ></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Trạng thái</div>
                        <Autocomplete
                            defaultValue={getItem(permission.status, status)}
                            onChange={changeStatus}
                            options={status}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">Hủy</Button>
                <Button onClick={confirm} color="primary">Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}
function DeletePermission(event) {
    let title = ''
    switch (event.data.table) {
        case 0:
            if (event.data.childrenId === 0)
                title = 'Bạn có chắc chắn xóa vai trò có mã là ' + event.data.parentCode + ' ?'

            else
                title = 'Bạn có chắc chắn xóa quyền có mã là ' + event.data.childrenCode
                    + ' trong vai trò có mã là ' + event.data.parentCode + ' ?'
            break;
        case 1:
            title = 'Bạn có chắc chắn xóa quyền có mã là ' + event.data.code + ' ?'
            break;
        default:
            break;
    }
    let cancel = (e) => {
        event.cancel('CANCEL_PERMISSION')
    }
    let confirm = (e) => {
        switch (event.data.table) {
            case 0://  role
                let roleService = new RoleService();
                if (event.data.childrenId === 0)
                    roleService.delete(event.data.parentId).then(value => {
                        event.confirm(3, 0, 0)
                    }).catch(error => {
                        event.fail(3)
                    })
                else {
                    roleService.removePermission({
                        roleId: event.data.parentId,
                        permissionId: event.data.childrenId
                    }).then(value => {
                        event.confirm(3, 0, 0)
                    }).catch(error => {
                        event.fail(3)
                    })
                }

                break;
            case 1:
                let permissionService = new PermissionService();
                permissionService.delete(event.data.id).then(value => {
                    event.confirm(4)
                }).catch(error => {
                    event.fail(4)
                })
                break;
            default:
                break;
        }

    }

    return (
        <Dialog
            open={event.data.open}
            onClose={cancel}
        >
            <DialogTitle>Cảnh báo</DialogTitle>
            <DialogContent >{title}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">Hủy</Button>
                <Button onClick={confirm} color="primary">Đồng ý</Button>
            </DialogActions>
        </Dialog>
    )
}
function AlertCustom(event) {
    return (<Snackbar open={event.value.show} autoHideDuration={3000}
        onClose={event.close}
    >
        <Alert
            style={{ background: '#00d25b', color: 'white' }}
            onClose={event.close}
            severity={event.value.severity}>
            {event.value.message}
        </Alert>
    </Snackbar>)
}
export { DialogCreatePermission, DialogEditPermission, DeletePermission, AlertCustom }