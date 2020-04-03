import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/firestore';

import CreateGame from './scenes/CreateGame/CreateGame';
import JoinGame from './scenes/JoinGame/JoinGame';
import Login from './scenes/Login/Login';
import EditList from './scenes/EditList/EditList';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import useQueryString from './hooks/useQueryString'


function App() {

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [game, setGame] = useState();
  const [games, setGames] = useState();
  const [error, setError] = useState();

  // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
  const [gameId, setGameId] = useQueryString('listId');

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    FirestoreService.authenticateAnonymously().then(userCredential => {
      setUserId(userCredential.user.uid);
      if (gameId) {
        FirestoreService.getGame(gameId)
          .then(game => {
            if (game.exists) {
              setError(null);
              setGame(game.data());
            } else {
              setError('game-not-found');
              setGame();
            }
          })
          .catch(() => setError('game-get-fail'));
      }
    })
    .catch(() => setError('anonymous-auth-failed'));
  }, [gameId, setGameId]);

  function onCreateGame(gameId) {
    setGameId(gameId);
  }

  function onCreateUser(userName) {
    setUser(userName)
  }

  function onCloseGames() {
    setGameId();
    setGame();
    setUser();
  }

  function onSelectGame(gameName, userName) {
    setUser(userName);
    FirestoreService.getGame(gameId)
      .then(updatedGame => setGame(updatedGame.data()))
      .catch(() => setError('game-get-fail'));
  }
  
  // render a scene based on the current state
  if (game && user) {
    //return <EditList {...{ groceryListId, user, onCloseGroceryList, userId}}></EditList>;
    return null;
  } else if(!user) {
    return(
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <Login onCreateUser={onCreateUser}></Login>
      </div>
    );
  }
  return (
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <JoinGame {...{onSelectGame, games, onCloseGames, userId}}></JoinGame>
      <CreateGame onCreate={onCreateGame} userName={user} userId={userId}></CreateGame>
    </div>
  );
}

export default App;
