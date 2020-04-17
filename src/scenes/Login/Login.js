import React, { useState } from 'react';
import './Login.css';
import * as FirestoreService from '../../services/firestore';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function Login(props) {

    const { onCreateUser } = props;

    const [ error, setError ] = useState();

    function createUser(e) {
        e.preventDefault();
        setError(null);

        const userName = document.loginForm.userName.value;
        console.log('username', userName);
        if (!userName) {
            setError('user-name-required');
            return;
        }
        //const id = null;
        //validation({userName, id})
        onCreateUser(userName)
    }

    function validation(body) {
        let error = '';
        for (let [key, value] of Object.entries(body)) {
            console.log('test', key, value)
            if(!value) {
                error = error + key + ", ";
            }
        }
        if(error !== '') {
            error = error + "properties were not sent."
            throw new Error(error);
        }
    }

    return (
        <div>
            <header>
                <h1>Welcome to the Game app!</h1>
            </header>
            <div className="login-container">
                <div>
                    <form name="loginForm">
                        <p><label>Username?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createUser}>Login!</button></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;