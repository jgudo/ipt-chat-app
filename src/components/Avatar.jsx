import React from 'react';

const Avatar = ({ user }) => {
    return (
        <div className="avatar__profile">
            <img
                className="avatar__profile-item avatar__img"
                src={user.photoURL}
                alt={`${user.displayName}'s avatar`}
            />
            <h5 className="avatar__profile-item">{user.displayName}</h5>
        </div>
    );
};

export default Avatar;
