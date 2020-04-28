import * as api from './api.js';

export function createGame(userName, userId, gameName) {
    return api.postAPI(api.API_GAMES_URI, {userName, userId, gameName, gameType: 'catchphrase'})
            .catch(error => {throw new Error(error.message)});
}

export function addUserToGame(userName, userId, gameId) {
    return api.postAPI(api.API_USERS_URI, {userName, userId, gameId})
            .catch(error => {throw new Error(error.message)});
}

export function joinGame(gameId, userId, team) {
    return api.postAPI(api.API_GAMES_URI, {userId, gameId, team})
            .catch(error => {throw new Error(error.message)});
}