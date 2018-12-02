import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAeK-QF1BdG9kf6l18cFJib0lTJV96AIpk",
    authDomain: "corgi-note.firebaseapp.com",
    databaseURL: "https://corgi-note.firebaseio.com",
    projectId: "corgi-note",
    storageBucket: "corgi-note.appspot.com",
    messagingSenderId: "406428669708"
};
firebase.initializeApp(config);

const db = firebase.firestore();

const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export {
    db,
    auth,
    provider
};