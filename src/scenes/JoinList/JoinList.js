import React, { useState, useEffect } from 'react';
import './JoinList.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as FirestoreService from '../../services/firestore';

function JoinList(props) {

    const { onSelectGame, onCloseGameList, userName, userId } = props;

    const [ error, setError ] = useState();
    const [ gameList, setGameList ] = useState();

    useEffect(() => {
        const unsubscribe = FirestoreService.streamGameList({
            next: querySnapshot => {
                const updatedGameList = 
                    querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setGameList(updatedGameList);
            },
            error: () => setError('grocery-list-item-get-fail')
        });
        return unsubscribe;
    }, [gameList, setGameList]);
    
    function getGameButtonList() {
        console.log('gameList', gameList[0].name);

        const buttonList = gameList.map(game => <button key={game.id} onClick={joinGame}>{game.name}</button>);
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
        onCloseGameList();
    }
    if(gameList) {
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

export default JoinList;