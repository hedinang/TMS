import React, { useEffect, useState } from 'react';
import {
    Checkbox, GridList, GridListTile, Button, DialogActions,
    DialogContent, Input, DialogTitle, Dialog, Grid
} from '@material-ui/core';
import RoleService from '../../services/RoleService'
import Condition from '../../models/Condition'
import { faAllergies } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PermissionService from '../../services/PermissionService';
let roleService = new RoleService()
let permissionService = new PermissionService()
let pages = [1, 10, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)


function checkExist(id, array) {
    if (array.filter(e => e.id === id).length === 0)
        return false
    return true
}

function DialogCreateRole(event) {
    let [permission, setPermission] = useState([])
    let [totalCheck, setTotalCheck] = useState(0)
    let [all, setAll] = useState(false)
    let [open, setOpen] = useState(false)
    let [code, setCode] = useState('')
    let [name, setName] = useState('')

    useEffect(() => {
        if (event.data.open === true) {
            permissionService.search(condition).then(value => {
                setPermission(value.result.map(e => {
                    return {
                        id: e.id,
                        code: e.code,
                        name: e.name,
                        status: e.status,
                        checked: false
                    }
                }))
            })
            setTotalCheck(0)
            setName('')
            setCode('')
            setAll(false)
        }
        setOpen(event.data.open)
    }, [event.data.open])
    let chossePermission = (event) => {
        if (event.target.id === 'all') {
            permission = permission.map(e => {
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status,
                    checked: true
                }
            })
            all = true
            totalCheck = permission.length

        } else {
            if (event.target.checked === true) {
                if (totalCheck === permission.length - 1)
                    all = true
                totalCheck = totalCheck + 1
                permission =
                    permission.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                status: e.status,
                                checked: true
                            }
                        return e
                    })
            } else {
                all = false
                totalCheck = totalCheck - 1
                permission =
                    permission.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                status: e.status,
                                checked: false
                            }
                        return e
                    })
            }
        }
        setName(name)
        setCode(code)
        setPermission(permission)
        setAll(all)
        setTotalCheck(totalCheck)
    }
    let changeCode = e => {
        code = e.target.value
    }
    let changeName = e => {
        name = e.target.value
    }
    let cancel = () => {
        event.cancel('CREATE_ROLE')
    }
    let confirm = () => {
        let roleRequest = {
            code: code,
            name: name,
            permission: permission.reduce((result, e) => {
                if (e.checked === true) result.push(e.id)
                return result
            }, [])
        }
        roleService.create(roleRequest).then(value => {
            event.confirm('CREATE_ROLE_SUCCESS')
        }).catch(error => {
            console.log('aaaa');
        })
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
                        <Input onChange={changeCode} name="code" title='Mã' defaultValue={code}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên</div>
                        <Input onChange={changeName} name="name" title='Tên' defaultValue={name}></Input>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ textAlign: 'center' }}>Quyền hạn</div>
                        <div style={{ 'background-color': 'white', 'color': 'black' }}>
                            <button id='all'
                                disabled={all}
                                type="button" className="btn btn-success mt-1 mb-1"
                                onClick={chossePermission}
                            >
                                <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                                    Chọn tất</button>
                            <div >Có {totalCheck}/{permission.length} loại được chọn</div>
                            <GridList
                                cols={6} >
                                {permission.map(e => {
                                    return <GridListTile key={e.code}>
                                        <div >
                                            <Checkbox id={e.code}
                                                checked={e.checked}
                                                onClick={chossePermission}
                                            />
                                            {e.name}
                                        </div>
                                    </GridListTile>
                                })}
                            </GridList>
                        </div>
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

function DialogEditRole(event) {
    let [code, setCode] = useState('')
    let [name, setName] = useState('')
    let permissionRole = []
    let [permission, setPermission] = useState([])
    let [totalCheck, setTotalCheck] = useState(0)
    let [all, setAll] = useState(false)
    let [open, setOpen] = useState(false)
    useEffect(() => {
        if (event.data.open === false)
            setOpen(false)
        else
            roleService.findById(event.data.id).then(value => {
                code = value.result.code
                name = value.result.name
                totalCheck = 0
                if (value.result.permission !== null)
                    permissionRole = value.result.permission
                return permissionService.search(condition)
            }).then(value => {
                permission = value.result.map(e => {
                    if (checkExist(e.id, permissionRole)) {
                        totalCheck += 1
                        return {
                            id: e.id,
                            code: e.code,
                            name: e.name,
                            status: e.status,
                            checked: true
                        }
                    }
                    return {
                        id: e.id,
                        code: e.code,
                        name: e.name,
                        status: e.status,
                        checked: false
                    }
                })
                all = totalCheck === permission.length ? true : false
                setPermission(permission)
                setTotalCheck(totalCheck)
                setAll(all)
                setCode(code)
                setName(name)
            }).catch(error => {
                return []
            }).finally(() => {
                setOpen(true)
            })
    }, [event.data.open])
    let chossePermission = (event) => {
        if (event.target.id === 'all') {
            permission = permission.map(e => {
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status,
                    checked: true
                }
            })
            all = true
            totalCheck = permission.length
        } else {
            if (event.target.checked === true) {
                if (totalCheck === permission.length - 1)
                    all = true
                totalCheck = totalCheck + 1
                permission =
                    permission.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                status: e.status,
                                checked: true
                            }
                        return e
                    })
            } else {
                all = false
                totalCheck = totalCheck - 1
                permission =
                    permission.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                status: e.status,
                                checked: false
                            }
                        return e
                    })
            }
        }
        setPermission(permission)
        setAll(all)
        setTotalCheck(totalCheck)
    }
    let changeCode = e => {
        code = e.target.value
    }
    let changeName = e => {
        name = e.target.value
    }
    let cancel = () => {
        event.cancel('UPDATE_ROLE')
    }
    let confirm = () => {
        let roleRequest = {
            code: code,
            name: name,
            permission: permission.reduce((result, e) => {
                if (e.checked === true) result.push(e.id)
                return result
            }, [])
        }
        roleService.update(event.data.id, roleRequest).then(value => {
            event.confirm('UPDATE_ROLE_SUCCESS')
        }).catch(error => {
            event.fail('UPDATE_ROLE_FAIL')
        })
    }
    return (
        <Dialog maxWidth='none'
            open={open}
            onClose={cancel}>
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{event.data.title}</DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Mã</div>
                        <Input onChange={changeCode} name="code" title='Mã' defaultValue={code}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên</div>
                        <Input onChange={changeName} name="name" title='Tên' defaultValue={name}></Input>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ textAlign: 'center' }}>Quyền hạn</div>
                        <div style={{ 'background-color': 'white', 'color': 'black' }}>
                            <button id='all'
                                disabled={all}
                                type="button" className="btn btn-success mt-1 mb-1"
                                onClick={chossePermission}
                            >
                                <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                                    Chọn tất</button>
                            <div >Có {totalCheck}/{permission.length} loại được chọn</div>
                            <GridList
                                cols={6} >
                                {permission.map(e => {
                                    return <GridListTile key={e.code}>
                                        <div >
                                            <Checkbox id={e.code}
                                                checked={e.checked}
                                                onClick={chossePermission}
                                            />
                                            {e.name}
                                        </div>
                                    </GridListTile>
                                })}
                            </GridList>
                        </div>
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
export {
    DialogCreateRole, DialogEditRole
}