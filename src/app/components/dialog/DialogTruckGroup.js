import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog, TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import Condition from '../../models/Condition';
import TruckGroupService from '../../services/TruckGroupService';
import CookieService from '../../services/CookieService';
import UserService from '../../services/UserService';
import NotificationService from '../../services/NotificationService';
let truckGroupService = new TruckGroupService()
let userService = new UserService()
let role = []
let pageSize = 10
let pages = [1, pageSize, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)
let cookieService = new CookieService()
let notificationService = new NotificationService()
function DialogCreateTruckGroup(event) {
    let [open, setOpen] = useState(false)
    let [name, setName] = useState('')
    useEffect(() => {
        setOpen(event.create.open)
    }, [event.create.open])

    let confirm = () => {
        truckGroupService.create({
            name: name,
            userParent: parseInt(cookieService.read('userId')),
            truckers: []
        }).then(value => {
            event.confirm('CREATE_TRUCKER_GROUP_SUCCESS')
        })

    }
    let changeName = (e) => {
        name = e.target.value
    }
    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={event.cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Thêm mới
            </DialogTitle>
            <DialogContent>
                <div>Tên nhóm thầu</div>
                <Input onChange={changeName}></Input>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={event.cancel} color="primary">
                    Hủy
                </Button>
                <Button onClick={confirm} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}
function DialogEditTruckGroup(event) {
    let [open, setOpen] = useState(false)
    let [data, setData] = useState({ name: '' })
    useEffect(() => {
        truckGroupService.findById(event.edit.id).then(value => {
            data = value.result
        }).finally(() => {
            setData(data)
            setOpen(event.edit.open)
        })
    }, [event.edit.open])

    let confirm = () => {
        truckGroupService.update(event.edit.id, data).then(value => {
            event.confirm('UPDATE_TRUCKER_GROUP_SUCCESS')
        })
    }
    let changeName = (e) => {
        data.name = e.target.value
    }
    let cancel = e => {
        event.cancel('EDIT_TRUCKER_GROUP')
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
            <DialogContent>
                <div>Tên nhóm thầu</div>
                <TextField onChange={changeName} defaultValue={data.name} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={event.cancel} color="primary">
                    Hủy
                </Button>
                <Button onClick={confirm} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}
function DialogInvitation(event) {
    let [open, setOpen] = useState(false)
    let [data, setData] = useState({ name: '' })
    let [bid, setBid] = useState([])
    let [trucker, setTrucker] = useState()
    useEffect(() => {
        if (event.data.open === true) {
            userService.getTrucker(condition).then(value => {
                bid = value.result
                setBid(bid)
            })
                .catch(error => {
                    console.log('aa');
                })
            truckGroupService.findById(event.data.id).then(value => {
                data = value.result
            }).finally(() => {
                setData(data)
                setOpen(event.data.open)
            })
        } else
            setOpen(event.data.open)


    }, [event.data.open])

    let confirm = () => {

        let request = {
            userId: trucker,
            groupId: data.id,
            type: 1,
            content: 'Lời mời gia nhập nhóm thầu ' + data.name,
            status: 1
        }
        notificationService.create(request).finally(() => {
            event.confirm('INVITATION_TRUCKER_GROUP_SUCCESS')
        })
    }
    let changeBid = (e, value) => {
        setTrucker(value.id)
    }
    let cancel = e => {
        event.cancel('INVITATION')
    }

    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Gửi lời mời nhà thầu vào nhóm {data.name}
            </DialogTitle>
            <DialogContent>
                <div>Nhà thầu</div>
                <Autocomplete
                    onChange={changeBid}
                    options={bid}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '13rem' }}
                    renderInput={(params) => <TextField {...params} />}
                />
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
    return (<Snackbar open={event.data.open} autoHideDuration={3000}
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
    let [data, setData] = useState({ name: '' })
    useEffect(() => {
        if (event.data.open === true)
            truckGroupService.findById(event.data.id).then(value => {
                data = value.result
                title = 'Bạn có chắc chắn xóa nhóm thầu ' + data.name + ' ?'

            }).finally(() => {
                setTitle(title)
                setData(data)
                setOpen(event.data.open)
            })
        else
            setOpen(event.data.open)
    }, [event.data.open])

    let cancel = e => {
        event.cancel('DELETE_TRUCKER_GROUP')
    }
    let confirm = e => {
        truckGroupService.delete(event.data.id).then(value => {
            event.confirm('DELETE_TRUCKER_GROUP_SUCCESS')
        })
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
export { DialogCreateTruckGroup, DialogEditTruckGroup, AlertResult, DialogBool, DialogInvitation }