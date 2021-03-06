import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faMoneyBillAlt, faBoxOpen, faTruck } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AppBar, Tab, Tabs
} from '@material-ui/core';

import Condition from '../../models/Condition';
import { TableOrder, TableQuotation, TableGood, TableTrip } from '../tables/TableTrip';
let pages = [1, 10, "id", 0]
let conditions = []

function TabPanelTrip(props) {
    let [col, setCol] = useState({
        left: 'col-12',
        right: 'none',
        tabLeft: 0,
        tabRight: 0
    })
    let [dataOrder, setDataOrder] = useState({ tripId: 0 })
    let [dataGood, setDataGood] = useState({ orderId: 0 })
    useEffect(() => {

    }, props.reload)
    let changeTabLeft = (event, newValue) => {
        props.changeTab(newValue)
        switch (newValue) {
            case 0:
                setCol({
                    left: 'col-12',
                    right: 'none',
                    tabLeft: 0,
                    tabRight: 0
                })
                break;
            case 1:
                setCol({
                    left: 'col-9',
                    right: 'inline',
                    tabLeft: 1,
                    tabRight: 0
                })
                break;
            case 2:
                setCol({
                    left: 'col-12',
                    right: 'none',
                    tabLeft: 2,
                    tabRight: 0
                })
                break;
            default:
                break;
        }
    }
    let clickTripView = (tripId, name) => {
        setDataOrder({ tripId: tripId, name: name })
        changeTabLeft('none', 1)

    }
    let clickOrderView = (orderId, name) => {
        setDataGood({ orderId: orderId, name: name })

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
                            <FontAwesomeIcon icon={faTruck} className='mr-2' />
                            <span>Chuy???n</span>
                        </div>} />
                        <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faBoxOpen} className='mr-2' />
                            <span>????n h??ng</span>
                        </div>} />
                        <Tab style={{ opacity: 1, outlineStyle: 'none' }} label={<div>
                            <FontAwesomeIcon icon={faMoneyBillAlt} className='mr-2' />
                            <span>B??o gi??</span>
                        </div>} />
                    </Tabs>
                </AppBar>
                <TableTrip value={col.tabLeft} index={0} view={clickTripView} reload={props.reload} />
                <TableOrder value={col.tabLeft} index={1} view={clickOrderView} reload={props.reload} data={dataOrder} />
                <TableQuotation value={col.tabLeft} index={2} reload={props.reload} />
            </div>
            <div className='col-3' style={{ display: `${col.right}`, textAlign: 'center' }}>
                <div>Chi ti???t ????n h??ng</div>
                <div>Rau c??? qu???</div>
                <TableGood value={col.tabRight} data={dataGood} />
            </div>
        </div>
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TabPanelTrip)