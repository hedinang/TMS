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
const [pageSize, setPageSize] = useState(10);
    let pages = [1, pageSize, "id", 0]
    let conditions = []
    let condition = new Condition(pages, conditions)
useEffect(() => {
    userService.search(condition).then(value => {
        setUserParent(value.result)
    })
    roleService.search(condition).then(value => {
        setRole(value.result)
    })
}, [])
function DialogCreateAccount(event) {
    
    const [userParent, setUserParent] = useState([]);
    const [role, setRole] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, name: 'Đang chờ' },
        { id: 1, name: 'Đang khóa' },
        { id: 2, name: 'Đã kích hoạt' }
    ]);
    
    let id = 0
    let username = ''
    let name = ''
    let email = ''
    let phone = ''
    let roleId = 0
    let statusId = 0
    let parentId = 0
    let confirm = () => {
        let userRequest = {
            username: username,
            password: '12345',
            name: name,
            email: email,
            phone: phone,
            role: roleId,
            status: statusId,
            parentId: parentId,
        }
        userService.create(userRequest).then(value => {
            event.confirm('CREATE_USER_SUCCESS')
        }).then(value => {
            userService.search(condition).then(value => {
                setUserParent(value.result)
            })
        })
            .catch(error => {
                event.fail(1)
            })
    }
    let cancel = () => {
        event.cancel(1)
    }
    let changeName = (e) => {
        name = e.target.value
    }
    let changeUsername = (e) => {
        username = e.target.value
    }
    let changeEmail = (e) => {
        email = e.target.value
    }
    let changePhone = (e) => {
        phone = e.target.value
    }
    let changeRole = (e, value) => {
        roleId = value.id
    }
    let changeStatus = (e, value) => {
        statusId = value.id
    }
    let changeParent = (e, value) => {
        parentId = value.id
    }
    return (
        <Dialog
            maxWidth='none'
            open={event.open.open}
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
                            options={userParent}
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
        return array.filter(e => e.id === id)[0]
    }
    let userService = new UserService();
    let roleService = new RoleService();
    const [pageSize, setPageSize] = useState(10);
    let pages = [1, pageSize, "id", 0]
    let conditions = []
    let condition = new Condition(pages, conditions)
    const [userParent, setUserParent] = useState([]);
    const [role, setRole] = useState([]);
    const [status, setStatus] = useState([
        { id: 0, name: 'Đang chờ' },
        { id: 1, name: 'Đang khóa' },
        { id: 2, name: 'Đã kích hoạt' }
    ]);
    useEffect(() => {
        userService.search(condition).then(value => {
            setUserParent(value.result)
        })
        roleService.search(condition).then(value => {
            setRole(value.result)
        })
    }, [])
    let id = event.edit.id
    let username = event.edit.username
    let name = event.edit.name
    let email = event.edit.email
    let phone = event.edit.phone
    let roleId = event.edit.roleId
    let statusId = event.edit.status
    let parentId = event.edit.parentId
    let confirm = () => {
        let userRequest = {
            username: username,
            password: '12345',
            name: name,
            email: email,
            phone: phone,
            role: roleId,
            status: statusId,
            parentId: parentId,
        }
        userService.update(id, userRequest).then(value => {
            event.confirm('UPDATE_USER_SUCCESS')
        }).catch(error => {
            event.fail()
        })
    }
    let cancel = () => {
        event.cancel(2)
    }
    let changeName = (e) => {
        name = e.target.value
    }
    let changeUsername = (e) => {
        username = e.target.value
    }
    let changeEmail = (e) => {
        email = e.target.value
    }
    let changePhone = (e) => {
        phone = e.target.value
    }
    let changeRole = (e, value) => {
        if (value != null)
            roleId = value.id
    }
    let changeStatus = (e, value) => {
        if (value != null)
            statusId = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            parentId = value.id
    }
    return (
        <Dialog
            maxWidth='none'
            open={event.edit.open}
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
                            defaultValue={event.edit.name}
                            name="name" title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên đăng nhập</div>
                        <Input
                            defaultValue={event.edit.username}
                            name="username" title='Tên' onChange={changeUsername}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Email</div>
                        <Input
                            defaultValue={event.edit.email}
                            name="email" title='Email' onChange={changeEmail}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Số điện thoại</div>
                        <Input
                            defaultValue={event.edit.phone}
                            name="phone" title='Số điện thoại' onChange={changePhone}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vai trò</div>
                        <Autocomplete
                            defaultValue={getItem(event.edit.roleId, role)}
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
                            defaultValue={getItem(event.edit.status, status)}
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
                            defaultValue={getItem(event.edit.parentId, userParent)}
                            onChange={changeParent}
                            options={userParent}
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
function Delete(event) {
    let title = ''
    switch (event.data.action) {
        case 'DELETE_USER':
            title = 'Bạn có chắc chắn xóa người dùng ' + event.data.name + ' có email là ' + event.data.email + ' ?'
            break;
        case 4:
            title = 'Bạn có chắc chắn reset mật khẩu người dùng ' + event.data.name + ' có email là ' + event.data.email + ' ?'
            break;
        default:
            break;
    }
    let cancel = (e) => {
        event.cancel(1)
    }
    let confirm = (e) => {
        switch (event.data.action) {
            case 0:
                event.confirm(1, event.data.id)
                break;
            case 'DELETE_USER':
                userService.delete(event.data.id).then(value => {
                    event.confirm('DELETE_USER_SUCCESS', event.data.id)
                }).catch(error => {
                    event.fail('DELETE_USER_FAIL', event.data.id)
                })
                break;
            case 4:
                event.confirm(4, event.data.id)
                break;
            default:
                break;
        }
    }
    return (
        <Dialog
            open={event.data.show}
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
    let close = (e) => {
        event.close(0)
    }
    return (<Snackbar open={event.value.show} autoHideDuration={3000}
        onClose={close}
    >
        <Alert
            style={{ background: '#00d25b', color: 'white' }}
            onClose={close}
            severity={event.value.severity}>
            {event.value.message}
        </Alert>
    </Snackbar>)
}
export { DialogCreateAccount, DialogEditAccount, Delete, AlertCustom }