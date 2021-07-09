import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import ToolbarFilter from './ToolbarPanel.js';
import {

    Column, EditingState,
    FilteringState, GroupingState,
    IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSelection, IntegratedSorting,
    PagingState, SelectionState, SortingState, DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import {
    TableColumnReordering,
    ColumnChooser,
    TableColumnVisibility,
    TableFixedColumns,
    DragDropProvider,
    Grid, GroupingPanel, PagingPanel,
    Table, TableFilterRow, TableGroupRow,
    TableHeaderRow, TableSelection, Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { Button } from '@material-ui/core';
let ActionFormatter = (value) => {
    return (
        <div>
            <Button style={{ background: 'blue', color: 'white' }}>Xem</Button>
            <Button style={{ background: 'blue', color: 'white' }}>Xóa</Button>
        </div>
    )
}
let WarningFormater = (value) => {
    switch (value.value) {
        case 0:
            return <div style={{ background: 'yellow' }}>Nhiệt độ</div>
        case 1:
            return <div style={{ background: 'red' }}>Cửa sau mở</div>
        default:
            return <div style={{ background: 'green' }}>Vị trí</div>

    }
}
const WarningTypeProvider = props => (
    <DataTypeProvider
        // formatterComponent={CurrencyFormatter}
        formatterComponent={WarningFormater}
        // availableFilterOperations={availableFilterOperations}
        {...props}
    />
);

const ActionTypeProvider = props => (
    <DataTypeProvider
        // formatterComponent={CurrencyFormatter}
        formatterComponent={ActionFormatter}
        // availableFilterOperations={availableFilterOperations}
        {...props}
    />
);
export default () => {
    const columns = [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
        { name: 'channel', title: 'channel' },
        { name: 'abc', title: 'abc' },
        { name: 'xyz', title: 'xyz' },
        { name: 'a', title: 'a' },
        { name: 'warning', title: 'warning' },
        { name: 'sector', title: 'sector' },
        { name: 'action', title: 'Thao tác' },

    ]
    const rows = [
        {
            product: 'string',
            region: 'string',
            amount: 'string',
            saleDate: 'string',
            customer: 'string',
            warning: 0
        },
        {

            product: 'string',
            region: 'string',
            amount: 'string',
            saleDate: 'string',
            customer: 'string',
            warning: 1
        },
        {
            product: 'string',
            region: 'string',
            amount: 'string',
            saleDate: 'string',
            customer: 'string',
            warning: 2
        },
        {

            product: 'string',
            region: 'string',
            amount: 'string',
            saleDate: 'string',
            customer: 'string',
            warning: 1
        },
    ]
    const actionColumns = ['action']
    const warningColumns = ['warning']

    const filteringStateColumnExtensions = [
        { columnName: 'action', filteringEnabled: false },
        { columnName: 'warning', filteringEnabled: false },
    ];
    const currentPage = 0
    let setCurrentPage = 0
    let pageSize = 4
    let setPageSize = 4
    let pageSizes = [4, 10, 15]
    const tableColumnExtensions = [
        { columnName: 'region', width: 180 },
        { columnName: 'sector', width: 200 },
        { columnName: 'channel', width: 180 },
        { columnName: 'customer', width: 230 },
        { columnName: 'product', width: 170 },
        // { columnName: 'amount', align: 'right', width: 140 },
        { columnName: 'action', align: 'right', width: 140 },
    ];
    const leftColumns = ['product', 'region']
    const rightColumns = ['action']
    let columnOrder = ['product', 'region', 'amount', 'saleDate', 'customer', 'channel', 'abc', 'xyz', 'a', 'warning', 'sector', 'action']
    let setColumnOrder = ['product', 'region', 'amount', 'saleDate', 'customer', 'channel', 'abc', 'xyz', 'a', 'warning', 'sector', 'action']
    const defaultHiddenColumnNames = []
    return (
        <Paper >
            <div>Phương tiện</div>

            <Grid
                item xs={6}
                rows={rows}
                columns={columns}
            >
                <SortingState
                    defaultSorting={[{ columnName: 'saleDate', direction: 'asc' }]}
                />
                <IntegratedSorting />
                <ActionTypeProvider
                    for={actionColumns}
                />
                <WarningTypeProvider
                    for={warningColumns}
                />
                <FilteringState
                    // defaultFilters={defaultFilters}
                    columnExtensions={filteringStateColumnExtensions}
                />
                <IntegratedFiltering />
                <DragDropProvider />
                <Table
                    columnExtensions={tableColumnExtensions}
                />
                <TableColumnReordering
                    order={columnOrder}
                    onOrderChange={setColumnOrder}
                />
                <TableHeaderRow showSortingControls />
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

                    defaultHiddenColumnNames={defaultHiddenColumnNames}
                />
                <Toolbar />
                <ToolbarFilter name='first' />
                {/* <ColumnChooser />
                <ToolbarCustomer name='second' /> */}
                <PagingPanel
                    pageSizes={pageSizes}
                />
            </Grid>
        </Paper>
    );
};
