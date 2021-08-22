import AxiosClient from '../clients/Clients'
import CookieService from './CookieService';
let cookieService = new CookieService()
export default class UserService {
    search(condition) {
        return AxiosClient.post('/user/search', condition, {
            headers: {
                Authorization: 'Bearer ' +cookieService.read('token')
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
    getTrucker(condition) {
        return AxiosClient.post('/user/trucker', condition, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
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
                Authorization: 'Bearer ' + cookieService.read('token')
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
    findById(id) {
        return AxiosClient.get('/user/' + id, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    find(condition) {
        return AxiosClient.post('/user/find', condition, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    clearCache(id) { // xoa redis cua id
        return AxiosClient.get('/user/clear/' + id, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
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
                return Promise.reject(error);
            })
    }
    create(userRequest) {
        return AxiosClient.post('/user', userRequest, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    updateNotification(id, userRequest) {
        return AxiosClient.put('/user/notification/' + id, userRequest, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    update(id, userRequest) {
        return AxiosClient.put('/user/' + id, userRequest, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    reset(id, password) {
        return AxiosClient.post('/user/reset/' + id, password, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
    delete(id) {
        return AxiosClient.delete('/user/' + id, {
            headers: {
                Authorization: 'Bearer ' + cookieService.read('token')
            }
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return Promise.reject(error);
            })
    }
}
