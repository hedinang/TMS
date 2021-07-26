import React, { useEffect, useState } from 'react';
import {
    Snackbar, Grid, Button, DialogActions, DialogContent, Input, DialogTitle, Dialog, TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Condition from '../../models/Condition';
import AddressService from '../../services/AddressService';
let addressService = new AddressService();
let role = []
let pageSize = 10
let pages = [1, pageSize, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)

function DialogCreateAddress(event) {
    let [open, setOpen] = useState(false)
    let [address, setAddress] = useState({})
    let [type, setType] = useState([])
    let [parent, setParent] = useState([])
    let getItem = (id, array) => {
        if (id === undefined)
            return {}
        let a = array.filter(e => e.id === id)[0]
        return a
    }
    useEffect(() => {
        if (event.create.open === true) {
            addressService.search(condition)
                .then(value => {
                    parent = value.result
                })
                .finally(() => {
                    setParent(parent)
                    setType(type)
                    setOpen(true)
                })
            type = [
                { id: 0, name: 'Tỉnh' },
                { id: 1, name: 'Huyện' },
                { id: 2, name: 'Xã' }
            ]
        }
        else
            setOpen(false)
    }, [event.create.open])
    let confirm = () => {
        addressService.create(address).then(value => {
            event.confirm('CREATE_ADDRESS_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('CREATE_ADDRESS')
    }
    let changeName = (e) => {
        address.name = e.target.value
    }
    let changeLocation = (e) => {
        address.location = e.target.value
    }
    let changeType = (e, value) => {
        if (value != null)
            address.type = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            address.parentId = value.id
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
                        <div>Tên địa chỉ</div>
                        <Input
                            name="name" title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vị trí</div>
                        <Input
                            name="username" title='Tên' onChange={changeLocation}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Địa chỉ cha</div>
                        <Autocomplete
                            onChange={changeParent}
                            options={parent}
                            getOptionLabel={option => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Loại</div>
                        <Autocomplete
                            onChange={changeType}
                            options={type}
                            getOptionLabel={(option) => option.name}
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
function DialogEditAddress(event) {
    let [open, setOpen] = useState(false)
    let [address, setAddress] = useState({})
    let [type, setType] = useState([])
    let [parent, setParent] = useState([])
    let getItem = (id, array) => {
        if (id === undefined)
            return {}
        let a = array.filter(e => e.id === id)[0]
        return a
    }
    useEffect(() => {
        if (event.data.open === true) {
            addressService.findById(event.data.id)
                .then(value => {
                    address = value.result
                    return addressService.search(condition)
                })
                .then(value => {
                    parent = value.result
                })
                .finally(() => {
                    setAddress(address)
                    setParent(parent)
                    setType(type)
                    setOpen(true)
                })
            type = [
                { id: 0, name: 'Tỉnh' },
                { id: 1, name: 'Huyện' },
                { id: 2, name: 'Xã' }
            ]
        }
        else
            setOpen(false)
    }, [event.data.open])
    let confirm = () => {
        addressService.update(address.id, address).then(value => {
            event.confirm('UPDATE_ADDRESS_SUCCESS')
        }).catch(error => {
            event.fail(1)
        })
    }
    let cancel = () => {
        event.cancel('UPDATE_ADDRESS')
    }
    let changeName = (e) => {
        address.name = e.target.value
    }
    let changeLocation = (e) => {
        address.location = e.target.value
    }
    let changeType = (e, value) => {
        if (value != null)
            address.type = value.id
    }
    let changeParent = (e, value) => {
        if (value != null)
            address.parentId = value.id
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
                        <div>Tên địa chỉ</div>
                        <Input
                            defaultValue={address.name} title='Tên' onChange={changeName}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Vị trí</div>
                        <Input
                            defaultValue={address.location} title='Tên' onChange={changeLocation}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Địa chỉ cha</div>
                        <Autocomplete
                            defaultValue={getItem(address.parentId, parent)}
                            onChange={changeParent}
                            options={parent}
                            getOptionLabel={option => option.name}
                            style={{ width: '13rem' }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <div>Loại</div>
                        <Autocomplete
                            defaultValue={getItem(address.type, type)}
                            onChange={changeType}
                            options={type}
                            getOptionLabel={(option) => option.name}
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
function AlertCustom(event) {
    return (<Snackbar open={event.data.open} autoHideDuration={3000}
        onClose={event.close}
    >
        <Alert
            style={{ background: '#00d25b', color: 'white' }}
            onClose={event.close}
            severity={event.data.severity}>
            {event.data.message}
        </Alert>
    </Snackbar>)
}
export { DialogCreateAddress, DialogEditAddress, AlertCustom }