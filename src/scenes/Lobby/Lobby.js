import React, { useState, useEffect } from 'react';
import './Lobby.css';
import CustomErrorMessage from '../../components/ErrorMessage/CustomErrorMessage';
import * as FirestoreService from '../../services/firestore';
import * as api from '../../services/apimethods';

function Lobby(props) {
 
    const { userName, gameId } = props;

    const [ error, setError ] = useState();
    const [ users, setUsers ] = useState();

    useEffect(() => {
        console.log('lobby gameId', gameId)
        const unsubscribe = FirestoreService.streamGame(gameId, {
            next: documentSnapshot => {
                const updatedUsers = documentSnapshot.get('users');
                console.log('updatedUsers', updatedUsers);
                if(updatedUsers !== users) setUsers(updatedUsers);
            },
            error: () => setError('Failed getting Users')
        });
        return unsubscribe;
    }, [props.gameId]);
    
    function getUserList() {
        console.log('users', users);
        if(users) return users.map((user, index) => <div key={index}>{user.name}</div>);
        return null;
    }

    function startGame(e) {
        e.preventDefault();
        setError(null);

        /*
        console.log('joinGame', gameId, userId, userName);
        
        api.addUserToGame(userName, userId, gameId)
            .then(() => onSelectGame(gameId))
            .catch(error => {
                setError(error.message)
            });
        */
            
    }

    function onCreateGameClick(e) {
        e.preventDefault();
        //onCloseGames();
    }

    return (
        <div>
            <div className="lobby-container">
                <CustomErrorMessage errorMessage={error}/>
                <div class="users-container">
                    <p>Players</p>
                    {getUserList()} 
                </div>
                <div className="info-container">
                    <p>Game Information</p>
                    <p>Start</p>
                </div>                
            </div>
        </div>
    );
}

export default Lobby; 