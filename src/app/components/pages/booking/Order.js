import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faPlusSquare, faAllergies, faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GridList, GridListTile, Checkbox } from '@material-ui/core';
import TabPanelOrder from '../../tabPanel/TabPanelOrder';
import { action } from '../../../redux/actions/actions'
import { DialogCreateOrder } from '../../dialog/DialogOrder';

let Show = connect(select)(props => {
    let [selectedOrder, setSelectedOrder] = useState([])
    let [selectedQuotation, setSelectedQuotation] = useState([])
    let [checkedOrder, setCheckedOrder] = useState(0)
    let [checkedQuotation, setCheckedQuotation] = useState(0)
    let [disabledOrder, setDisabledOrder] = useState(false)
    let [disabledQuotation, setDisabledQuotation] = useState(false)
    let [show, setShow] = useState('none')
    let [create, setCreate] = useState({
        open: false,

    })
    useEffect(() => {
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
        setSelectedOrder(selectedOrder)
        setSelectedQuotation(selectedQuotation)
        setCheckedOrder(checkedOrder)
        setCheckedQuotation(checkedQuotation)
        if (checkedOrder === selectedOrder.length) setDisabledOrder(true)
        if (checkedQuotation === selectedQuotation.length) setDisabledQuotation(true)
    }, [])
    let clickShow = () => {
        if (show === 'none') setShow('inline')
        else setShow('none')
    }
    let clickAllOrder = (event) => {
        let id = event.target.id.split('&')[1]
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
    let clickAllQuotation = (event) => {
        let id = event.target.id.split('&')[1]
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
    let cancel = () => {
        setCreate({
            open: false
        })
    }
    return (
        <div style={{ 'background-color': 'white', 'color': 'black' }}>
            <div></div>
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
                <DialogCreateOrder
                    create={create}
                    confirm={addItem}
                    cancel={cancel}
                />
                <button id='order&all' disabled={disabledOrder}
                    style={{
                        textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                        color: 'white', width: '6rem', borderRadius: '5px', marginTop: '5px'
                    }}
                    onClick={clickAllOrder}>
                    <FontAwesomeIcon icon={faAllergies} className='mr-2' />
                Chọn tất
                </button>
                <div >Có {checkedOrder}/{selectedOrder.length} loại được chọn hiển thị đơn hàng cần chuyển</div>
                <GridList cellHeight={50} cols={6} >
                    {selectedOrder.map(e => {
                        return <GridListTile key={e.field}>
                            <div >
                                <Checkbox
                                    style={{ color: '#fc424a' }}
                                    id={'order&' + e.field}
                                    checked={e.checked}
                                    onClick={clickAllOrder}
                                />
                                {e.title}
                            </div>
                        </GridListTile>
                    })}
                </GridList>
                <button id='quotation&all' disabled={disabledQuotation}
                    style={{
                        textAlign: 'text-top', background: '#00d25b', height: '2rem', outlineStyle: 'none', border: 'none',
                        color: 'white', width: '6rem', borderRadius: '5px', marginTop: '5px'
                    }}
                    onClick={clickAllQuotation}>
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
                                    id={'quotation&' + e.field}
                                    checked={e.checked}
                                    onClick={clickAllQuotation}
                                />
                                {e.title}
                            </div>
                        </GridListTile>
                    })}
                </GridList>
            </div>
        </div >
    )
})
function Order(props) {
    let [reload, setReload] = useState(false)
    useEffect(() => {
    }, [reload])
    let loadSelected = () => {
        setReload(!reload)
    }
    return (
        <div>
            <div className="mb-2" style={{ textAlign: 'center', color: 'black', overflow: 'visible' }}>Danh sách đơn hàng</div>
            <Show loadSelected={loadSelected} />
            <TabPanelOrder reload={reload} />
        </div >
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(Order);