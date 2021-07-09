import React, { Component } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid"
import Box from '@material-ui/core/Box';
import TripMonitorService from '../../services/TripMonitorService'
import Condition from '../../models/Condition'
import { connect } from 'react-redux'
import Monitor from '../tables/Monitor'
import Detail from '../tables/Detail'
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
    selectedMonitor: this.props.state.selectedMonitor,
    selectedDetail: this.props.state.selectedDetail,
    tab: this.props.state.tabDashboard,
    display: this.props.state.displayDashboard,
    textColor: 'black',
    reload: 0

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
            <div className='text-center' style={{ color: `${this.state.textColor}` }}>Giám sát chuyến xe</div>
            <Monitor panel='monitor' height={'400px'} reload={() => {
              if (this.state.reload === 0)
                this.setState({
                  reload: 'a'
                })
              else this.setState({
                reload: 0
              })
            }} />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Detail panel='detail' height={'400px'} data={this.state.reload} />
          </div>
          <div className="col-3">
            <Box
              style={{
                borderWidth: '3px',
                borderStyle: 'solid',
                borderColor: 'black',
                borderRadius: '2px',
              }}
            >
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