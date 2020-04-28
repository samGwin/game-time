import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};


//game code

/*
export const createGame = (userName, userId, gameName) => {
    console.log(userName, userId, gameName);
    return db.collection('games')
        .add({
            name: gameName,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                user: userName,
                team: '',
            }],
            playerTurn: '',
            start: false
        });      
};
*/

export const getGames= () => {
    return db.collection('games')
        .get();
};

export const getGamesSnapshot = () => {
    return getGames()
        .then(querySnapshot => {
            return querySnapshot.docs
        });
};

export const streamGames = (observer) => {
    return db.collection('games')
        .orderBy('created')
        .onSnapshot(observer);
};

export const getGame = gameId => {
    return db.collection('games')
        .doc(gameId)
        .get();
};

const gameRef = (gameId) => {
    return db.collection('games')
        .doc(gameId)
}


export const streamGame = (gameId, observer) => {
    return gameRef(gameId)
    .onSnapshot(observer)
}

/*
export const streamGroceryListItems = (groceryListId, observer) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .orderBy('created')
        .onSnapshot(observer);
};
*/

/*
export const updateStartGame = (userId, gameId) => {
    return db.collection('games')
        .doc(gameId)
        .update({
            playerTurn: userId,
            start:true,
        });
};

export const updatePlayerTurn = (userId, gameId) => {
    return db.collection('games')
        .doc(gameId)
        .update({
            playerTurn: userId
        });
};

export const addUserToGame = (userName, userId, gameId)=> {
    return db.collection('games')
        .doc(gameId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({ 
                userId: userId,
                user: userName
            })
        });
};
*/

//end game code

export const createGroceryList = (userName, userId) => {
    return db.collection('groceryLists')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{ 
                userId: userId,
                name: userName
            }]
        });
};

export const getGroceryList = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .get();
};

export const getGroceryListItems = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .get();
}

export const streamGroceryListItems = (groceryListId, observer) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .orderBy('created')
        .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({ 
                userId: userId,
                name: userName
            })
        });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
    return getGroceryListItems(groceryListId)
        .then(querySnapshot => querySnapshot.docs)
        .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
        .then(matchingItem => {
            if (!matchingItem) {
                return db.collection('groceryLists')
                    .doc(groceryListId)
                    .collection('items')
                    .add({
                        name: item,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        createdBy: userId
                    });
            }
            throw new Error('duplicate-item-error');
        });
};