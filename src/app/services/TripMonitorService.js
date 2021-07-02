import AxiosClient from '../clients/Clients'
export default class TripMonitorService {
    search(condition) {
        return AxiosClient.post('/trip-monitor/search', condition)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}

