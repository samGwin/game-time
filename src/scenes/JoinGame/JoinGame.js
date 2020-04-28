import React, { useState, useEffect } from 'react';
import './JoinGame.css';
import CustomErrorMessage from '../../components/ErrorMessage/CustomErrorMessage';
import * as FirestoreService from '../../services/firestore';
import * as api from '../../services/apimethods';

function JoinGame(props) {
 
    const { onSelectGame, onCloseGames, userName, userId } = props;

    const [ error, setError ] = useState();
    const [ games, setGames ] = useState();

    useEffect(() => {
        FirestoreService.getGames()
            .then(querySnapshot => {
                const updatedGames = querySnapshot.docs.map(doc => {
                    return {id: doc.id, name: doc.data().name};
                })
                setGames(updatedGames);
            });
    }, []);
    
    function getGameButtonList() {
        const buttonList = games.map((game, index) => <JoinButton key={index} gameId={game.id} label={game.name} onClick={joinGame}/>);
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

        console.log('joinGame', gameId, userId, userName);
        
        api.addUserToGame(userName, userId, gameId)
            .then(() => onSelectGame(gameId))
            .catch(error => {
                setError(error.message)
            });
            
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
                            <CustomErrorMessage errorMessage={error}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else return null;
}

export default JoinGame; 