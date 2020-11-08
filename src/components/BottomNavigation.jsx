import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const BottomNavigation = ({ user, clearData }) => {
    const history = useHistory();
    const { pathname } = useLocation();

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
                    {pathname !== '/join_room' && (
                        <button className="btn-icon" onClick={onJoinRoom}>
                            <i className="fa fa-sign-in-alt" />
                            <span>Join Room</span>
                        </button>
                    )}
                    {pathname !== '/create_room' && (
                        <button className="btn-icon" onClick={onCreateRoom}>
                            <i className="fa fa-plus" />
                            <span>Create Room</span>
                        </button>
                    )}
                </div>

            )}
        </nav >
    )
};

export default BottomNavigation;
