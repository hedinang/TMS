import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { faMoneyBillAlt, faBoxOpen, faTruck, faDolly, faWarehouse } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AppBar, Tab, Tabs
} from '@material-ui/core';

import Condition from '../../models/Condition';
import { TableOrder, TableQuotation, TableGood, TableTrip } from '../tables/TableQuotation';
let pages = [1, 10, "id", 0]
let conditions = []

function TabPanelQuotation(props) {
    let [col, setCol] = useState({
        left: 'col-9',
        right: 'none',
        tmp: 'inline',
        tabLeft: 0,
        tabRight: 0
    })
    let [dataOrder, setDataOrder] = useState({ tripId: 0 })
    let [dataGood, setDataGood] = useState({ orderId: 0 })
    let [dataQuotation, setDataQuotation] = useState({ tripId: 0 })
    useEffect(() => {

    }, props.reload)
    let changeTabLeft = (event, newValue) => {
        props.changeTab(newValue)
        switch (newValue) {
            case 0:
                setCol({
                    left: 'col-9',
                    quotation: 'inline',
                    right: 'none',
                    tabLeft: 0,
                    tabRight: 0
                })
                break;
            case 1:
                setCol({
                    left: 'col-9',
                    quotation: 'none',
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
    let changeTabRight = (event, newValue) => {
        setCol({
            left: col.left,
            right: col.right,
            tabLeft: col.tabLeft,
            tabRight: newValue
        })
    }
    let clickTripView = (tripId, name) => {
        setDataOrder({ tripId: tripId, name: name })
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
                    </Tabs>
                </AppBar>
                <TableTrip value={col.tabLeft} index={0} view={clickTripView} reload={props.reload} />
                <TableOrder value={col.tabLeft} index={1} view={clickOrderView} reload={props.reload} data={dataOrder} />
            </div>
            <div className='col-3' style={{ display: `${col.quotation}` }}>
                <div style={{ textAlign: 'center' }}>B??O GI??</div>
                <TableQuotation value={col.tabRight} index={0} data={dataQuotation} />
            </div>
            <div className='col-3' style={{ display: `${col.right}`, textAlign: 'center'  }}>
                <div>Chi ti???t ????n h??ng</div>
                <div>Rau c??? qu???</div>
                <TableGood value={col.tabRight} index={0} data={dataGood} />
            </div>
        </div>
    )
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(TabPanelQuotation)