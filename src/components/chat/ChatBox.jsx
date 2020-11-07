import React, { useState } from 'react';

const ChatBox = ({ room, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const onMessageInputChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
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
            </div>
            <div className="chatbox-input">
                <textarea
                    placeholder="Say something..."
                    onChange={onMessageInputChange}
                    style={{ padding: '15px 5px' }}
                    value={message}
                    rows={5}
                    cols={37}
                />
                <button className="btn-facebook" onClick={() => onSendMessage(message)}>Send Message</button>
            </div>
        </>
    );
};

export default ChatBox;
