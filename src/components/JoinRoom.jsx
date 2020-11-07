import { RoomContext } from 'context/RoomProvider';
import React, { useContext, useState } from 'react';
import firebase from 'services/firebase';

const JoinRoom = ({ history }) => {
    const [roomID, setRoomID] = useState('');
    const [error, setError] = useState(null);
    const { setRoom } = useContext(RoomContext);

    const onRoomInputChange = (e) => {
        setRoomID(e.target.value);
    };

    const onClickJoin = async () => {
        if (roomID) {
            try {
                const query = await firebase.getRoom(roomID);
                const searchedRoom = await query.data();

                if (searchedRoom) {
                    setRoom({ ...searchedRoom });
                    setError(null);
                    history.push(`/chat/${roomID}`);
                } else {
                    setError('Room not found.');
                }
            } catch (e) {
                console.log('Error fetching room.');
            }
        }
    };

    return (
        <div>
            <h1>Join Room</h1>
            {error && <span>{error}</span>}
            <input
                type="text"
                placeholder="Enter Room ID"
                onChange={onRoomInputChange}
                value={roomID}
            />
            <button onClick={onClickJoin}>Join Room</button>
        </div>
    );
};

export default JoinRoom;
