import React from 'react';

const Header = ({ room }) => {
    return (
        <div className="chatroom-header">
            <h4>{room.roomName}</h4>
            <span>Chat Room &nbsp;({room.users?.length || 0} People)</span>
            <span>Room ID: <strong><u>{room.id}</u></strong></span>
        </div>
    );
};

export default Header;
