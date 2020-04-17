import React, { useState, useEffect } from 'react';
import './JoinGame.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as FirestoreService from '../../services/firestore';
import * as api from '../../services/apimethods';

function JoinGame(props) {
 
    const { onSelectGame, onCloseGames, userName, userId } = props;

    const [ error, setError ] = useState();
    const [ games, setGames ] = useState();

    useEffect(() => {
        console.log('useEffect JOINGAME')
        FirestoreService.getGames()
            .then(querySnapshot => {
                const updatedGames = querySnapshot.docs.map(doc => {
                    return {id: doc.id, name: doc.data().name};
                })
                setGames(updatedGames);
            });
    }, []);
    
    function getGameButtonList() {
        const buttonList = games.map(game => <JoinButton key={game.id} gameId={game.id} label={game.name} onClick={joinGame}/>);
            return <div className="button-group">{buttonList}</div>;
    }

    function JoinButton(props) {

        const { gameId, label, onClick } = props;
        return(
            <button key={gameId} onClick={e => {onClick(e, gameId)}} >{label}</button>
            
        );
    }

    function joinGame(e, gameId) {
        e.preventDefault();
        setError(null);

        //console.log('e', e.target.value)
        //console.log('e', e.target.innerText)
        //console.log('e', e.target.key)
        //console.log('gameId', gameId);
        console.log('joinGame', gameId)
        try {
            api.addUserToGame(userName, userId, gameId)
        } catch(error) {
            return;
        }
        
        onSelectGame(gameId);
    }

    function onCreateGameClick(e) {
        e.preventDefault();
        onCloseGames();
    }
    if(games && games.length > 0) {
        return (
            <div>
                <div className="join-container">
                    <div>
                        <form name="addUserToGameForm">
                            <p>Join a game.</p>
                            {getGameButtonList()}
                            <ErrorMessage errorCode={error}></ErrorMessage>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else return null;
}

export default JoinGame; 