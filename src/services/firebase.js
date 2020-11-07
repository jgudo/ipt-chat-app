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

    sendMessage = async (id, message) => {
        const chatsRef = this.db.collection('rooms').doc(id);
        const query = await chatsRef.get('users');
        const chats = query.data().chats;
        const newChats = [...chats, message];

        console.log(chats);
        console.log(newChats);

        this.db.collection('rooms').doc(id).update({ chats: newChats });
        // this.db.collection('rooms').doc(id).collection('chats').doc(id).update({ chats: newChats });
        // this.db.collection(id).add(message);
    }
}

const firebase = new Firebase();

export default firebase;
