import React from 'react';
import Header from './Header';
import ActiveUsers from './ActiveUsers';

const Drawer = ({ room }) => {
    return (
        <div className="drawer">
            <Header room={room} />
            <ActiveUsers users={room.users} />
        </div>
    );
};

export default Drawer;
