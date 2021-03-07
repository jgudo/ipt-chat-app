import LoadingScreen from 'components/LoadingScreen';
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'services/firebase';

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
                    photoURL: photoURL ? photoURL : `https://avatar.oxro.io/avatar.svg?name=${user.displayName}`,
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
                console.log('Cannot sign in');
                setUser({});
            }

            setLoading(false);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const useUser = () => {
    const { user, clearData } = useContext(AppContext);

    return { user, clearData };
}

export default Provider;
