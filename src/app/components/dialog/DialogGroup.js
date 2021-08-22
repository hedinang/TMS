import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog, TextField
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import Condition from '../../models/Condition';
import GroupService from '../../services/GroupService';
import CookieService from '../../services/CookieService';
import UserService from '../../services/UserService';
import NotificationService from '../../services/NotificationService';
import TruckGroupService from '../../services/TruckGroupService';
let groupService = new GroupService()
let truckGroupService = new TruckGroupService()
let userService = new UserService()
let role = []
let pageSize = 10
let pages = [1, pageSize, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)
let cookieService = new CookieService()
let notificationService = new NotificationService()
let userId = parseInt(cookieService.read('userId'))

function DialogInvitation(event) {
    let [open, setOpen] = useState(false)
    let [data, setData] = useState({ name: '' })
    let [bid, setBid] = useState([])
    let [trucker, setTrucker] = useState()
    useEffect(() => {
        if (event.data.open === true) {
            userService.getTrucker(condition).then(value => {
                bid = value.result.result
                setBid(bid)
            })
            groupService.findById(event.data.id).then(value => {
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
                title = 'Bạn có chắc chắn rời khỏi nhóm thầu ' + data.name + ' ?'

            }).finally(() => {
                setTitle(title)
                setData(data)
                setOpen(event.data.open)
            })
        else
            setOpen(event.data.open)
    }, [event.data.open])

    let cancel = e => {
        event.cancel('EXIT_GROUP')
    }
    let confirm = e => {
        let request = {
            userId: userId,
            groupId: event.data.id
        }
        groupService.exit(request).then(value => {
            event.confirm('EXIT_GROUP_SUCCESS')
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
export { AlertResult, DialogBool, DialogInvitation }