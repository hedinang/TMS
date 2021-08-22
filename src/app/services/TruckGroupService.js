import AxiosClient from '../clients/Clients'
import CookieService from '../services/CookieService';
export default class TruckGroupService {
    search(condition) {
        return AxiosClient.post('/trucker-group/search', condition, {
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
    searchNot(id, condition) {
        return AxiosClient.post('/trucker-group/searchNot/' + id, condition, {
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
    findById(id) {
        return AxiosClient.get('/trucker-group/' + id, {
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
    find(condition) {
        return AxiosClient.post('/trucker-group/find', condition, {
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
    create(TruckGroupRequest) {
        return AxiosClient.post('/trucker-group', TruckGroupRequest, {
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
    update(id, TruckGroupRequest) {
        return AxiosClient.put('/trucker-group/' + id, TruckGroupRequest, {
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
        return AxiosClient.delete('/trucker-group/' + id, {
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
    removePermission(request) {
        return AxiosClient.post('/trucker-group/remove', request, {
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