// import React, { Component } from 'react';
// import Paper from "@material-ui/core/Paper";
// import {
//     Grid,
//     VirtualTable,
//     TableHeaderRow,
//     TableFixedColumns,
//     TableRowDetail,
//     PagingPanel
// } from "@devexpress/dx-react-grid-material-ui";
// import {
//     RowDetailState,
//     FilteringState,
//     IntegratedFiltering,
//     SortingState,
//     IntegratedSorting,
//     IntegratedPaging,
//     PagingState
// } from '@devexpress/dx-react-grid'
// export default class Store extends Component {
//     state = {
//         data: [{
//             action: 'action',
//             bookingCode: 'tripId',
//             shipperName: 'name',
//             contactNumber: 'phone',
//             city: 'address',
//             vehicleType: 'type',
//             vehicleNumber: 'licensePlate',
//             status: 'status',
//             insurance: 'insurance'
//         },
//         {
//             action: 'action',
//             bookingCode: 'tripId',
//             shipperName: 'name',
//             contactNumber: 'phone',
//             city: 'address',
//             vehicleType: 'type',
//             vehicleNumber: 'licensePlate',
//             status: 'status',
//             insurance: 'insurance'
//         },
//         {
//             action: 'action',
//             bookingCode: 'tripId',
//             shipperName: 'name',
//             contactNumber: 'phone',
//             city: 'address',
//             vehicleType: 'type',
//             vehicleNumber: 'licensePlate',
//             status: 'status',
//             insurance: 'insurance'
//         },
//         {
//             action: 'action',
//             bookingCode: 'tripId',
//             shipperName: 'name',
//             contactNumber: 'phone',
//             city: 'address',
//             vehicleType: 'type',
//             vehicleNumber: 'licensePlate',
//             status: 'status',
//             insurance: 'insurance'
//         },
//         ]
//     }
//     // data = useDemoData(() => {
//     //     return {
//     //         dataSet: 'Commodity',
//     //         rowLength: 100000,
//     //         editable: true,
//     //     }
//     // });
//     render() {
//         let rows = [
//             {
//                 amount: 46522.35,
//                 channel: "VARs",
//                 customer: "Beacon Systems",
//                 discount: 0.279,
//                 product: "EnviroCare Max",
//                 region: "South America",
//                 saleDate: "2016-02-29",
//                 sector: "Banking",
//                 shipped: false,
//                 units: 4
//             },
//             {
//                 amount: 46522.35,
//                 channel: "VARs",
//                 customer: "Beacon Systems",
//                 discount: 0.279,
//                 product: "EnviroCare Max",
//                 region: "South America",
//                 saleDate: "2016-02-29",
//                 sector: "Banking",
//                 shipped: false,
//                 units: 4
//             }, {
//                 amount: 46522.35,
//                 channel: "VARs",
//                 customer: "Beacon Systems",
//                 discount: 0.279,
//                 product: "EnviroCare Max",
//                 region: "South America",
//                 saleDate: "2016-02-29",
//                 sector: "Banking",
//                 shipped: false,
//                 units: 4
//             },
//             {
//                 amount: 46522.35,
//                 channel: "VARs",
//                 customer: "Beacon Systems",
//                 discount: 0.279,
//                 product: "EnviroCare Max",
//                 region: "South America",
//                 saleDate: "2016-02-29",
//                 sector: "Banking",
//                 shipped: false,
//                 units: 4
//             }, {
//                 amount: 46522.35,
//                 channel: "VARs",
//                 customer: "Beacon Systems",
//                 discount: 0.279,
//                 product: "EnviroCare Max",
//                 region: "South America",
//                 saleDate: "2016-02-29",
//                 sector: "Banking",
//                 shipped: false,
//                 units: 4
//             },
//             {
//                 amount: 46522.35,
//                 channel: "VARs",
//                 customer: "Beacon Systems",
//                 discount: 0.279,
//                 product: "EnviroCare Max",
//                 region: "South America",
//                 saleDate: "2016-02-29",
//                 sector: "Banking",
//                 shipped: false,
//                 units: 4
//             }
//         ]
//         let columns = [
//             { name: 'region', title: 'Region' },
//             { name: 'sector', title: 'Sector' },
//             { name: 'units', title: 'units ' },

//             { name: 'channel', title: 'Channel' },
//             { name: 'customer', title: 'Customer' },
//             { name: 'product', title: 'Product' },
//             { name: 'saleDate', title: 'Sale date' },
//             { name: 'amount', title: 'Sale Amount' },
//         ]
//         let tableColumnExtensions = [
//             { columnName: "region", width: 180 },
//             { columnName: "sector", width: 120 },
//             { columnName: "units", width: 40 },
//             { columnName: "channel", width: 180 },
//             { columnName: "customer", width: 200 },
//             { columnName: "product", width: 200 },
//             { columnName: "saleDate", width: 120 },
//             // { columnName: "amount", align: "right", width: 140 },
//             { columnName: "amount", width: 140 },
//         ]
//         const leftColumns = ["region", "sector", "units"]
//         const rightColumns = ["amount"]

//         return (

//             <Paper style={{ width: '600px', border: '3px' }}>
//                 <Grid


//                     rows={rows}
//                     columns={columns}
//                 >
//                     <SortingState
//                         defaultSorting={[{ columnName: 'region', direction: 'asc' }]} />
//                     <VirtualTable columnExtensions={tableColumnExtensions} />

//                     <Table 
//                             cellComponent={Cell}
//                         />
//                     <TableHeaderRow />
//                     <PagingState
//                         defaultCurrentPage={0}
//                         defaultPageSize={10}
//                     />
//                     <TableFixedColumns
//                         leftColumns={leftColumns}
//                     // rightColumns={rightColumns}
//                     />
//                 </Grid>
//             </Paper>

//         )
//     }
// }
