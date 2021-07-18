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
import { faTrashAlt, faPencilAlt, faPowerOff } from '@fortawesome/fontawesome-free-solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react';
import Condition from '../../models/Condition';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';
class TableAccount extends Component {
    state = {
        data: {
            user: [],
            role: []
        },
        reload: 0

    }
    componentWillMount() {
        this.getUser()
        this.getRole()
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
                    <FontAwesomeIcon icon={faPowerOff} />
                </button>
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
                }}>Đang chờ</span>
            case 1:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#fc424a',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đang khóa</span>
            default:
                return <span style={{
                    padding: '.5em .75em',
                    textAlign: 'center', background: '#0abb87',
                    borderRadius: '0.25rem', color: 'white',
                }}>Đã kích hoạt</span>


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
    getUser() {
        let userService = new UserService();
        let pages = [1, 10, "id", 0]
        let conditions = []
        let condition = new Condition(pages, conditions)
        userService.search(condition).then(value => {
            this.setState({
                data: {
                    user: value.result
                }
            })
        }).catch(error => {
            console.log('aaaa');
        })
    }
    getRole() {
        let roleService = new RoleService();
        let pages = [1, 10, "id", 0]
        let conditions = []
        let condition = new Condition(pages, conditions)
        roleService.search(condition).then(value => {
            this.setState({
                data: {
                    user: this.state.data.user,
                    role: value.result
                }
            })
        }).catch(error => {
            console.log('aaaa');
        })
    }



    render() {
        let selectedAccount = []
        this.props.state.selectedAccount.forEach(e => {
            if (e.checked === true)
                selectedAccount.push(
                    {
                        name: e.field,
                        title: e.title
                    }
                )
        })
        let leftColumns = ['id', 'action', 'name']
        let rightColumns = ['status']
        let tableColumnExtensions = [
            { columnName: 'id', width: 180 },
            { columnName: 'action', width: 180 },
            { columnName: 'name', width: 200 },
            { columnName: 'status', width: 170 },
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
            <Paper>
                <Grid
                    xs={12}
                    rows={this.state.data.user}
                    columns={selectedAccount} >

                    <this.ActionTypeProvider
                        for={actionColumns}
                    />
                    <this.StatusTypeProvider
                        for={statusColumns}
                    />
                    <FilteringState
                        columnExtensions={filteringStateColumnExtensions}
                    />
                    <IntegratedFiltering />
                    <Table
                    // columnExtensions={tableColumnExtensions}
                    />

                    <TableHeaderRow />
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
                    />
                    <Toolbar />
                    <ToolbarPanel data={this.state.data} panel={this.props.panel} reload={() => {
                        if (this.state.reload === 0)
                            this.setState({
                                reload: 1
                            })
                        else this.setState({
                            reload: 0
                        })
                    }} />

                    <PagingPanel
                        pageSizes={pageSizes}
                    />
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
export default connect(select)(TableAccount);





