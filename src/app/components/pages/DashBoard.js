import React, { Component } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"
import Box from '@material-ui/core/Box';
import TripMonitorService from '../../services/TripMonitorService'
import Condition from '../../models/Condition'
import { connect } from 'react-redux'
import Monitor from '../tables/Monitor'
import { action } from '../../redux/actions/actions'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../tables/TabPanelBookings';
import TabPanelDashboard from '../tables/TabPanelDashboard';
const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

class Dashboard extends Component {

  transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [{
      data: [55, 25, 20],
      backgroundColor: [
        "#111111", "#00d25b", "#ffab00"
      ]
    }
    ]
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    }
  }

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }
  // var sse = new EventSource('http://localhost:8090/tms/trip-monitor/sse');
  // sse.onmessage = function (evt) {
  //   console.log('aaa')
  // var el = document.getElementById('sse');
  // el.appendChild(document.createTextNode(evt.data));
  // el.appendChild(document.createElement('br'));
  // };
  componentDidMount() {
    this.getData();
  }

  async getData() {
    let tripMonitorService = new TripMonitorService();
    let pages = [1, 2, "location", 0]
    let conditions = [
      {
        "key": "location",
        "value": "75",
        "operation": 2
      }
    ]
    let condition = new Condition(pages, conditions)
    let response = await (tripMonitorService.search(condition))
    if (response !== undefined) {
      this.props.dispatch(action(response))
    }
  }
  state = {
    selected: this.props.state.selectedMonitor,
    tab: this.props.state.tabDashboard,
    display: this.props.state.displayDashboard

  }
  changeTab = (e, value) => {
    if (this.props.state.selectStateDashboard === true) {
      if (this.props.state.tabDashboard === value) {
        this.props.dispatch(action('CHANGE_STATE_TAB', {
          selectState: false,
          display: 'none',
          id: 0
        }))
        this.setState({
          display: 'none'
        })
      }
    }
    else {
      this.props.dispatch(action('CHANGE_STATE_TAB', {
        selectState: true,
        display: 'inline',
        id: 0
      }))
      this.setState({
        display: 'inline'
      })
    }
    this.props.dispatch(action('CHANGE_VALUE_TAB', {
      tab: value,
      id: 0
    }))
    this.setState({
      tab: value
    })
  }
  render() {
    return (
      <div>
        <div className="row h-100">
          <div className="col-12">
            <div className='text-center'>Giám sát chuyến xe</div>
            <div >
              <AppBar position="static" className='rounded-top'>
                <Tabs value={this.state.tab}
                  onChange={this.changeTab} >
                  <Tab label="Chuyến xe" />
                  <Tab label="Chi tiết" />
                </Tabs>
              </AppBar>
              <div id='tabPanel' style={{ display: `${this.state.display}` }} >
                <TabPanelDashboard checked={() => {
                  this.setState({
                    selected: this.props.state.selectedMonitor
                  })
                }} selected={this.state.selected} id={this.state.tab} />
              </div>
            </div>
            <Monitor data={this.props.state} selected={this.props.state.selectedMonitor} />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className='text-center'>Chi tiết chuyến xe 11</div>
            <div className="table-responsive text-center">
              <Grid
                style={{
                  height: "600px",
                }}
              // data={this.props.state}
              >
                <Column field="ProductID" title="STT" width="50px" locked='true' />
                <Column field="Discontinued" title='Mã khách hàng' width="100px" locked='true' />
                <Column field="UnitPrice" title='Tên khách hàng' width="100px" />
                <Column field="QuantityPerUnit" title='Địa chỉ' width="100px" locked='true' />
                <Column field="Category.CategoryName" title='Điện thoại' width="100px" locked='true' />
                <Column field="Category.CategoryName" title='Người nhận' width="100px" />
                <Column field="Category.CategoryName" title='Trạng thái' width="100px" />
                <Column field="Category.CategoryName" title='POD' width="100px" />
                <Column field="Category.CategoryName" title='COD' width="100px" />
                <Column field="Category.CategoryName" title='Số Seal' width="100px" />
                <Column field="Category.CategoryName" title='Trọng lượng' width="100px" />
                <Column field="Category.CategoryName" title='ETA' width="100px" />
                <Column field="Category.CategoryName" title='ATA' width="100px" />
              </Grid>
            </div>
          </div>
          <div className="col-3">
            <Box border={2}>
              <div className="row col-12">Camera mã số 11, lái xe Nguyễn Văn A, lúc 12 giờ 10 phút 30 giây ngày 10 tháng 10 năm 2020</div>
              <div className="row">
                <div className='col-12'>
                  <img className='w-100' src={require("../../../assets/images/door/1.jpg")} />
                </div>
                <div className='col-12 text-center'>
                  <span>Ảnh 1</span>
                </div>
              </div>
              <div className="row">
                <div className='col-12'>
                  <img className='w-100' src={require("../../../assets/images/door/2.jpg")} />
                </div>
                <div className='col-12 text-center'>
                  <span>Ảnh 2</span>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}

export default connect(select)(Dashboard);