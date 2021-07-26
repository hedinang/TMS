import AxiosClient from '../clients/Clients'
import CookieService from '../services/CookieService';
export default class AddressService {
    search(condition) {
        return AxiosClient.post('/address/search', condition, {
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
        return AxiosClient.post('/address/searchNot/' + id, condition, {
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
        return AxiosClient.get('/address/' + id, {
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
        return AxiosClient.post('/address/find', condition, {
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
    create(addressRequest) {
        return AxiosClient.post('/address', addressRequest, {
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
    update(id, addressRequest) {
        return AxiosClient.put('/address/' + id, addressRequest, {
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
        return AxiosClient.delete('/address/' + id, {
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
        return AxiosClient.post('/Address/remove', request, {
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