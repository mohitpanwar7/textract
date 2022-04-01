import { API_BASE_URL, token } from '../constant/index';

var apiVersion = "v1";

const request = (options) => {
    const ISSERVER = typeof window === "undefined";
    // var token = token;
    // if (!ISSERVER) {
    //     token = localStorage.getItem('access_token');
    // }
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        ).catch(e => {
            if (e.status == 401) {
                const loggedInUsers = localStorage.getItem(LOGGED_IN_USERS);
                localStorage.clear();
                localStorage.setItem(LOGGED_IN_USERS, loggedInUsers);
                window.location = "/signIn";
            }
        });
};

const requestMultipart = (options) => {
    const ISSERVER = typeof window === "undefined";
    // var token = "";
    // if (!ISSERVER) {
    //     token = localStorage.getItem('access_token');
    // }
    const headers = new Headers({
        "Authorization": "Bearer " + token,
    });

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        ).catch(e => {
            if (e.status == 401) {
                console.log("error ::",e)
            }
        });
};

const requestBlob = (options) => {
    // const ISSERVER = typeof window === "undefined";
    // var token = "";
    // if (!ISSERVER) {
    //     token = localStorage.getItem('access_token');
    // }
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.blob().then(blob => {
                if (!response.ok) {
                    return Promise.reject(blob);
                }
                return blob;
            })
        ).catch(e => {
            if (e.status == 401) {
                console.log("error ::",e)
            }
        });
};


export function deleteDataModel(id) {
    return request({
        url: API_BASE_URL + 'api/dataModel/deleteDataModel/' + id,
        method: 'DELETE'
    });
}

export function getFileInfo(id) { 
    return request({
        url: API_BASE_URL + "api/" + apiVersion + "/getFileInfo/" + id,
        method: 'GET'
    });
}

export function getFileInfoPublic(data) { 
    return request({
        url: API_BASE_URL + "api/" + apiVersion + "/getFileInfoPublic",
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function scriptUploadSpreadSheet(data) { 
    return requestMultipart({
        url: API_BASE_URL + "api/upload/scriptUploadSpreadSheet",
        method: 'POST',
        body: data,

    });
}

export function downloadFileBlob(createdBy, fileName) {
    return requestBlob({
        url: API_BASE_URL_ISTORIA + 'api/' + apiVersion + '/downloadFile/' + createdBy + '/' + fileName,
        method: 'GET',
    });
}

export function uploadInvoice(data) { 
    return requestMultipart({
        url: API_BASE_URL + "api/v1/master/invoice/upload",
        method: 'POST',
        body: data,
    });
}

export function requestScan(data) { 
    return request({
        url: API_BASE_URL + "api/v1/user/products/get-extracted-data",
        method: 'POST',
        body: JSON.stringify(data)
    });
}