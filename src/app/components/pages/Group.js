import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { TableGroup, TableMember } from '../tables/TableGroup';
import { faSignOutAlt, faAllergies, faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogCreateGroup, AlertResult } from '../dialog/DialogGroup';
function Group(props) {
    
    let [create, setCreate] = useState({ open: false })
    let [reloadGroup, setReloadGroup] = useState(false)
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    useEffect(() => {
        setReloadGroup(!reloadGroup)
        // setReloadGroup(props.location.test)
    }, [])
    let [view, setView] = useState({ id: 0 })
    let changeView = (id) => {
        setView({ id: id })
    }
    let addItem = () => {
        setCreate({ open: true })
    }

    let confirm = event => {
        switch (event) {
            case 'CREATE_TRUCKER_GROUP_SUCCESS':
                setCreate({ open: false })
                setAlert({
                    open: true,
                    message: 'Tạo thành công',
                    severity: 'success'
                })
                setReloadGroup(!reloadGroup)
                break;

            default:
                break;
        }
    }
    let cancel = () => {
        setCreate({ open: false })
    }
    let close = (e) => {
        setAlert({
            open: false,
            message: 'Tạo thành công',
            severity: 'success'
        })
    }
    return (
        <div>
            <div className="mb-2" style={{ textAlign: 'center', color: 'black', overflow: 'visible' }}>Danh sách các nhóm đã tham gia</div>
            <AlertResult
                data={alert}
                close={close} />
            <div className='row'>
                <div className='col-12'>
                    <TableGroup reload={reloadGroup} changeView={changeView} />
                </div>
                {/* <div className='col-12'>
                    <TableMember view={view} />
                </div> */}
            </div>
        </div >
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(Group);