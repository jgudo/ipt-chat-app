import { useState, useEffect } from 'react';
import firebase from 'services/firebase';

const useAuth = () => {
    const [user, setUser] = useState(() => ({
        id: ''
    }));

    useEffect(() => {
        // firebase.auth.onAuthStateChange((user) => {
        //     if (user) {

        //     } else {

        //     }
        // });
        console.log(firebase.auth.currentUser);
    }, [])

    return [];
};

export default useAuth;