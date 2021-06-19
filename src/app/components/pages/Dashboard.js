import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'bootstrap';
const mapData = {
  "BZ": 75.00,
  "US": 56.25,
  "AU": 15.45,
  "GB": 25.00,
  "RO": 10.25,
  "GE": 33.25
}

export class Dashboard extends Component {

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
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-xl-12 col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className='text-center'>Giám sát chuyến xe</div>
                <div className="table-responsive text-center">
                  <table className="table" style={{ 'height': '300px', 'overflowY': 'scroll', 'display': 'block' }}>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Thời gian</th>
                        <th>Mã chuyến</th>
                        <th>Tên chuyến</th>
                        <th>Biển số</th>
                        <th>Tải trọng</th>
                        <th>Trọng lượng hàng</th>
                        <th>Nhiệt độ yêu cầu</th>
                        <th>Số điểm giao</th>
                        <th>Tài xế</th>
                        <th>Trạng thái</th>
                        <th>Vị trí</th>
                        <th>Cảnh báo</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>10000</td>
                        <td>30:10:12 10/10/2021</td>
                        <td>11</td>
                        <td>Hai Bà Trưng</td>
                        <td>99A-333.33</td>
                        <td>1.5T</td>
                        <td>1000</td>
                        <td>
                          <div>
                            N1 từ 10C đến 20C
                          </div>
                          <div>
                            N2 từ -10 đến 0C
                          </div>
                        </td>
                        <td>3/7</td>
                        <td>Nguyễn Văn AAAA</td>
                        <td>Giao hàng</td>
                        <td>85 Trần Thái Tông</td>
                        <td>Bình thường</td>
                        <td>
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                        </td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>30:10:12 10/10/2021</td>
                        <td>11</td>
                        <td>Hai Bà Trưng</td>
                        <td>99A-333.33</td>
                        <td>1.5T</td>
                        <td>1000</td>
                        <td>
                          N1 từ 10C đến 20C
                          N2 từ -10 đến 0C
                        </td>
                        <td>3/7</td>
                        <td>Nguyễn Văn AAAA</td>
                        <td>Giao hàng</td>
                        <td>85 Trần Thái Tông</td>
                        <td>Bình thường</td>
                        <td>
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                        </td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>30:10:12 10/10/2021</td>
                        <td>11</td>
                        <td>Hai Bà Trưng</td>
                        <td>99A-333.33</td>
                        <td>1.5T</td>
                        <td>1000</td>
                        <td>
                          N1 từ 10C đến 20C
                          N2 từ -10 đến 0C
                        </td>
                        <td>3/7</td>
                        <td>Nguyễn Văn AAAA</td>
                        <td>Giao hàng</td>
                        <td>85 Trần Thái Tông</td>
                        <td>Bình thường</td>
                        <td>
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                        </td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>30:10:12 10/10/2021</td>
                        <td>11</td>
                        <td>Hai Bà Trưng</td>
                        <td>99A-333.33</td>
                        <td>1.5T</td>
                        <td>1000</td>
                        <td>
                          N1 từ 10C đến 20C
                          N2 từ -10 đến 0C
                        </td>
                        <td>3/7</td>
                        <td>Nguyễn Văn AAAA</td>
                        <td>Giao hàng</td>
                        <td>85 Trần Thái Tông</td>
                        <td>Bình thường</td>
                        <td>
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                        </td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>30:10:12 10/10/2021</td>
                        <td>11</td>
                        <td>Hai Bà Trưng</td>
                        <td>99A-333.33</td>
                        <td>1.5T</td>
                        <td>1000</td>
                        <td>
                          N1 từ 10C đến 20C
                          N2 từ -10 đến 0C
                        </td>
                        <td>3/7</td>
                        <td>Nguyễn Văn AAAA</td>
                        <td>Giao hàng</td>
                        <td>85 Trần Thái Tông</td>
                        <td>Bình thường</td>
                        <td>
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                          <FontAwesomeIcon icon="eye" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-4 col-xl-4 col-sm-4">
            <div className="row">
              <div className="col-lg-6 col-xl-6 col-sm-6 text-center">
                <img src={require("../../../assets/images/door/1.jpg")} width={300} />
                Ảnh 1
                </div>
              <div className="col-lg-6 col-xl-6 col-sm-6 text-center">
                <img src={require("../../../assets/images/door/2.jpg")} width={300} />
                Ảnh 2
                </div>
            </div>
            <div className="row">Camera mã số 11, lái xe Nguyễn Văn A, lúc 12 giờ 10 phút 30 giây ngày 10 tháng 10 năm 2020</div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-lg-9 col-xl-9 col-sm-9  ">
            <div className="card">
              <div className="card-body">
                <div className='text-center'>Chi tiết chuyến xe 11</div>
                <div className="table-responsive text-center">
                  <table className="table" style={{ 'height': '500px', 'overflowY': 'scroll', 'display': 'block' }}>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Mã khách hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Điện thoại</th>
                        <th>Người nhận</th>
                        <th>Trạng thái</th>
                        <th>POD</th>
                        <th>COD</th>
                        <th>Số Seal</th>
                        <th>Trọng lượng</th>
                        <th>ETA</th>
                        <th>ATA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                      <tr>
                        <td>10000</td>
                        <td>1</td>
                        <td>Nguyễn Văn Mạnh AAAA</td>
                        <td>376 Bưởi, Vĩnh Phức, Ba Đình, Hà Nội</td>
                        <td>0123456789</td>
                        <td>Nguyễn Văn Mạnh BBBB</td>
                        <td>Đã giao</td>
                        <td>Đã email</td>
                        <td>NO</td>
                        <td>12345</td>
                        <td>500</td>
                        <td>6:00:00</td>
                        <td>6:00:00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3 col-sm-3 ">
            <div className="row">Camera mã số 11, lái xe Nguyễn Văn A, lúc 12 giờ 10 phút 30 giây ngày 10 tháng 10 năm 2020</div>
            <div className="row">
              <img src={require("../../../assets/images/door/1.jpg")} width={300} />
                Ảnh 1
            </div>
            <div className="row">
              <img src={require("../../../assets/images/door/2.jpg")} width={300} />
                Ảnh 2
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default Dashboard;