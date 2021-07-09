import AxiosClient from '../clients/Clients'
export default class UserService {

    search(condition) {
        return AxiosClient.post('/trip-monitor/search', condition)
            .then(function (response) {

                return response;
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    login(username, password) {
        let token = username + ":" + password
        token = "Basic " + btoa(token)
        return AxiosClient.post('/user/login', {}, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            })
    }

}
