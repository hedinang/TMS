import AxiosClient from '../clients/Clients'
import CookieService from '../services/CookieService';
export default class TripMonitorService {
    search(condition) {
        return AxiosClient.post('/trip-monitor/search', condition, {
            headers: {
                Authorization: 'Bearer ' + new CookieService().read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}

