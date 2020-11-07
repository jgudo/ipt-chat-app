import React, { useState } from 'react';

const ChatBox = ({ room, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const onMessageInputChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="chatbox">
            {room.chats && room.chats.map((msg) => (
                <span key={msg.createdAt}>{msg.message}</span>
            ))}
            <div className="chatbox-input">
                <input
                    type="text"
                    placeholder="Say something..."
                    onChange={onMessageInputChange}
                    style={{ padding: '15px 5px' }}
                    value={message}
                />
                <button onClick={() => onSendMessage(message)}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
