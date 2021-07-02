import React, { Component } from 'react';
import TripMonitorService from '../../services/TripMonitorService'
import Condition from '../../models/Condition'
import { connect } from 'react-redux'
import Monitor from '../tables/Monitor'
import { action } from '../../redux/actions/actions'
import '../../../assets/styles/custome/custome.scss'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanelBookings from '../tables/TabPanelBookings'

class Bookings extends Component {

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
    // this.getData();
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
    selected: this.props.state.selectedBookings,
    tab: this.props.state.tabBookings,
    display: this.props.state.displayBookings

  }

  changeTab = (e, value) => {
    if (this.props.state.selectStateBookings === true) {
      if (this.props.state.tabBookings === value) {
        this.props.dispatch(action('CHANGE_STATE_TAB', {
          selectState: false,
          display: 'none',
          id: 1//1 la bookings
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
        id: 1
      }))
      this.setState({
        display: 'inline'
      })
    }
    this.props.dispatch(action('CHANGE_VALUE_TAB', {
      tab: value,
      id: 1
    }))
    this.setState({
      tab: value
    })
  }
  render() {
    return (
      <div>
        <div className="mb-2">Danh sách đặt chuyến</div>
        <div >
          <AppBar position="static" className='rounded-top'>
            <Tabs value={this.state.tab
            } onChange={this.changeTab} >
              <Tab label="Hiển thị" />
              <Tab label="Đặt chuyến mới" />
            </Tabs>
          </AppBar>
          <div id='tabPanel' style={{ display: `${this.state.display}` }} >
            <TabPanelBookings checked={() => {
              this.setState({
                selected: this.props.state.selectedBookings
              })
            }} selected={this.state.selected} id={this.state.tab} />
          </div>
        </div>
        <Monitor selected={this.state.selected} />
      </div >
    )
  }
}
function select(state) {
  return {
    state: state.reducer
  }
}
export default connect(select)(Bookings);