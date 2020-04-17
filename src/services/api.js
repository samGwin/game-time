import fetch from 'isomorphic-fetch';


export const API_ROOT = 'https://gametime-95239.web.app/api';
export const API_GAMES_URI = `${API_ROOT}/games`;
export const API_USERS_URI = `${API_GAMES_URI}/users`;
export const API_TEAMS_URI = `${API_GAMES_URI}/teams`;
export const API_START_URI = `${API_GAMES_URI}/start`;
export const API_TURN_URI = `${API_GAMES_URI}/turn`;


export function putApi(endpoint, obj) {
    return fetch(endpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(json => {
            console.log('test', json)
            return json;
        });
}

export function postAPI(endpoint, obj) {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(json => {
            console.log('test', json)
            return json;
        })
        .catch(error => {throw new Error(error)});
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    response.json()
        .then(json => json.error)
        .then(error => {
            console.log(error);
            throw new Error(error)
        })

    //const reader = response.body.text;
    //console.log('error response', response);

    /*
    if(response.body){
        return response.text()
        .then(function(text){
            if(text) {
                console.log('error', text);
                throw new Error(text);
            }
            else {
                throw new Error(response.statusText);
            }
        });
    }
    else {
        throw new Error(response.statusText);
    
    }
    */
}