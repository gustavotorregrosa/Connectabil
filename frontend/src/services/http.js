import React, {Component} from 'react';

class HttpService extends Component {

    apiUrl = 'http://localhost:4200'

    doFetch = async ({url, method, data}) => {
        let request = this.generateRequestObject(url, method, data)
        let response = await fetch(request)
        let status = response.status

        response = await response.json()
        return response

    }

    generateRequestObject = (url, method = 'get', data = {}) => {
        
        let reqJsonObj = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        }

        if(method == 'post' || method == 'put'){
            reqJsonObj = {
                ...reqJsonObj,
                body: JSON.stringify({
                    ...data
                }),
            }
        }

        const request = new Request(this.apiUrl + url, reqJsonObj)
        return request
    }
}

export default HttpService

