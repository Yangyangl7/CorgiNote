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


const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({
    timestampsInSnapshots: true
})

export default firebaseApp.firestore()