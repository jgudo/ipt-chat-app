import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'services/firebase';
import Avatar from './Avatar';

const Navbar = ({ user, clearData }) => {
    const history = useHistory();

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
            <h3 className="navbar__logo">Chat App</h3>
            {user.isAuth && (
                <div className="navbar__user">
                    <button onClick={onJoinRoom}>Join Room</button>
                    <button onClick={onCreateRoom}>Create Room</button>
                    <Avatar user={user} />
                    <button onClick={onSignOut}>Sign Out</button>
                </div>
            )}
        </nav>
    )
};

export default Navbar;
