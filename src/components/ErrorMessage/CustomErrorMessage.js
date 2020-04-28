import React from 'react';
import './CustomErrorMessage.css';

function CustomErrorMessage(props) {
    const { errorMessage } = props;

    return errorMessage ? <p className="error">{errorMessage}</p> : null;
};

export default CustomErrorMessage;