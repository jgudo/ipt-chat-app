import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from 'context/RoomProvider';
import firebase from 'services/firebase';
import ActiveUsers from './ActiveUsers';
import { AppContext } from 'context/Provider';

const Chat = ({ history, match }) => {
    const id = match.params.roomid;
    const { room, setRoom } = useContext(RoomContext);
    const { user } = useContext(AppContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = firebase
            .db.collection('rooms').doc(id)
            .onSnapshot(function (doc) {
                // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                // console.log(source, " data: ", doc.data());
                setRoom(doc.data());
            })
        // .onSnapshot(snapshot => {
        //     if (snapshot.size) {
        //         // we have something
        //         // setLoading(false)
        //         console.log('CHANGGE');
        //     } else {
        //         // it's empty
        //         // setLoading(false)
        //     }
        // })
        return () => {
            unsubscribe();
        }
    }, [firebase])

    useEffect(() => {
        firebase.getRoom(id)
            .then((doc) => {
                if (doc.exists) {
                    setRoom({ ...doc.data(), id });
                } else {
                    history.push('/join_room');
                }
            })
    }, [id]);

    const onMessageInputChange = (e) => {
        setMessage(e.target.value);
    };

    const onSendMessage = () => {
        firebase.sendMessage(id, {
            sender: user.uid,
            message,
            createdAt: new Date().getTime()
        });
    };

    return (
        <div>
            <h1>Chat Room: {room.roomName}</h1>
            <ActiveUsers users={room.users} />
            {room.chats && room.chats.map((msg) => (
                <span key={msg.createdAt}>{msg.message}</span>
            ))}

            <div style={{ position: 'fixed', bottom: 0 }}>
                <input
                    type="text"
                    placeholder="Say something..."
                    onChange={onMessageInputChange}
                    style={{ padding: '15px 5px' }}
                    value={message}
                />
                <button onClick={onSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
