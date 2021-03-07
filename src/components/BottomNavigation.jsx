import { useUser } from 'context/UserProvider';
import React from 'react';
import { useHistory } from 'react-router-dom';

const BottomNavigation = () => {
    const history = useHistory();
    const { user } = useUser();

    const onJoinRoom = () => {
        history.push('/join_room');
    };

    const onCreateRoom = () => {
        history.push('/create_room');
    };

    return (
        <nav className="bottom-nav">
            {user.isAuth && (
                <div className="navbar__actions">
                    <button className="btn-icon btn-primary-dark btn-small" onClick={onJoinRoom}>
                        <i className="fa fa-sign-in-alt" />
                        <span>Join Room</span>
                    </button>
                    <button className="btn-icon btn-accent btn-small" onClick={onCreateRoom}>
                        <i className="fa fa-plus" />
                        <span>Create Room</span>
                    </button>
                </div>

            )}
        </nav >
    )
};

export default BottomNavigation;
