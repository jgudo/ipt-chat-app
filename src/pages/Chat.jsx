import ActiveUsers from 'components/chat/ActiveUsers';
import ChatBox from 'components/chat/ChatBox';
import Header from 'components/chat/Header';
import LoadingScreen from 'components/LoadingScreen';
import { useUser } from 'context/UserProvider';
import React, { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const Chat = ({ history, match }) => {
    const id = match.params.roomid;
    const [room, setRoom] = useState({
        id: '',
        owner: '',
        roomName: '',
        users: []
    });
    const { user } = useUser();
    const [chats, setChats] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeChats = firebase
            .db.collection('rooms').doc(id).collection('chats')
            .orderBy('createdAt', 'asc')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === 'added' || change.type === 'removed') {
                        let chats = [];
                        snapshot.forEach(function (doc) {
                            chats.push({ ...doc.data(), id: doc.id });
                        });
                        setChats(chats);
                    }
                });
            });

        const unsubscribeUsers = firebase
            .db.collection('rooms').doc(id)
            .onSnapshot((doc) => {
                const data = doc.data();
                if (data) {
                    setRoom({ ...data, users: data.users })
                    // setRoom({ ...data, id: doc.id });
                } else {
                    history.push('/join_room');
                }
            });

        return () => {
            unsubscribeChats();
            unsubscribeUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        firebase.getRoom(id)
            .then((doc) => {
                if (doc.exists) {
                    let chats = [];
                    const query = doc.ref.collection('chats');
                    query.orderBy('createdAt', 'asc').get().then((querySnapshots) => {
                        querySnapshots.forEach(function (doc) {
                            chats.push({ ...doc.data(), id: doc.id });
                        });
                        setRoom({ ...doc.data(), id });
                        setChats(chats);
                        firebase.joinRoom(id, user);
                    })
                } else {
                    history.push('/join_room');
                }

                setLoading(false);
            })
            .catch((e) => {
                history.push('/join_room');
            });

        return () => {
            firebase.leaveRoom(id, user.uid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSendMessage = (message) => {
        firebase.sendMessage(id, {
            sender: user.displayName,
            senderID: user.uid,
            message,
            photoURL: user.photoURL,
            createdAt: new Date().getTime()
        });
    };

    return isLoading ? <LoadingScreen info="Loading Chat Room, Please Wait..." /> : (
        <div className="chatroom">
            {window.screen.width > 480 && (
                <div className="chatroom-sidebar">
                    <Header room={room} />
                    <ActiveUsers users={room.users} />
                </div>
            )}
            <div className="chatroom-chat">
                <ChatBox userID={user.uid} chats={chats} onSendMessage={onSendMessage} />
            </div>
        </div>
    );
};

export default Chat;
