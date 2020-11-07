import React from 'react';

const ActiveUsers = ({ users }) => {
    return (
        <div className="active-users">
            {users && users.map((user) => (
                <div className="active-users-item" key={user.uid}>
                    <img className="avatar__img" src={user.photoURL} alt="" />
                    <h5 className="active-users-name">{user.displayName}</h5>
                </div>
            ))}
        </div>
    );
};

export default ActiveUsers;
