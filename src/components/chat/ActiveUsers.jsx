import React from 'react';

const ActiveUsers = ({ users }) => {
    return (
        <div>
            {users && users.map((user) => (
                <div key={user.uid}>
                    <img src={user.photoURL} alt="" />
                    <h5>{user.displayName}</h5>
                </div>
            ))}
        </div>
    );
};

export default ActiveUsers;
