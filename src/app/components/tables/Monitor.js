import Paper from '@material-ui/core/Paper';
import ToolbarPanel from '../shared/ToolbarPanel';
import { action } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import {
    FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSelection, IntegratedSorting,
    PagingState, SelectionState, SortingState, DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
    TableColumnReordering, TableColumnVisibility, TableFixedColumns, Grid, GroupingPanel,
    PagingPanel, Table, TableFilterRow, TableHeaderRow, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { faTrashAlt, faPencilAlt, faEye } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react';
class Monitor extends Component {
    state = {
        reload: ''
    }
    ActionFormatter = (value) => {
        return (
            <div>
                <button style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </button>
                <button style={{ background: '#0090e7', color: 'white' }} className="btn btn-rounded btn-icon">
                    <FontAwesomeIcon icon={faEye} />
                </button>
                {/* <Button style={{ background: 'blue', color: 'white' }}>Xửa</Button>
                <Button style={{ background: 'blue', color: 'white' }}>Xóa</Button> */}
            </div>
        )
    }
    WarningFormatter = (value) => {
        switch (value.value) {
            case 0:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#fc424a',
                    borderRadius: '0.25rem', color: 'white',
                }}>Nhiệt độ</span>
            case 1:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#0abb87',
                    borderRadius: '0.25rem', color: 'white',
                }}>Bình thường</span>
            default:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#ffab02',
                    borderRadius: '0.25rem', color: 'white',
                }}>Cửa mở</span>


        }
    }
    ActionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.ActionFormatter}
            {...props}
        />
    );

    WarningTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.WarningFormatter}
            {...props}
        />
    )
    // let columnOrder = ['product', 'region', 'amount', 'saleDate', 'customer', 'channel', 'abc', 'xyz', 'a', 'warning', 'sector', 'action']
    // let setColumnOrder = ['product', 'region', 'amount', 'saleDate', 'customer', 'channel', 'abc', 'xyz', 'a', 'warning', 'sector', 'action']
    // const defaultHiddenColumnNames = []
    render() {
        let selectedMonitor = []
        this.props.state.selectedMonitor.forEach(e => {
            if (e.checked === true)
                selectedMonitor.push(
                    {
                        name: e.field,
                        title: e.title
                    }
                )
        })
        let data = [
            {
                id: 1111112,
                // date: new Date(),
                tripId: '22FF',
                tripName: 'Chuyến 2345',
                licensePlace: '1234ABC',
                vehicleType: 'Xe container',
                weight: 1000,
                cargo: 500,
                temperature: '10 đến 20',
                point: 'Ba Đình -> Cầu Giấy -> Mỹ Đình',
                driver: 'Nguyễn Văn A',
                state: 1,
                location: '506 Vĩnh Phúc, Ba Đình, Hà Nội',
                warning: 1
            },
            {
                id: 1111111,
                // date: new Date(),
                tripId: '1AAA',
                tripName: 'Chuyến 123',
                licensePlace: '1234ABC',
                vehicleType: 'Xe tải to',
                weight: 1000,
                cargo: 500,
                temperature: '10 đến 20',
                point: 'Ba Đình -> Cầu Giấy -> Mỹ Đình',
                driver: 'Nguyễn Văn A',
                state: 0,
                location: '506 Vĩnh Phúc, Ba Đình, Hà Nội',
                warning: 0
            },
            {
                id: 1111112,
                // date: new Date(),
                tripId: '22FF',
                tripName: 'Chuyến 2345',
                licensePlace: '1234ABC',
                vehicleType: 'Xe container',
                weight: 1000,
                cargo: 500,
                temperature: '10 đến 20',
                point: 'Ba Đình -> Cầu Giấy -> Mỹ Đình',
                driver: 'Nguyễn Văn A',
                state: 1,
                location: '506 Vĩnh Phúc, Ba Đình, Hà Nội',
                warning: 1
            },
            {
                id: 1111111,
                // date: new Date(),
                tripId: '1AAA',
                tripName: 'Chuyến 123',
                licensePlace: '1234ABC',
                vehicleType: 'Xe tải to',
                weight: 1000,
                cargo: 500,
                temperature: '10 đến 20',
                point: 'Ba Đình -> Cầu Giấy -> Mỹ Đình',
                driver: 'Nguyễn Văn A',
                state: 0,
                location: '506 Vĩnh Phúc, Ba Đình, Hà Nội',
                warning: 2
            },
            {
                id: 1111112,
                // date: new Date(),
                tripId: '22FF',
                tripName: 'Chuyến 2345',
                licensePlace: '1234ABC',
                vehicleType: 'Xe container',
                weight: 1000,
                cargo: 500,
                temperature: '10 đến 20',
                point: 'Ba Đình -> Cầu Giấy -> Mỹ Đình',
                driver: 'Nguyễn Văn A',
                state: 1,
                location: '506 Vĩnh Phúc, Ba Đình, Hà Nội',
                warning: 1
            }
        ]
        let leftColumns = ['id', 'action', 'date', 'tripId']
        // let leftColumns = ['action', 'bookingCode', 'shipperName']
        let rightColumns = ['location', 'warning']
        let tableColumnExtensions = [
            { columnName: 'id', width: 180 },
            { columnName: 'action', width: 180 },
            // { columnName: 'bookingCode', width: 200 },
            // { columnName: 'shipperName', width: 180 },
            // { columnName: 'contactNumber', width: 230 },
            // { columnName: 'city', width: 170 },
            // { columnName: 'status', width: 170 },
        ];
        let actionColumns = ['action']
        let warningColumns = ['warning']
        let filteringStateColumnExtensions = [
            { columnName: 'action', filteringEnabled: false },
            { columnName: 'warning', filteringEnabled: false },
        ]
        let currentPage = 0
        let setCurrentPage = 0
        let pageSize = 4
        let setPageSize = 4
        let pageSizes = [4, 10, 15]
        return (

            <Paper >
                <Grid
                xs={6}
                    rows={data}
                    columns={selectedMonitor}
                >
                    {/* <SortingState
                        defaultSorting={[{ columnName: 'saleDate', direction: 'asc' }]}
                    /> */}
                    {/* <IntegratedSorting /> */}
                    <this.ActionTypeProvider
                        for={actionColumns}
                    />
                    <this.WarningTypeProvider
                        for={warningColumns}
                    />
                    <FilteringState
                        // defaultFilters={defaultFilters}
                        columnExtensions={filteringStateColumnExtensions}
                    />
                    <IntegratedFiltering />
                    {/* <DragDropProvider /> */}
                    <Table
                        columnExtensions={tableColumnExtensions}
                    />
                    {/* <TableColumnReordering
                        order={columnOrder}
                        onOrderChange={setColumnOrder}
                    /> */}
                    <TableHeaderRow
                    // showSortingControls 
                    />
                    <TableFilterRow />
                    <TableFixedColumns
                        leftColumns={leftColumns}
                        rightColumns={rightColumns}
                    />
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={setCurrentPage}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                    />
                    <IntegratedPaging />
                    <TableColumnVisibility

                    // defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar />
                    <ToolbarPanel panel={this.props.panel} reload={() => {
                        this.props.reload()
                    }} />
                    {/* <PagingPanel
                        pageSizes={pageSizes}
                    /> */}
                </Grid>
            </Paper>
        )
    }
}

function select(state) {
    return {
        state: state.reducer
    }
}
export default connect(select)(Monitor);





