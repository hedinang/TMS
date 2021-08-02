import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux'
import { faMoneyBillAlt, faBoxOpen, faMapMarkerAlt, faInfoCircle, faThermometerHalf } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AppBar, Tab, Tabs
} from '@material-ui/core';

import Condition from '../../models/Condition';
import { TableOrder, TableQuotation, TableGood, TableReceive, TableTemperature } from '../tables/TableOrder';
import { AlertCustom } from '../dialog/DialogOrder';
let pages = [1, 10, "id", 0]
let conditions = []
let condition = new Condition(pages, conditions)


function TabPanelOrder(props) {
    let [col, setCol] = useState({
        left: 'col-8',
        right: 'inline',
        tabLeft: 0,
        tabRight: 0
    })
    let [orderId, setOrderId] = useState(0)
    // let [reload, setReload] = useState(false)
    useEffect(() => {

    }, props.reload)
    let changeTabLeft = (event, newValue) => {
        if (newValue === 0)
            setCol({
                left: 'col-8',
                right: 'inline',
                tabLeft: 0,
                tabRight: 0
            })
        else {
            setCol({
                left: 'col-12',
                right: 'none',
                tabLeft: 1,
                tabRight: 0
            })
        }
    }
    let changeTabRight = (event, newValue) => {
        setCol({
            left: col.left,
            right: col.right,
            tabLeft: col.tabLeft,
            tabRight: newValue
        })


    }
    let clickOrderView = event => {
        setOrderId(event)

    }
    return (
        <div className='row'>
            <div className={col.left}>
                <AppBar position="static" style={{
                    background: 'white', color: 'black',
                    borderStyle: 'none', boxShadow: 'none',
                }}>
                    <Tabs
                        style={{ background: 'white' }}
                        value={col.tabLeft}
                        onChange={changeTabLeft} >
                        <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faBoxOpen} className='mr-2' />
                            <span>Đơn hàng cần chuyển</span>
                        </div>} />
                        <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faMoneyBillAlt} className='mr-2' />
                            <span>Báo giá</span>
                        </div>} />
                    </Tabs>
                </AppBar>
                <TableOrder value={col.tabLeft} index={0} view={clickOrderView} reload={props.reload}/>
                <TableQuotation value={col.tabLeft} index={1} reload={props.reload} />
            </div>
            <div className='col-4' style={{ display: `${col.right}` }}>
                <AppBar position="static" style={{
                    background: 'white', color: 'black',
                    borderStyle: 'none', boxShadow: 'none',
                }}>
                    <Tabs
                        style={{ background: 'white' }}
                        value={col.tabRight}
                        onChange={changeTabRight} >
                        {/* <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-2' />
                            <span>Nơi nhận hàng</span>
                        </div>} /> */}
                        <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faInfoCircle} className='mr-2' />
                            <span>Chi tiết đơn hàng</span>
                        </div>} />
                        {/* <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faThermometerHalf} className='mr-2' />
                            <span>Nhiệt độ yêu cầu</span>
                        </div>} /> */}
                    </Tabs>
                </AppBar>
                {/* <TableReceive value={col.tabRight} index={0} orderId={orderId} /> */}
                <TableGood value={col.tabRight} index={0} orderId={orderId} />
                {/* <TableTemperature value={col.tabRight} index={1} orderId={orderId} /> */}

            </div>
        </div>
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TabPanelOrder)