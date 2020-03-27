import React, { useState } from 'react';
import './CreateList.css';
import * as FirestoreService from '../../services/firestore';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CreateList(props) {

    const { onCreate, userName, userId } = props;

    const [ error, setError ] = useState();

    function createGame(e) {
        e.preventDefault();
        setError(null);

        const gameName = document.createListForm.gameName.value;

        if (!gameName) {
            setError('game-name-required');
            return;
        }

        FirestoreService.createGame(userName, userId, gameName)
            .then(docRef => {
                onCreate(docRef.id);
            })
            .catch(reason => setError('create-list-error'));
    }

    return (
        <div>
            <div className="create-container">
                <div>
                    <form name="createListForm">
                        <p><label>Create a new Game!</label></p>
                        <p><input type="text" name="gameName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createGame}>Create a new Game</button></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateList;