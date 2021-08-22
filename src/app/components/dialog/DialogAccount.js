import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog, TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import RoleService from '../../services/RoleService'
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserService from '../../services/UserService';
import Condition from '../../models/Condition';
let userService = new UserService();
let roleService = new RoleService();
let pageSize = 10
let pages = [1, pageSize, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)

function DialogCreateAccount(event) {
    let [open, setOpen] = useState(false)
    let [user, setUser] = useState({})
    let [status, setStatus] = useState([])
    let [parent, setParent] = useState([])
    let [role, setRole] = useState([])
    useEffect(() => {
        if (event.data.open === true) {
            userService.search(condition)
                .then(value => {
                    parent = value.result
                    return roleService.search(condition)
                })
                .then(value => {
                    role = value.result
                })
                .finally(() => {
                    setParent(parent)
                    setRole(role)
                    setStatus(status)
                    setOpen(true)
                })
            status = [
                { id: 0, name: 'Đang chờ' },
                { id: 1, name: 'Đang khóa' },
                { id: 2, name: 'Đã kích hoạt' }
            ]
        }
        else
            setOpen(false)
    }, [event.data.open])
    let confirm = () => {
        userService.create(user).then(value => {
            event.confirm('CREATE_USER_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('CREATE_USER')
    }
    let changeName = (e) => {
        user.name = e.target.value
    }
    let changeUsername = (e) => {
        user.username = e.target.value
    }
    let changeEmail = (e) => {
        user.email = e.target.value
    }
    let changePhone = (e) => {
        user.phone = e.target.value
    }
    let changeRole = (e, value) => {
        if (value != null)
            user.role = value.id
    }
    let changeStatus = (e, value) => {
        if (value != null)
            user.status = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            user.parentId = value.id
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
                        <div>Họ và tên</div>
                        <Input
                            name="name" title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên đăng nhập</div>
                        <Input
                            name="username" title='Tên' onChange={changeUsername}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Email</div>
                        <Input
                            name="email" title='Email' onChange={changeEmail}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Số điện thoại</div>
                        <Input
                            name="phone" title='Số điện thoại' onChange={changePhone}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vai trò</div>
                        <Autocomplete
                            onChange={changeRole}
                            options={role}
                            getOptionLabel={option => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Trạng thái</div>
                        <Autocomplete
                            onChange={changeStatus}
                            options={status}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <div>Quản lý trực tiếp</div>
                        <Autocomplete
                            onChange={changeParent}
                            options={parent}
                            getOptionLabel={option => {
                                return option.id + '-' + option.name + '-' + option.email
                            }}
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
function DialogEditAccount(event) {
    let getItem = (id, array) => {
        if (id === undefined)
            return {}
        let a = array.filter(e => e.id === id)[0]
        return a
    }
    let [open, setOpen] = useState(false)
    let [id, setId] = useState(0)
    let [user, setUser] = useState({})
    let [status, setStatus] = useState([])
    let [parent, setParent] = useState([])
    let [role, setRole] = useState([])
    useEffect(() => {
        if (event.edit.open === true) {
            id = event.edit.id != undefined ? event.edit.id : 0
            userService.searchNot(id, pages)
                .then(value => {
                    parent = value.result
                    return roleService.search(condition)
                })
                .then(value => {
                    role = value.result
                    return userService.findById(id)
                })
                .then(value => {
                    user = value.result
                })
                .finally(() => {
                    setParent(parent)
                    setRole(role)
                    setStatus(status)
                    setUser(user)
                    setId(id)
                    setOpen(true)
                })
            status = [
                { id: 0, name: 'Đang chờ' },
                { id: 1, name: 'Đang khóa' },
                { id: 2, name: 'Đã kích hoạt' }
            ]
        }
        else
            setOpen(false)
    }, [event.edit.open])
    let confirm = () => {
        userService.update(id, user).then(value => {
            event.confirm('UPDATE_USER_SUCCESS')
        }).catch(error => {
            event.fail()
        })
    }
    let cancel = () => {
        event.cancel('CANCEL_USER_UPDATE')
    }
    let changeName = (e) => {
        user.name = e.target.value
    }
    let changeUsername = (e) => {
        user.username = e.target.value
    }
    let changeEmail = (e) => {
        user.email = e.target.value
    }
    let changePhone = (e) => {
        user.phone = e.target.value
    }
    let changeRole = (e, value) => {
        if (value != null)
            user.role = value.id
    }
    let changeStatus = (e, value) => {
        if (value != null)
            user.status = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            user.parentId = value.id
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
                        <div>Họ và tên</div>
                        <Input
                            defaultValue={user.name}
                            name="name" title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên đăng nhập</div>
                        <Input
                            defaultValue={user.username}
                            name="username" title='Tên' onChange={changeUsername}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Email</div>
                        <Input
                            defaultValue={user.email}
                            name="email" title='Email' onChange={changeEmail}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Số điện thoại</div>
                        <Input
                            defaultValue={user.phone}
                            name="phone" title='Số điện thoại' onChange={changePhone}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vai trò</div>
                        <Autocomplete
                            defaultValue={getItem(user.role, role)}
                            onChange={changeRole}
                            options={role}
                            getOptionLabel={option => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Trạng thái</div>
                        <Autocomplete
                            defaultValue={getItem(user.status, status)}
                            onChange={changeStatus}
                            options={status}
                            getOptionLabel={(option) => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <div>Quản lý trực tiếp</div>
                        <Autocomplete
                            defaultValue={getItem(user.parentId, parent)}
                            onChange={changeParent}
                            options={parent}
                            getOptionLabel={option => {
                                return option.id + '-' + option.name + '-' + option.email
                            }}
                            style={{ width: '13rem' }}
                            renderInput={
                                params => {
                                    return <TextField  {...params} />
                                }
                            }
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
function AlertResult(event) {
    let close = e => {
        event.close()
    }
    return (<Snackbar open={event.data.show} autoHideDuration={3000}
        onClose={close}
    >
        <Alert
            style={{ background: '#00d25b', color: 'white' }}
            onClose={close}
            severity={event.data.severity}>
            {event.data.message}
        </Alert>
    </Snackbar>)
}
function DialogBool(event) {
    let [title, setTitle] = useState('')
    let [open, setOpen] = useState(false)
    useEffect(() => {
        switch (event.data.action) {
            case 'DELETE_USER':
                title = 'Bạn có chắc chắn xóa người dùng ' + event.data.name + ' có email là ' + event.data.email + ' ?'
                break;
            case 'RESET_USER':
                title = 'Bạn có chắc chắn reset mật khẩu người dùng ' + event.data.name + ' có email là ' + event.data.email + ' ?'
                break;
            case 'DELETE_ROLE':
                title = 'Bạn có chắc chắn xóa vai trò có mã là ' + event.data.roleCode + ' ?'
                break;
            case 'DELETE_PERMISSION_ROLE':
                title = 'Bạn có chắc chắn xóa quyền ' + event.data.permissionCode + ' trong vai trò có id là ' + event.data.roleId + ' ?'
                break;
            case 'DELETE_PERMISSION':
                title = 'Bạn có chắc chắn xóa quyền có id là ' + event.data.id + ' ?'
                break;
            case 'DELETE_ADDRESS':
                title = 'Bạn có chắc chắn xóa địa chỉ có id là ' + event.data.id + ' ?'
                break;
            case 'DELETE_ORDER':
                title = 'Bạn có chắc chắn xóa đơn hàng có id là ' + event.data.id + ' ?'
                break;
            default:
                break;
        }
        setTitle(title)
        setOpen(event.data.action)
    }, [event.data.action])
    let cancel = e => {
        event.cancel(event.data.action)
    }
    let confirm = e => {
        switch (event.data.action) {
            case 'DELETE_USER':
                userService.delete(event.data.id).then(value => {
                    event.confirm('DELETE_USER_SUCCESS', event.data.id)
                }).catch(error => {
                    event.fail('DELETE_USER_FAIL', event.data.id)
                })
                break;
            case 'RESET_USER':
                userService.reset(event.data.id, '12345').then(value => {
                    event.confirm('RESET_USER_SUCCESS', event.data.parentId)
                }).catch(error => {
                    event.fail('RESET_USER_FAIL', event.data.parentId)
                })
                break;
            default:
                break;
        }
    }
    return (
        <Dialog open={open} onClose={cancel}>
            <DialogTitle>Cảnh báo</DialogTitle>
            <DialogContent >{title}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">Hủy</Button>
                <Button onClick={confirm} color="primary">Đồng ý</Button>
            </DialogActions>
        </Dialog>
    )
}
export { DialogCreateAccount, DialogEditAccount, AlertResult, DialogBool }