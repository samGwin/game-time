import React, { useState, useEffect } from 'react';
import './JoinGame.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as FirestoreService from '../../services/firestore';

function JoinGame(props) {

    const { onSelectGame, onCloseGames, userName, userId } = props;

    const [ error, setError ] = useState();
    const [ games, setGames ] = useState();

    useEffect(() => {
        const unsubscribe = FirestoreService.streamGames({
            next: querySnapshot => {
                const updatedGames = 
                    querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setGames(updatedGames);
            },
            error: () => setError('grocery-list-item-get-fail')
        });
        return unsubscribe;
    }, [games, setGames]);
    
    function getGameButtonList() {
        console.log('games', games[0].name);

        const buttonList = games.map(game => <button key={game.id} onClick={joinGame}>{game.name}</button>);
        return <div className="button-group">{buttonList}</div>;
    }

    function joinGame(e) {
        e.preventDefault();
        setError(null);

        FirestoreService.addUserToGame(userName, userId, e.id)
            .catch(() => setError('add-user-to-game-error'));
        
        onSelectGame(e.target.innerText);
    }

    function onCreateGameClick(e) {
        e.preventDefault();
        onCloseGames();
    }
    if(games) {
        return (
            <div>
                <div className="join-container">
                    <div>
                        <form name="addUserToGameForm">
                            <p>Join a game.</p>
                            {getGameButtonList()}
                            <ErrorMessage errorCode={error}></ErrorMessage>
                            <p><a href="/" onClick={onCreateGameClick}>Create a new Game</a></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else return null;
}

export default JoinGame;