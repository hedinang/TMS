import React, { useEffect, useState } from 'react';
import {
    Button, DialogActions, DialogContent, Input, DialogTitle, Dialog
} from '@material-ui/core';
import RoleService from '../../services/RoleService'
import UserService from '../../services/UserService';
import PermissionService from '../../services/PermissionService';
import AddressService from '../../services/AddressService';
let userService = new UserService()
let roleService = new RoleService()
let permissionService = new PermissionService()
let addressService = new AddressService()
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

            default:
                break;
        }
        setTitle(title)
        setOpen(event.data.action)
    }, [event.data.action])
    let cancel = (e) => {
        event.cancel(event.data.action)
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
            case 'DELETE_PERMISSION_ROLE':
                let request = {
                    roleId: event.data.roleId,
                    permissionId: event.data.permissionId
                }
                roleService.removePermission(request).then(value => {
                    event.confirm('DELETE_PERMISSION_ROLE_SUCCESS', event.data.roleId)
                }).catch(error => {
                    event.fail('DELETE_PERMISSION_ROLE_FAIL', event.data.roleId)
                })
                break;
            case 'DELETE_ROLE':
                roleService.delete(event.data.roleId).then(value => {
                    event.confirm('DELETE_ROLE_SUCCESS', event.data.parentId)
                }).catch(error => {
                    event.fail('DELETE_ROLE_FAIL', event.data.parentId)
                })
                break;
            case 'RESET_USER':
                userService.reset(event.data.id, '12345').then(value => {
                    event.confirm('RESET_USER_SUCCESS', event.data.parentId)
                }).catch(error => {
                    event.fail('RESET_USER_FAIL', event.data.parentId)
                })
                break;
            case 'DELETE_PERMISSION':
                permissionService.delete(event.data.id).then(value => {
                    event.confirm('DELETE_PERMISSION_SUCCESS', event.data.parentId)
                }).catch(error => {
                    event.fail('DELETE_PERMISSION_FAIL', event.data.parentId)
                })
                break;
            case 'DELETE_ADDRESS':
                addressService.delete(event.data.id).then(value => {
                    event.confirm('DELETE_ADDRESS_SUCCESS')
                }).catch(error => {
                    event.fail('DELETE_PERMISSION_FAIL')
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
export { DialogBool }