import React, { useState } from 'react';
import { connect } from 'react-redux'
import { TableTruck, TableGroup, TableInvitation, TableMember } from '../tables/TableTruckGroup';
import { faPlusSquare, faAllergies, faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogCreateTruckGroup, AlertResult } from '../dialog/DialogTruckGroup';
function TruckGroup() {
    let [create, setCreate] = useState({ open: false })
    let [reloadGroup, setReloadGroup] = useState(false)
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let [view, setView] = useState({ id: 0, load: false })
    let changeView = (id) => {

        setView({ id: id, load: !view.load })
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
            <div className="mb-2" style={{ textAlign: 'center', color: 'black', overflow: 'visible' }}>Danh sách nhóm thầu</div>
            <button
                style={{
                    textAlign: 'text-top', background: 'white', height: '2rem', outlineStyle: 'none',
                    color: 'black', width: '8rem', borderRadius: '5px', border: 'none',
                }}
                onClick={addItem}
            >
                <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                TẠO NHÓM
                </button>
            <DialogCreateTruckGroup create={create}
                confirm={confirm}
                cancel={cancel}
            />
            <AlertResult
                data={alert}
                close={close} />
            <div className='row'>
                <div className='col-3'>
                    <TableTruck />
                </div>
                <div className='col-5'>
                    <TableGroup reload={reloadGroup} changeView={changeView} />
                </div>
                <div className='col-4'>
                    <TableMember view={view} />
                </div>
            </div>
        </div >
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TruckGroup);