import axios from 'axios'
import queryString from 'query-string';

const cleanParam = (obj) => {
    Object.keys(obj).forEach((k) => {
        if (obj[k] === null || obj[k] === undefined) {
            delete obj[k];
        }
    });
    return obj;
};

const AxiosClient = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
    headers: {
        'content-type': 'application/json'
    },
    timeout: 50000,
    paramsSerializer: (params) => queryString.stringify(cleanParam(params))
});
// AxiosClient.defaults.timeout = 10000

AxiosClient.interceptors.request.use(
    async (config) => {
        // Handle token here...
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

AxiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (error) => {
        let data = error.response.data
        if (data.status === 600) // loi mat token
            window.location.reload()
        return Promise.reject(error);
    }
);

export default AxiosClient;
