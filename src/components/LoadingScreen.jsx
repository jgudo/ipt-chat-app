import React from 'react';
import logodark from 'images/logo-dark.png';

const LoadingScreen = ({ info }) => {
    return (
        <div className="loader fade">
            <img src={logodark} alt="" style={{ width: '100px' }} />
            <h1>IPT Chat App</h1>
            <br />
            {info && <span>{info}</span>}
            <br />
            <div className="spinner" />
        </div>
    );
};

export default LoadingScreen;
