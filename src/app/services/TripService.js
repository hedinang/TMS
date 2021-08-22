import AxiosClient from '../clients/Clients'
import CookieService from '../services/CookieService';
export default class TripService {
    search(condition) {
        return AxiosClient.post('/trip/search', condition, {
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
    searchByTruckId(id, condition) {
        return AxiosClient.post('/trip/truck/' + id, condition, {
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
        return AxiosClient.post('/trip/searchNot/' + id, condition, {
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
        return AxiosClient.get('/trip/' + id, {
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
        return AxiosClient.post('/trip/find', condition, {
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
    create(orderRequest) {
        return AxiosClient.post('/trip', orderRequest, {
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
    update(id, orderRequest) {
        return AxiosClient.put('/trip/' + id, orderRequest, {
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
        return AxiosClient.delete('/trip/' + id, {
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
        return AxiosClient.post('/trip/remove', request, {
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