import React, { useState, useEffect, createContext } from 'react';
import firebase from 'services/firebase';
import LoadingScreen from 'components/LoadingScreen';

export const AppContext = createContext({});

const Provider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        firebase.auth.onAuthStateChanged(async (userData) => {
            if (userData) {
                const { photoURL, displayName, email, uid } = userData;

                const query = await firebase.getUser(uid);
                const userFromDb = query.data();
                console.log(userFromDb);

                const userObj = {
                    photoURL: photoURL ? photoURL : `https://ui-avatars.com/api/?name=${user.displayName}`,
                    displayName,
                    email,
                    uid,
                    isAuth: true
                };

                if (!userFromDb) {
                    await firebase.addUser(uid, userObj);
                    setUser(userObj);
                } else {
                    setUser({ ...userFromDb, uid, isAuth: true });
                }

                console.log(userData);
            } else {
                console.log('Cannot sign in')
            }

            setLoading(false);
        })
    }, []);

    const clearData = () => {
        setUser({});
    };

    return (
        <AppContext.Provider value={{ user, clearData, isLoading, setLoading }}>
            {isLoading ? <LoadingScreen /> : children}
        </AppContext.Provider>
    )
};

export default Provider;
