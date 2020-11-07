import React, { useState, createContext } from 'react';

export const RoomContext = createContext({});

const RoomProvider = ({ children }) => {
    const [room, setRoom] = useState({});

    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    );
};

export default RoomProvider;
