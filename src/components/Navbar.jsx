import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from 'services/firebase';
import Avatar from './Avatar';

const Navbar = ({ user, clearData }) => {
    const history = useHistory();
    const { pathname } = useLocation();

    const onSignOut = async () => {
        try {
            await firebase.signOut();
            clearData();
        } catch (e) {
            console.log('Error signing out');
        }
    };

    const onJoinRoom = () => {
        history.push('/join_room');
    };

    const onCreateRoom = () => {
        history.push('/create_room');
    };

    return (
        <nav className="navbar">
            <div className="navbar__item-left">
                <h3 className="navbar__logo">IPT Chat App</h3>
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
            </div>
            {user.isAuth && (
                <div className="navbar__user">
                    <Avatar user={user} />
                    <button onClick={onSignOut}>Sign Out</button>
                </div>
            )}
        </nav>
    )
};

export default Navbar;
