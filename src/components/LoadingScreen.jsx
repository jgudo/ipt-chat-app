import logodark from 'images/logo-dark.png';
import React from 'react';

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
