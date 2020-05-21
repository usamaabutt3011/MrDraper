import * as  Util from '../index'
import axios from 'axios';

class Api {

    static postAxios(route, formData, config) {
        return this.axiosPost(route, formData, config)
    }

    static getAxios(route, formData, config) {
        return this.axiosGet(route, formData, config)
    }

    static putAxios(route, params, config) {
        return this.axiosPut(route, params, config)
    }

    static postRequest(route, params) {
        return this.func(route, params, 'POST')
    }

    static postRequest = (endpoint, params) => {
        return fetch(`${Util.stagingServer}${endpoint}`, { //stagingServer , ngrokServer
            method: 'POST',
            headers: Util.Interceptor.getHeaders(),
            body: JSON.stringify(params),

        })
        // .then((response) => {
        //     successcallback(response)
        // })
        //     .catch((err) => {
        //         errorcallback(err)
        //     });
    }

    static axiosPost = async (endpoint, formData, config) => { //stagingServer , ngrokServer

        const url = `${Util.stagingServer}${endpoint}`
        let options = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            //timeout: 100000, // default is `0` (no timeout)
        }
        // let configration = Object.assign(config, options)
        // let configration = Object.assign(config)

        return axios.post(url,
            formData,
            // configration,
        )   
            .then((response) => {
                // console.log('SUCCESS!!', response);
                return response.data
            })
            .catch((error) => {
                // console.log('FAILURE!!', error);
                return error
            });
    }

    static axiosGet = async (endpoint, formData, config) => { //stagingServer , ngrokServer
        let url, url_params
        const keys = Object.keys(formData)
        const values = Object.values(formData)
        const paramArray = []
        if  (keys.length > 0) {
            keys.forEach(item => {
                paramArray.push(item+'='+formData[item])
            })
            url_params = paramArray.join('&')
            // console.log('[newp_arams]',url_params);
        }

        if(url_params.length > 0){
             url = `${Util.stagingServer}${endpoint}?${url_params}`
        }else{
             url = `${Util.stagingServer}${endpoint}`
        }
        // console.log('[URL API]', url);
        
        return axios.get(url,
            formData,
            // configration,
        )   
            .then((response) => {
                // console.log('SUCCESS!!', response);
                return response.data
            })
            .catch((error) => {
                // console.log('FAILURE!!', error);
                return error
            });
    }

    static axiosPut = async (endpoint, formData, config) => { //stagingServer , ngrokServer
        return fetch(`${Util.stagingServer}${endpoint}`, { //stagingServer , ngrokServer
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((responseJOSN) => {
            // console.log('SUCCESS!!', responseJOSN);
            return responseJOSN
        })
        .catch((error) => {
            // console.log('FAILURE!!', error);
            return error
        });   
    }

}

export default Api;
