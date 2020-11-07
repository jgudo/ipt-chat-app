import React from 'react';

const Header = ({ room }) => {
    return (
        <div className="chatroom-header">
            <span>Chat Room &nbsp;({room.users.length} People)</span>
            <h4>{room.roomName}</h4>
        </div>
    );
};

export default Header;
