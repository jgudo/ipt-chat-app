import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.db = app.firestore();
        this.auth = app.auth();
    }

    getUser = (id) => this.db.collection('users').doc(id).get();

    generateUserKey = () => this.db.collection('users').doc().id;

    createUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    addUser = (id, user) => this.db.collection('users').doc(id).set(user);

    signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    signInWithFacebook = () => {
        const fb = new app.auth.FacebookAuthProvider();

        return this.auth.signInWithPopup(fb);
    }

    signInWithGoogle = () => {
        const google = new app.auth.GoogleAuthProvider();

        return this.auth.signInWithPopup(google);
    }

    getRoom = (id) => this.db.collection('rooms').doc(id).get();

    createRoom = (roomID, data) => this.db.collection('rooms').doc(roomID).set(data);

    joinRoom = async (roomID, user) => {
        try {
            const roomRef = this.db.collection('rooms').doc(roomID);
            const query = await roomRef.get();
            const room = await query.data();
            let filteredUsers = [];

            if (room.users) {
                filteredUsers = room.users.filter(u => u.uid !== user.uid);
                const newUsers = [...filteredUsers, user];
                await roomRef.set({ ...room, users: newUsers });
            }
        } catch (e) {
            console.log(e);
        }
    }

    leaveRoom = async (roomID, userID) => {
        console.log('fired');
        console.log('roomid', roomID);
        console.log('userid', userID);
        try {
            const roomRef = this.db.collection('rooms').doc(roomID);
            const query = await roomRef.get();
            const room = await query.data();
            console.log(room);

            if (room.users) {
                const filteredUsers = room.users.filter(u => u.uid !== userID);
                await roomRef.set({ ...room, users: filteredUsers });
            }
        } catch (e) {
            console.log(e);
        }
    }

    sendMessage = async (id, message) => {
        this.db.collection('rooms').doc(id).collection('chats').add(message);
        // this.db.collection('rooms').doc(id).collection('chats').doc(id).update({ chats: newChats });
        // this.db.collection(id).add(message);
        // const chatsRef = this.db.collection('rooms').doc(id);
        // const query = await chatsRef.get('chats');
        // const chats = await query.data().chats;
        // const newChats = [...chats, message];

        // console.log(chats);
        // console.log(newChats);

        // this.db.collection('rooms').doc(id).update({ chats: newChats });
        // // this.db.collection('rooms').doc(id).collection('chats').doc(id).update({ chats: newChats });
        // // this.db.collection(id).add(message);
    }
}

export const handleError = (e) => {
    let error = '';

    switch (e.code) {
        case 'auth/network-request-failed':
            error = 'Network error has occured. Please try again.';
            break;
        case 'auth/email-already-in-use':
            error = 'Email is already in use. Please use another email';
            break;
        case 'auth/wrong-password':
            error = 'Incorrect email or password';
            break;
        case 'auth/user-not-found':
            error = 'Incorrect email or password';
            break;
        case 'auth/reset-password-error':
            error = 'Failed to send password reset email. Did you type your email correctly?';
            break;
        default:
            error = e.message;
            break;
    }

    return error;
}

const firebase = new Firebase();

export default firebase;
