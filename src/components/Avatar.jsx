import React from 'react';

const Avatar = ({ user }) => {
    return (
        <ul className="avatar__profile">
            <li className="avatar__profile-item">
                <img
                    className="avatar__img"
                    src={user.photoURL}
                    alt={`${user.displayName}'s avatar`}
                />
            </li>
            <li className="avatar__profile-item">
                <h6>{user.displayName}</h6>
            </li>
        </ul>
    );
};

export default Avatar;
