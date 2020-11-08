import React, { useContext, useState } from 'react';
import { AppContext } from 'context/Provider';
import firebase from 'services/firebase';

const JoinRoom = ({ history }) => {
    const [roomID, setRoomID] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { user } = useContext(AppContext);

    const onRoomInputChange = (e) => {
        setRoomID(e.target.value);
    };

    const onClickJoin = async () => {
        if (roomID) {
            try {
                setLoading(true);
                setError('');
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

                setLoading(false);
            } catch (e) {
                console.log('Error fetching room.', e);
                setLoading(false);
            }
        }
    };

    return (
        <div className="fade joinroom" style={{ opacity: `${isLoading ? .5 : 1}` }}>
            <div className="joinroom-wrapper">
                <h1>Join Room</h1>
                {error && <span className="form-label" style={{ color: 'red' }}>{error}</span>}
                <div className="joinroom-input">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        onChange={onRoomInputChange}
                        readOnly={isLoading}
                        value={roomID}
                    />
                    <button className="btn-facebook" disabled={isLoading} onClick={onClickJoin}>
                        {isLoading ? 'Joining Room...' : 'Join Room'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoom;
