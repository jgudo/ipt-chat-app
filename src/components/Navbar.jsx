import { useUser } from 'context/UserProvider';
import logo from 'images/logo.png';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from 'services/firebase';
import Avatar from './Avatar';

const Navbar = () => {
    const history = useHistory();
    const [isSigningOut, setSigningOut] = useState(false);
    const { pathname } = useLocation();
    const { user, clearData } = useUser();

    const onSignOut = async () => {
        try {
            setSigningOut(true);
            await firebase.signOut();
            setSigningOut(false);
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

    const onClickHome = () => {
        if (user.isAuth) return;

        history.push('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar__item-left">
                <div onClick={onClickHome} className="btn-link navbar__logo" to="/">
                    <img src={logo} alt="" />
                    <h3 className="navbar__logo-name">IPT Chat App</h3>
                </div>
                {(user.isAuth && window.screen.width > 480) && (
                    <div className="navbar__actions">
                        {pathname !== '/join_room' && (
                            <button className="btn-icon btn-primary-dark btn-small" onClick={onJoinRoom}>
                                <i className="fa fa-sign-in-alt" />
                                <span>Join Room</span>
                            </button>
                        )}
                        {pathname !== '/create_room' && (
                            <button className="btn-icon btn-accent btn-small" onClick={onCreateRoom}>
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
                    <button
                        className="btn-primary-dark btn-small"
                        disabled={isSigningOut}
                        onClick={onSignOut}
                    >
                        {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                    </button>
                </div>
            )}
        </nav>
    )
};

export default Navbar;
