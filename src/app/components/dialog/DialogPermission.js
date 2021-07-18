import React from 'react';
import {
    Snackbar,
    AppBar, Button, Tab, Tabs, DialogActions, DialogContent, Input, Slider,
    DialogContentText, DialogTitle, Dialog, Paper, Grid as MGrid, MenuItem, Select, TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PermissionService from '../../services/PermissionService'
import RoleService from '../../services/RoleService'
function DialogPermission(event) {
    let confirm = (e) => {
        let permissionService = new PermissionService();
        let permissionRequest = {
            code: document.getElementById('code').value,
            name: document.getElementById('name').value,
            status: parseInt(document.getElementById('status').value)
        }
        switch (event.open.id) {
            case 0:
                permissionService.create(permissionRequest).then(value => {
                    event.confirm(1)
                }).catch(error => {
                    event.fail(1)
                })
                break;
            default:
                permissionService.update(event.open.id, permissionRequest).then(value => {
                    event.confirm(1)
                }).catch(error => {
                    event.fail(1)
                })
                break;
        }
    }
    let cancel = () => {
        event.cancel(1)
    }
    return (
        <Dialog
            maxWidth='none'
            open={event.open.open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{event.open.title}</DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <MGrid container spacing={3}>
                    <MGrid item xs={4}>
                        <div>Mã</div>
                        <Input id='code' name="code" title='Mã' defaultValue={event.open.code}></Input>
                    </MGrid>
                    <MGrid item xs={4}>
                        <div>Tên</div>
                        <Input id='name' name="name" title='Tên' defaultValue={event.open.name}></Input>
                    </MGrid>
                    <MGrid item xs={4}>
                        <div>Trạng thái</div>
                        <Select
                            id='status'
                            native
                            value={event.open.status}
                        >
                            <option value={0}>Đang sử dụng</option>
                            <option value={1}>Đang tạm dừng</option>
                        </Select>
                    </MGrid>
                </MGrid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={cancel} color="primary">Hủy</Button>
                <Button onClick={confirm} color="primary">Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}
function Delete(event) {
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
        event.cancel(4)
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
export { DialogPermission, Delete, AlertCustom }