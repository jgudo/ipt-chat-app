import React, { useState } from 'react';

const ChatBox = ({ room, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const onMessageInputChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="chatbox">
            {room.chats && room.chats.map((msg) => (
                <div key={msg.createdAt}>
                    <img src={msg.photoURL} alt="" />
                    <div>
                        <h6>{msg.sender}</h6>
                        <p>{msg.message}</p>
                    </div>
                </div>
            ))}
            <div className="chatbox-input">
                <input
                    type="text"
                    placeholder="Say something..."
                    onChange={onMessageInputChange}
                    style={{ padding: '15px 5px' }}
                    value={message}
                />
                <button onClick={() => onSendMessage(message)}>Send Message</button>
            </div>
        </div>
    );
};

export default ChatBox;
