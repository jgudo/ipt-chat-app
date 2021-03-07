import React, { createContext, useContext, useState } from 'react';

export const RoomContext = createContext({});

const RoomProvider = ({ children }) => {
    const [room, setRoom] = useState({});

    return (
        <RoomContext.Provider value={{ room, setRoom }}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRoom = () => {
    const { room, setRoom } = useContext(RoomContext);

    return { room, setRoom };
}

export default RoomProvider;
