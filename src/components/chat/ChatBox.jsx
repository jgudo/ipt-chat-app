import React, { useState } from 'react';
import moment from 'moment';

const ChatBox = ({ userID, chats, onSendMessage }) => {
    const [message, setMessage] = useState('');

    const onMessageInputChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message) {
            onSendMessage(message.trim());
            setMessage('');
        }
    }

    const className = (id) => {
        return userID === id ? 'chat-item chat-item-sent' : 'chat-item';
    }

    return (
        <>
            <div className="chatbox">
                {chats.map((msg) => (
                    <div className={className(msg.senderID)} key={msg.id}>
                        <img className="avatar__img" src={msg.photoURL} alt="" />
                        <div className="chat-item-container">
                            <div className="chat-item-block">
                                <h6>{msg.sender}</h6>
                                <p>{msg.message}</p>
                            </div>
                            <span className="chat-timestamp">{moment(msg.createdAt).fromNow()}</span>
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
                <button className="btn-facebook" onClick={sendMessage}>Send Message</button>
            </div>
        </>
    );
};

export default ChatBox;
