import { combineReducers } from 'redux'

let initState = {
    selectedMonitor: [
        {
            'field': 'id',
            'title': 'TT',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'action',
            'title': 'Thao tác',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'date',
            'title': 'Ngày',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'tripId',
            'title': 'Mã chuyến',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'tripName',
            'title': 'Tên chuyến',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'licensePlace',
            'title': 'Biển số xe',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'vehicleType',
            'title': 'Loại phương tiện',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'weight',
            'title': 'Tải trọng',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'cargo',
            'title': 'Trọng lượng hàng',
            'width': '200px',
            'checked': true
        },
        {
            'field': 'temperature',
            'title': 'Nhiệt độ yêu cầu',
            'width': '200px',
            'checked': true
        },
        {
            'field': 'point',
            'title': 'Điểm giao',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'driver',
            'title': 'Tài xế',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'state',
            'title': 'Trạng thái',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'location',
            'title': 'Vị trí',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'warning',
            'title': 'Cảnh báo',
            'width': '150px',
            'checked': true
        },

    ],
    selectedDetail: [
        {
            'field': 'id',
            'title': 'TT',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'customerId',
            'title': 'Mã khách hàng',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'customerName',
            'title': 'Tên khách hàng',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'address',
            'title': 'Địa chỉ',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'phone',
            'title': 'Điện thoại',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'receiveName',
            'title': 'Người nhận',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'status',
            'title': 'Trạng thái',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'pod',
            'title': 'POD',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'cod',
            'title': 'COD',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'image',
            'title': 'Hình ảnh',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'seal',
            'title': 'Số Seal',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'cargo',
            'title': 'Khối lượng hàng',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'eta',
            'title': 'ETA',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'ata',
            'title': 'ATA',
            'width': '100px',
            'checked': true
        },
    ],
    selectedBookings: [
        {
            'field': 'id',
            'title': 'STT',
            'width': '100px',
            'checked': true

        },
        {
            'field': 'action',
            'title': 'Thao tác',
            'width': '100px',
            'checked': true

        },
        {
            'field': 'bookingCode',
            'title': 'Mã đặt chuyến',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'shipperName',
            'title': 'Tên người đặt',
            'width': '150px',
            'checked': true

        },
        {
            'field': 'contactNumber',
            'title': 'Số điện thoại',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'city',
            'title': 'Địa chỉ',
            'width': '100px',
            'checked': true
        },
        {
            'field': 'vehicleType',
            'title': 'Loại xe',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'vehicleNumber',
            'title': 'Biển số xe',
            'width': '150px',
            'checked': true
        }
        ,

        {
            'field': 'insurance',
            'title': 'Bảo hiểm',
            'width': '150px',
            'checked': true
        },
        {
            'field': 'status',
            'title': 'Trạng thái đặt chuyến',
            'width': '200px',
            'checked': true
        }],
    bookColumn: [
        {
            'field': 'fee',
            'title': 'Chi phí',
            'width': '100px',
        },
        {
            'field': 'time',
            'title': 'Thời gian',
            'width': '100px',
        },
        {
            'field': 'vehicleType',
            'title': 'Loại xe',
            'width': '100px',
        },
        {
            'field': 'weight',
            'title': 'Tải trọng',
            'width': '100px',
        },
        {
            'field': 'goods',
            'title': 'Loại hàng hóa',
            'width': '100px',
        },
        {
            'field': 'cargoWeight',
            'title': 'Khối lượng hàng',
            'width': '100px',
        },
        {
            'field': 'receiveAddress',
            'title': 'Địa chỉ nhận',
            'width': '100px',
        },
        {
            'field': 'sendAddress',
            'title': 'Địa chỉ giao',
            'width': '100px',
        },

    ],
    vehicleType: [
        'Xe tải nhỏ', 'Xe tải to', 'Xe ABC', 'Xe XYZ'
    ],
    goodType: [
        'Hoa quả', 'Thịt', 'Rau', 'Sữa', 'Cá', 'Bim bim'
    ],

    weight: 0,
    marks: [
        {
            value: 0,
            label: '0kg',
        }
    ],
    fee: '',
    time: '',
    date: '',
    vehicle: '',
    good: '',

    tabDashboard: 0,
    tabBookings: 0,

    displayDashboard: 'none',
    displayBookings: 'none',

    selectStateBookings: false,
    selectStateDashboard: false,

    checkedMonitor: 15,
    checkedDetail: 14,
    checkedBooking: 9,

    disabledBooking: true,
    disabledMonitor: true,
    disabledDetail: true,

    navBar: 'Trang chủ',
    dialog: false
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'CHANGE_STATE_TAB':
            if (action.value.id === 0) {
                state['selectStateDashboard'] = action.value.selectState
                state['displayDashboard'] = action.value.display
            }
            else {
                state['selectStateBookings'] = action.value.selectState
                state['displayBookings'] = action.value.display
            }
            return state
        case 'CHANGE_VALUE_TAB':
            if (action.value.id === 0)
                state['tabDashboard'] = action.value.tab
            else
                state['tabBookings'] = action.value.tab
            return state
        case 'CHANGE_CHECKED':
            state['checked'] = action.value
            if (action.value === 9)
                state['disabled'] = true
            else
                state['disabled'] = false
            return state
        case 'CHANGE_CHECKED_MONITOR':
            state['checkedMonitor'] = action.value
            if (action.value === 15)
                state['disabledMonitor'] = true
            else
                state['disabledMonitor'] = false
            return state
        case 'CHANGE_CHECKED_DETAIL':
            state['checkedDetail'] = action.value
            if (action.value === 14)
                state['disabledDetail'] = true
            else
                state['disabledDetail'] = false
            return state
        case 'CHANGE_NAVBAR':
            state['navBar'] = action.value
            return state
        case 'CHANGE_DIALOG':
            state['dialog'] = action.value
            return state
        default:
            return state
    }
}
const combine = combineReducers({
    reducer
})
export default combine