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
                if (response.result === null) return { result: [] }
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    searchNot(id, condition) {
        return AxiosClient.post('/user/searchNot/' + id, condition, {
            headers: {
                Authorization: 'Bearer ' + new CookieService().read('token')
            }
        })
            .then(function (response) {
                if (response.result === null) return { result: [] }
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
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
    create(userRequest) {
        return AxiosClient.post('/user', userRequest, {
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
    update(id, userRequest) {
        return AxiosClient.put('/user/' + id, userRequest, {
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
    reset(id, password) {
        return AxiosClient.post('/user/reset/' + id, password, {
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
    delete(id) {
        return AxiosClient.delete('/user/' + id, {
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
}
