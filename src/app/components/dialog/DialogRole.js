import React, { useEffect, useState } from 'react';
import {
    Snackbar, Checkbox, GridList, GridListTile,
    AppBar, Button, Tab, Tabs, DialogActions, DialogContent, Input, Slider,
    DialogContentText, DialogTitle, Dialog, Paper, Grid as MGrid, MenuItem, Select, TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import RoleService from '../../services/RoleService'
import Condition from '../../models/Condition'
import { faAllergies } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { set } from 'date-fns';

function DialogRole(event) {
    let roleService = new RoleService();
    let pages = [1, 10, "id", 0]
    let conditions = []
    let condition = new Condition(pages, conditions)
    const [permission, setPermission] = useState([])
    const [checked, setChecked] = useState(0)
    const [all, setAll] = useState(false)
    const [status, setStatus] = useState(false)
    if (event.open.open === true && status === false) {
        let count = 0
        setPermission(
            event.data.map(e => {
                if (event.open.permission.some(element =>
                    element.id === e.id
                )) {
                    count += 1
                    return {
                        id: e.id,
                        code: e.code,
                        name: e.name,
                        checked: true
                    }
                }
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    checked: false
                }
            }))
        if (count < event.data.length) setAll(false)
        setChecked(count)
        setStatus(true)
    }
    let clickDetail = (event) => {
        if (event.target.id === 'all') {
            setChecked(permission.length)
            setAll(true)
            setPermission(
                permission.map(e => {
                    return {
                        id: e.id,
                        code: e.code,
                        name: e.name,
                        checked: true
                    }
                })
            )
        } else {
            if (event.target.checked === true) {
                if (checked === permission.length - 1)
                    setAll(true)
                setChecked(checked + 1)
                setPermission(
                    permission.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                checked: true
                            }
                        return e
                    })
                )
            }
            else {
                if (checked <= permission.length)
                    setAll(false)
                setChecked(checked - 1)
                setPermission(
                    permission.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                checked: false
                            }
                        return e
                    })
                )
            }
        }

    }
    let cancel = () => {
        setStatus(false)
        event.cancel(0)
    }
    let confirm = () => {

        let roleRequest = {
            code: document.getElementById('code').value,
            name: document.getElementById('name').value,
            permission: permission.reduce((result, e) => {
                if (e.checked === true) result.push(e.id)
                return result
            }, [])
        }
        setStatus(false)
        event.confirm(0, event.open.id, roleRequest)

       
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
                    </MGrid>
                    <MGrid item xs={12}>
                        <div style={{ textAlign: 'center' }}>Quyền hạn</div>
                        <div style={{ 'background-color': 'white', 'color': 'black' }}>
                            <button id='all'
                                disabled={all}
                                type="button" className="btn btn-success mt-1 mb-1"
                                onClick={clickDetail}
                            >
                                <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                                    Chọn tất</button>
                            <div >Có {checked}/{permission.length} loại được chọn</div>
                            <GridList
                                // cellHeight={50} 
                                cols={6} >
                                {permission.map(e => {
                                    return <GridListTile key={e.code}>
                                        <div >
                                            <Checkbox id={e.code}
                                                checked={e.checked}
                                                onClick={clickDetail}
                                            />
                                            {e.name}
                                        </div>
                                    </GridListTile>
                                })}
                            </GridList>
                        </div>
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

export {
    DialogRole,
}