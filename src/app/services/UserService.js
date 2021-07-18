import AxiosClient from '../clients/Clients'
import CookieService from './CookieService';
export default class UserService {

    search(condition) {
        return AxiosClient.post('/user/search', condition, {
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
    find(condition) {
        return AxiosClient.post('/user/find', condition, {
            headers: {
                Authorization: 'Bearer ' + new CookieService().read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                console.log(error);
                return Promise.reject(error);
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
