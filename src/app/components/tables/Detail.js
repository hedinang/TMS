import Paper from '@material-ui/core/Paper';
import ToolbarPanel from '../pages/method/ToolbarPanel';
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
import { faTrashAlt, faPencilAlt } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react';
class Detail extends Component {

    state = {
        data: [
            {
                id: 'STT',
                customerId: 'customerId',
                customerName: 'customerName',
                address: 'address',
                receiveName: 'receiveName',
                status: 'status',
                pod: 'pod',
                cod: 'cod',
                image: 'image',
                seal: 'seal',
                cargo: 'cargo',
                eta: 'eta',
                ata: 'ata'
            }
        ],
        reload: 0

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
                {/* <Button style={{ background: 'blue', color: 'white' }}>Xửa</Button>
                <Button style={{ background: 'blue', color: 'white' }}>Xóa</Button> */}
            </div>
        )
    }
    StatusFormater = (value) => {
        switch (value.value) {
            case 0:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#feac08',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang giao</span>
            default:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#0abb87',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đã giao</span>


        }
    }
    StatusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.StatusFormater}
            {...props}
        />
    );

    ActionTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.ActionFormatter}
            {...props}
        />
    )
    // let columnOrder = ['product', 'region', 'amount', 'saleDate', 'customer', 'channel', 'abc', 'xyz', 'a', 'warning', 'sector', 'action']
    // let setColumnOrder = ['product', 'region', 'amount', 'saleDate', 'customer', 'channel', 'abc', 'xyz', 'a', 'warning', 'sector', 'action']
    // const defaultHiddenColumnNames = []
    render() {
        let selectedDetail = []
        this.props.state.selectedDetail.forEach(e => {
            if (e.checked === true)
                selectedDetail.push(
                    {
                        name: e.field,
                        title: e.title
                    }
                )
        })
        let data = [
            //     {
            //     id: 1111111,
            //     action: '11',
            //     bookingCode: '22',
            //     shipperName: '33',
            //     contactNumber: '44',
            //     city: '55',
            //     vehicleType: '66',
            //     vehicleNumber: '77',
            //     insurance: '88',
            //     status: 0,
            // },
            // {
            //     id: 1111112,
            //     action: '11',
            //     bookingCode: '22',
            //     shipperName: '33',
            //     contactNumber: '44',
            //     city: '55',
            //     vehicleType: '66',
            //     vehicleNumber: '77',
            //     insurance: '88',
            //     status: 1,
            // }
        ]
        let leftColumns = ['id', 'customerId', 'customerName', 'address']
        // let leftColumns = ['action', 'bookingCode', 'shipperName']
        // let rightColumns = ['status']
        let tableColumnExtensions = [
            // { columnName: 'id', width: 180 },
            // { columnName: 'action', width: 180 },
            // { columnName: 'bookingCode', width: 200 },
            // { columnName: 'shipperName', width: 180 },
            // { columnName: 'contactNumber', width: 230 },
            // { columnName: 'city', width: 170 },
            // { columnName: 'status', width: 170 },
        ];
        let actionColumns = ['action']
        let statusColumns = ['status']
        let filteringStateColumnExtensions = [
            { columnName: 'action', filteringEnabled: false },
            { columnName: 'status', filteringEnabled: false },
        ]
        let currentPage = 0
        let setCurrentPage = 0
        let pageSize = 4
        let setPageSize = 4
        let pageSizes = [4, 10, 15]
        return (

            <Paper >
                <Grid
                xs={12}
                    rows={data}
                    columns={selectedDetail}
                >
                    {/* <SortingState
                        defaultSorting={[{ columnName: 'saleDate', direction: 'asc' }]}
                    /> */}
                    {/* <IntegratedSorting /> */}
                    {/* <this.ActionTypeProvider
                        for={actionColumns}
                    />
                    <this.StatusTypeProvider
                        for={statusColumns}
                    /> */}
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
                    // rightColumns={rightColumns}
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
                    <ToolbarPanel panel={this.props.panel} />
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
export default connect(select)(Detail);





