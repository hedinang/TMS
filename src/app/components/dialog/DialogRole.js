import React, { useEffect, useMemo, useState } from 'react';
import {
    Checkbox, GridList, GridListTile, Button, DialogActions,
    DialogContent, Input, Slider, DialogTitle, Dialog, Grid
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
let permission = []



function Init() {
    useEffect(() => {
        // roleService.search(condition).then(value => {
        //     role = value.result
        // })
        permissionService.search(condition).then(value => {
            permission = value.result.map(e => {
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status,
                    checked: false
                }
            })

        })
    }, [])
    return null
}
function DialogCreateRole(event) {
    let [role, setRole] = useState([])
    let [permissionRole, setPermissionRole] = useState([])
    let [totalCheck, setTotalCheck] = useState(0)
    let [all, setAll] = useState(false)
    let code = ''
    let name = ''

    useEffect(() => {
        roleService.search(condition).then(value => {
            setRole(value.result)
        })
        permissionService.search(condition).then(value => {
            setPermissionRole(value.result.map(e => {
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status,
                    checked: false
                }
            }))
            setTotalCheck(0)
        })

    }, [])
    let chossePermission = (event) => {
        if (event.target.id === 'all') {
            setPermissionRole(permissionRole.map(e => {
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status,
                    checked: true
                }
            }))
            setAll(true)
            setTotalCheck(permissionRole.length)
        } else {
            if (event.target.checked === true) {
                if (totalCheck === permission.length - 1)
                    setAll(true)
                setTotalCheck(totalCheck + 1)
                setPermissionRole(
                    permissionRole.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                status: e.status,
                                checked: true
                            }
                        return e
                    }))
            } else {
                setAll(false)
                setTotalCheck(totalCheck - 1)
                setPermissionRole(
                    permissionRole.map(e => {
                        if (e.code === event.target.id)
                            return {
                                id: e.id,
                                code: e.code,
                                name: e.name,
                                status: e.status,
                                checked: false
                            }
                        return e
                    }))
            }
        }
    }
    let changeCode = e => {
        code = e.target.value
    }
    let changeName = e => {
        name = e.target.value
    }
    let cancel = () => {
        event.cancel(0)
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
            event.confirm(0, event.open.id, roleRequest)
        }).catch(error => {
            console.log('aaaa');
        })
        // setStatus(false)

    }
    return (
        <Dialog
            maxWidth='none'
            open={event.open.open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{event.open.title}</DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Mã</div>
                        <Input onChange={changeCode} name="code" title='Mã' defaultValue={event.open.code}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên</div>
                        <Input onChange={changeName} name="name" title='Tên' defaultValue={event.open.name}></Input>
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
                            <div >Có {totalCheck}/{permissionRole.length} loại được chọn</div>
                            <GridList
                                cols={6} >
                                {permissionRole.map(e => {
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
    let [editRole, setEditRole] = useState({})
    let [permissionRole, setPermissionRole] = useState([])
    let [totalCheck, setTotalCheck] = useState(0)
    let [all, setAll] = useState(false)
    let code = ''
    let name = ''
    let [open, setOpen] = useState(false)
    useEffect(() => {
        let init = async () => {
            let a = await (roleService.findById(event.data.id))
            let b = await (permissionService.search(condition))
            setEditRole(a.result)
            setPermissionRole(b.result.map(e => {
                if (e.id === event.data.id) {
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
            }))
            setTotalCheck(totalCheck)
            setOpen(event.data.open)
        }
        init()
        // roleService.findById(event.data.id).then(value => {
        //     setEditRole(value.result)
        // }).catch(error => {
        //     return []
        // }).finally(() => {
        //     setTotalCheck(totalCheck)
        //     setOpen(event.data.open)
        // })
        // permissionService.search(condition).then(value => {
        //     setPermissionRole(value.result.map(e => {
        //         if (e.id === event.data.id) {
        //             totalCheck += 1
        //             return {
        //                 id: e.id,
        //                 code: e.code,
        //                 name: e.name,
        //                 status: e.status,
        //                 checked: true
        //             }
        //         }
        //         return {
        //             id: e.id,
        //             code: e.code,
        //             name: e.name,
        //             status: e.status,
        //             checked: false
        //         }
        //     }))

        // })
    }, [event.data.open, open])
    let chossePermission = (event) => {
        if (event.target.id === 'all') {
            permissionRole = permissionRole.map(e => {
                return {
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    status: e.status,
                    checked: true
                }
            })
            all = true
            totalCheck = permissionRole.length
        } else {
            if (event.target.checked === true) {
                if (totalCheck === permission.length - 1)
                    all = true
                totalCheck = totalCheck + 1
                permissionRole =
                    permissionRole.map(e => {
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
                permissionRole =
                    permissionRole.map(e => {
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
    }
    let changeCode = e => {
        code = e.target.value
    }
    let changeName = e => {
        name = e.target.value
    }
    let cancel = () => {
        event.cancel(0)
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
            event.confirm(0, event.open.id, roleRequest)
        }).catch(error => {
            console.log('aaaa');
        })
        // setStatus(false)

    }
    return (
        <Dialog
            maxWidth='none'
            open={open}
            onClose={cancel}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{event.data.title}</DialogTitle>
            <DialogContent style={{ height: '50rem', width: '80rem', maxWidth: 'none' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div>Mã</div>
                        <Input onChange={changeCode} name="code" title='Mã' defaultValue={editRole.code}></Input>
                    </Grid>
                    <Grid item xs={4}>
                        <div>Tên</div>
                        <Input onChange={changeName} name="name" title='Tên' defaultValue={editRole.name}></Input>
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
                            <div >Có {totalCheck}/{permissionRole.length} loại được chọn</div>
                            <GridList
                                cols={6} >
                                {permissionRole.map(e => {
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
    Init, DialogCreateRole, DialogEditRole
}