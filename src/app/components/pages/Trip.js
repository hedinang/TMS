import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faPlusSquare, faAllergies, faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridList, GridListTile, Checkbox } from '@material-ui/core'
import { action } from '../../redux/actions/actions'
import { DialogCreateTrip, AlertCustom } from '../dialog/DialogTrip'
import TabPanelTrip from '../tabPanel/TabPanelTrip';
let Show = connect(select)(props => {
    let [selectedOrder, setSelectedOrder] = useState([])
    let [selectedQuotation, setSelectedQuotation] = useState([])
    let [selectedTrip, setSelectedTrip] = useState([])
    let [checkedOrder, setCheckedOrder] = useState(0)
    let [checkedQuotation, setCheckedQuotation] = useState(0)
    let [checkedTrip, setCheckedTrip] = useState(0)
    let [disabledTrip, setDisabledTrip] = useState(false)
    let [disabledOrder, setDisabledOrder] = useState(false)
    let [disabledQuotation, setDisabledQuotation] = useState(false)
    let [show, setShow] = useState('none')
    let [pickShow, setPickShow] = useState({
        trip: 'inline',
        order: 'none',
        quotation: 'none'
    })

    let [create, setCreate] = useState({
        open: false,

    })
    useEffect(() => {
        switch (props.tab) {
            case 0:
                setPickShow({
                    trip: 'inline',
                    order: 'none',
                    quotation: 'none'
                })
                break;
            case 1:
                setPickShow({
                    trip: 'none',
                    order: 'inline',
                    quotation: 'none'
                })
                break;
            case 2:
                setPickShow({
                    trip: 'none',
                    order: 'none',
                    quotation: 'inline'
                })
                break;
            default:
                break;
        }

        checkedTrip = 0
        checkedOrder = 0
        checkedQuotation = 0
        selectedTrip = props.state.selectedTrip.reduce((array, e) => {
            if (e.checked === true) {
                array.push(
                    {
                        field: e.field,
                        title: e.title,
                        checked: e.checked
                    })
                checkedTrip += 1
            }
            return array

        }, [])
        selectedOrder = props.state.selectedOrder.reduce((array, e) => {
            if (e.checked === true) {
                array.push(
                    {
                        field: e.field,
                        title: e.title,
                        checked: e.checked
                    })
                checkedOrder += 1
            }
            return array

        }, [])
        selectedQuotation = props.state.selectedQuotation.reduce((array, e) => {
            if (e.checked === true) {
                array.push(
                    {
                        field: e.field,
                        title: e.title,
                        checked: e.checked
                    })
                checkedQuotation += 1
            }
            return array

        }, [])
        setSelectedTrip(selectedTrip)
        setSelectedOrder(selectedOrder)
        setSelectedQuotation(selectedQuotation)
        setCheckedTrip(checkedTrip)
        setCheckedOrder(checkedOrder)
        setCheckedQuotation(checkedQuotation)
        if (checkedTrip === selectedTrip.length) setDisabledTrip(true)
        if (checkedOrder === selectedOrder.length) setDisabledOrder(true)
        if (checkedQuotation === selectedQuotation.length) setDisabledQuotation(true)
    }, [props.tab])
    let clickShow = () => {
        if (show === 'none') setShow('inline')
        else setShow('none')
    }
    let clickAllTrip = (event, id) => {
        if (id === 'all') {
            selectedTrip = selectedTrip.map(e => {
                e.checked = true
                return e
            })
            checkedTrip = selectedTrip.length
            setSelectedTrip(selectedTrip)
            setCheckedTrip(checkedTrip)
        }
        else {
            if (event.target.checked) {
                checkedTrip += 1
                selectedTrip = selectedTrip.map(e => {
                    if (e.field === id)
                        e.checked = true
                    return e
                })
            } else {
                checkedTrip -= 1
                selectedTrip = selectedTrip.map(e => {
                    if (e.field === id)
                        e.checked = false
                    return e
                })
            }
            props.dispatch(action('CHANGE_SELECTED_TRIP', selectedTrip))
            setSelectedTrip(selectedTrip)
            setCheckedTrip(checkedTrip)
        }
        if (checkedTrip === selectedTrip.length)
            setDisabledTrip(true)
        else
            setDisabledTrip(false)
        props.loadSelected()
    }
    let clickAllOrder = (event, id) => {
        if (id === 'all') {
            selectedOrder = selectedOrder.map(e => {
                e.checked = true
                return e
            })
            checkedOrder = selectedOrder.length
            setSelectedOrder(selectedOrder)
            setCheckedOrder(checkedOrder)
        }
        else {
            if (event.target.checked) {
                checkedOrder += 1
                selectedOrder = selectedOrder.map(e => {
                    if (e.field === id)
                        e.checked = true
                    return e
                })
            } else {
                checkedOrder -= 1
                selectedOrder = selectedOrder.map(e => {
                    if (e.field === id)
                        e.checked = false
                    return e
                })
            }
            props.dispatch(action('CHANGE_SELECTED_ORDER', selectedOrder))
            setSelectedOrder(selectedOrder)
            setCheckedOrder(checkedOrder)
        }
        if (checkedOrder === selectedOrder.length)
            setDisabledOrder(true)
        else
            setDisabledOrder(false)
        props.loadSelected()
    }
    let clickAllQuotation = (event, id) => {
        if (id === 'all') {
            selectedQuotation = selectedQuotation.map(e => {
                e.checked = true
                return e
            })
            checkedQuotation = selectedQuotation.length
            setSelectedQuotation(selectedQuotation)
            setCheckedQuotation(checkedQuotation)
        }
        else {
            if (event.target.checked) {
                checkedQuotation += 1
                selectedQuotation = selectedQuotation.map(e => {
                    if (e.field === id)
                        e.checked = true
                    return e
                })
            } else {
                checkedQuotation -= 1
                selectedQuotation = selectedQuotation.map(e => {
                    if (e.field === id)
                        e.checked = false
                    return e
                })
            }
            props.dispatch(action('CHANGE_SELECTED_QUOTATION', selectedQuotation))
            setSelectedQuotation(selectedQuotation)
            setCheckedQuotation(checkedQuotation)
        }
        if (checkedQuotation === selectedQuotation.length)
            setDisabledQuotation(true)
        else
            setDisabledQuotation(false)

        props.loadSelected()
    }

    let addItem = () => {
        setCreate({
            open: true
        })
    }
    let confirm = (event) => {
        setCreate({
            open: false
        })
        props.loadSelected(event)
    }
    let cancel = () => {
        setCreate({
            open: false
        })
    }
    return (
        <div style={{ 'background-color': 'white', 'color': 'black' }}>
            <div>
                <button
                    style={{
                        textAlign: 'text-top', background: 'white', height: '2rem', outlineStyle: 'none',
                        color: 'black', width: '8rem', borderRadius: '5px', border: 'none'
                    }}
                    onClick={clickShow}>
                    <FontAwesomeIcon icon={faEye} className='mr-2' />
                HIỂN THỊ
                </button>
                <button
                    style={{
                        textAlign: 'text-top', background: 'white', height: '2rem', outlineStyle: 'none',
                        color: 'black', width: '8rem', borderRadius: '5px', border: 'none',
                    }}
                    onClick={addItem}
                >
                    <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                TẠO MỚI
                </button>
            </div>
            <div style={{ display: `${show}` }} >
                <DialogCreateTrip
                    create={create}
                    confirm={confirm}
                    cancel={cancel}
                />
                <div style={{ display: `${pickShow.trip}` }} >
                    <button disabled={disabledTrip}
                        style={{
                            textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                            color: 'white', width: '6rem', borderRadius: '5px', marginTop: '5px'
                        }}
                        onClick={event => { clickAllTrip(event, 'all') }}>
                        <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                Chọn tất
                </button>
                    <div >Có {checkedTrip}/{selectedTrip.length} loại được chọn hiển thị chuyến hàng</div>
                    <GridList cellHeight={50} cols={6} >
                        {selectedTrip.map(e => {
                            return <GridListTile key={e.field}>
                                <div >
                                    <Checkbox
                                        style={{ color: '#fc424a' }}
                                        checked={e.checked}
                                        onClick={event => {
                                            clickAllTrip(event, e.field)
                                        }}
                                    />
                                    {e.title}
                                </div>
                            </GridListTile>
                        })}
                    </GridList>
                </div>
                <div style={{ display: `${pickShow.order}` }} >
                    <button disabled={disabledOrder}
                        style={{
                            textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                            color: 'white', width: '6rem', borderRadius: '5px', marginTop: '5px'
                        }}
                        onClick={event => { clickAllOrder(event, 'all') }}>
                        <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                Chọn tất
                </button>
                    <div >Có {checkedOrder}/{selectedOrder.length} loại được chọn hiển thị đơn hàng</div>
                    <GridList cellHeight={50} cols={6} >
                        {selectedOrder.map(e => {
                            return <GridListTile key={e.field}>
                                <div >
                                    <Checkbox
                                        style={{ color: '#fc424a' }}
                                        checked={e.checked}
                                        onClick={event => {
                                            clickAllOrder(event, e.field)
                                        }}
                                    />
                                    {e.title}
                                </div>
                            </GridListTile>
                        })}
                    </GridList>
                </div>
                <div style={{ display: `${pickShow.quotation}` }} >
                    <button disabled={disabledQuotation}
                        style={{
                            textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                            color: 'white', width: '6rem', borderRadius: '5px', marginTop: '5px'
                        }}
                        onClick={event => { clickAllQuotation(event, 'all') }}>
                        <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                Chọn tất
                </button>
                    <div >Có {checkedQuotation}/{selectedQuotation.length} loại được chọn hiển thị báo giá</div>
                    <GridList cellHeight={50} cols={6} >
                        {selectedQuotation.map(e => {
                            return <GridListTile key={e.field}>
                                <div >
                                    <Checkbox
                                        style={{ color: '#fc424a' }}
                                        checked={e.checked}
                                        onClick={event => {
                                            clickAllQuotation(event, e.field)
                                        }}
                                    />
                                    {e.title}
                                </div>
                            </GridListTile>
                        })}
                    </GridList>
                </div>
            </div>
        </div >
    )
})
function Trip(props) {
    let [reload, setReload] = useState(false)
    let [alert, setAlert] = useState({
        open: false,
        message: 'Tạo thành công',
        severity: 'success'
    })
    let [tab, setTab] = useState(0)
    useEffect(() => {
        console.log('aaaa');
    }, [])
    let loadSelected = (event) => {
        switch (event) {
            case 'CREATE_ORDER_SUCCESS':
                setAlert({
                    open: true,
                    message: 'Tạo thành công đơn hàng',
                    severity: 'success',
                })
                setReload(!reload)
            default:
                setReload(!reload)
        }
    }
    let close = (e) => {
        setAlert({
            open: false,
            message: 'Tạo thành công',
            severity: 'success'
        })
    }
    let changeTab = (value) => {
        setTab(value)
    }
    return (
        <div>
            <div className="mb-2" style={{ textAlign: 'center', color: 'black', overflow: 'visible' }}>Quản lý đặt chuyến</div>
            <Show loadSelected={loadSelected} tab={tab} />
            <TabPanelTrip reload={reload} changeTab={changeTab} />
            <AlertCustom data={alert}
                close={close}
            />
        </div >
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(Trip)