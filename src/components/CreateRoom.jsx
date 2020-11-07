import { AppContext } from 'context/Provider';
import { RoomContext } from 'context/RoomProvider';
import React, { useContext, useState } from 'react';
import firebase from 'services/firebase';

const CreateRoom = ({ history }) => {
    const [roomID, setRoomID] = useState('');
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState(null);
    const { setRoom } = useContext(RoomContext);
    const { user } = useContext(AppContext);

    const onRoomIDChange = (e) => {
        setRoomID(e.target.value);
    };

    const onRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const onClickCreate = async () => {
        if (roomID) {
            try {
                const query = await firebase.getRoom(roomID);
                const roomExists = await query.data();

                if (roomExists) {
                    setError('Room ID already exist.');
                } else {
                    const room = {
                        chats: [],
                        roomName: roomName,
                        owner: user.uid,
                        users: [user]
                    };
                    await firebase.createRoom(roomID, room);
                    setRoom({ ...room, id: roomID });
                    history.push(`/chat/${roomID}`);
                }
            } catch (e) {
                console.log('Error fetching room.');
            }
        }
    }

    return (
        <div>
            <h1>Create Room</h1>
            <input
                type="text"
                placeholder="Room Name [ex: Holy Shit]"
                onChange={onRoomNameChange}
                value={roomName}
            />
            <br />
            <input
                type="text"
                placeholder="Enter Room ID"
                onChange={onRoomIDChange}
                value={roomID}
            />
            <button onClick={onClickCreate}>Create Room</button>
        </div>
    );
};

export default CreateRoom;
