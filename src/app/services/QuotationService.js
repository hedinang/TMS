import AxiosClient from '../clients/Clients'
import CookieService from '../services/CookieService';
export default class QuotationService {
    search(condition) {
        return AxiosClient.post('/quotation/search', condition, {
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
        return AxiosClient.post('/quotation/searchNot/' + id, condition, {
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
        return AxiosClient.get('/quotation/' + id, {
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
        return AxiosClient.post('/quotation/find', condition, {
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
    create(quotationRequest) {
        return AxiosClient.post('/quotation', quotationRequest, {
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
    update(id, quotationRequest) {
        return AxiosClient.put('/quotation/' + id, quotationRequest, {
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
        return AxiosClient.delete('/quotation/' + id, {
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
        return AxiosClient.post('/quotation/remove', request, {
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