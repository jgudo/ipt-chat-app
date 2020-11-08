import React from 'react';

const Avatar = ({ user }) => {
    return (
        <div className="avatar__profile">
            <img
                className="avatar__profile-item avatar__img"
                // src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                src={user.photoURL || `https://avatar.oxro.io/avatar.svg?name=${user.displayName}`}
                alt=""
            />
            <h5 className="avatar__profile-item">{user.displayName}</h5>
        </div>
    );
};

export default Avatar;
