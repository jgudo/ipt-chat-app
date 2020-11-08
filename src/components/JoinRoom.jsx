import React, { useContext, useState } from 'react';
import { AppContext } from 'context/Provider';
import firebase from 'services/firebase';

const JoinRoom = ({ history }) => {
    const [roomID, setRoomID] = useState('');
    const [error, setError] = useState(null);
    const { user } = useContext(AppContext);

    const onRoomInputChange = (e) => {
        setRoomID(e.target.value);
    };

    const onClickJoin = async () => {
        if (roomID) {
            try {
                const query = await firebase.getRoom(roomID);
                const searchedRoom = await query.data();

                if (searchedRoom) {
                    // setRoom({ ...searchedRoom });
                    await firebase.joinRoom(roomID, user);
                    setError(null);
                    history.push(`/chat/${roomID}`);
                } else {
                    setError('Room not found.');
                }
            } catch (e) {
                console.log('Error fetching room.', e);
            }
        }
    };

    return (
        <div className="fade joinroom">
            <div className="joinroom-wrapper">
                <h1>Join Room</h1>
                {error && <span>{error}</span>}
                <div className="joinroom-input">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={onRoomInputChange}
                        value={roomID}
                    />
                    <button onClick={onClickJoin}>Join Room</button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoom;
