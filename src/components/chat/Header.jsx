import React from 'react';

const Header = ({ roomName }) => {
    return (
        <div className="chat-header">
            <h4>Chat Room: {roomName}</h4>
        </div>
    );
};

export default Header;
