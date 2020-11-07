import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from 'context/RoomProvider';
import firebase from 'services/firebase';
import ActiveUsers from './ActiveUsers';
import { AppContext } from 'context/Provider';
import Header from './Header';
import ChatBox from './ChatBox';

const Chat = ({ history, match }) => {
    const id = match.params.roomid;
    const { room, setRoom } = useContext(RoomContext);
    const { user } = useContext(AppContext);

    useEffect(() => {
        const unsubscribe = firebase
            .db.collection('rooms').doc(id).collection('chats')
            .onSnapshot(function (snapshot) {
                // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                // console.log(source, " data: ", doc.data());
                // console.log(doc.data());
                // let rooms = [];
                // querySnapshot.forEach(function (doc) {
                //     rooms.push({ ...doc.data(), id: doc.id });
                // });
                // console.log(rooms);
                if (!snapshot.metadata.hasPendingWrites) {
                    console.log('from server')
                }
                // setRoom(rooms);
                // querySnapshot.docChanges().forEach(function (change) {
                //     if (change.type === "added") {
                //         console.log("New city: ", change.doc.data());
                //     }
                //     if (change.type === "modified") {
                //         console.log("Modified city: ", change.doc.data());
                //     }
                //     if (change.type === "removed") {
                //         console.log("Removed city: ", change.doc.data());
                //     }
                // });
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
                    let chats = [];
                    const query = doc.ref.collection('chats');
                    query.get().then((querySnapshots) => {
                        querySnapshots.forEach(function (doc) {
                            chats.push({ ...doc.data(), id: doc.id });
                        });
                        console.log(chats);
                        setRoom({ ...doc.data(), id, chats });
                    })
                } else {
                    history.push('/join_room');
                }
            })
    }, [id]);

    const onSendMessage = (message) => {
        firebase.sendMessage(id, {
            sender: user.uid,
            message,
            photoURL: user.photoURL,
            createdAt: new Date().getTime()
        });
    };

    return (
        <div className="chatroom">
            <div className="chatroom-sidebar">
                <Header room={room} />
                <ActiveUsers users={room.users} />
            </div>
            <div className="chatroom-chat">
                <ChatBox room={room} onSendMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default Chat;
