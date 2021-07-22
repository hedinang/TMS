import {
    Plugin, Template, TemplatePlaceholder
} from '@devexpress/dx-react-core';
import { AppBar, Button, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import TabPanelBooking from '../../tables/TabPanelBooking'
import { connect } from 'react-redux'
import { action } from '../../../redux/actions/actions'
import { faEye, faPlusSquare, faInfoCircle, faTv } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TabPanelDashboard from '../../tables/TabPanelDashboard';
class ToolbarButton extends React.PureComponent {
    state = {
        selectedBooking: this.props.state.selectedBookings,
        selectedMonitor: this.props.state.selectedMonitor,
        selectedDetail: this.props.state.selectedDetail,
        tab: this.props.state.tabBookings,
        display: this.props.state.displayBookings

    }

    render() {
        return (
            <Plugin >
                <Template name="toolbarContent">
                    {/* <TemplatePlaceholder /> */}
                    <div style={{ textAlign: 'text-top' }}>
                        <FontAwesomeIcon icon={faPlusSquare} className='mr-2' />
                        <span>Tạo mới</span>
                    </div>
                </Template>
            </Plugin>
        );
    }
}
function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(ToolbarButton);