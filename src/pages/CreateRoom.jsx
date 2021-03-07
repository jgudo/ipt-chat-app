import { useRoom } from 'context/RoomProvider';
import { useUser } from 'context/UserProvider';
import React, { useState } from 'react';
import firebase from 'services/firebase';

const CreateRoom = ({ history }) => {
    const [roomID, setRoomID] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState(null);
    const { setRoom } = useRoom()
    const { user } = useUser();

    const onRoomIDChange = (e) => {
        setRoomID(e.target.value);
    };

    const onRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const onClickCreate = async () => {
        if (roomID) {
            try {
                setLoading(true);
                setError('');
                const query = await firebase.getRoom(roomID);
                const roomExists = await query.data();

                if (roomExists) {
                    setError('Room ID already exist.');
                    setLoading(false);
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
                setLoading(false);
            }
        }
    }

    return (
        <div className="fade createroom" style={{ opacity: `${isLoading ? .5 : 1}` }}>
            <div className="createroom-wrapper">
                <h1>Create Room</h1>
                {error && <span className="form-label label--error">{error}</span>}
                <div className="createroom-input">
                    <input
                        type="text"
                        placeholder="Room Name [ex: Holy Shit]"
                        onChange={onRoomNameChange}
                        readOnly={isLoading}
                        value={roomName}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={onRoomIDChange}
                        readOnly={isLoading}
                        value={roomID}
                    />
                    <br />
                    <button className="btn-facebook" disabled={isLoading} onClick={onClickCreate}>
                        {isLoading ? 'Creating Rooom...' : 'Create Room'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoom;
