import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxqcQA5tZ8zuWdN9Q31ioGo8qVreYl6_M",
    authDomain: "homevue-fc0e5.firebaseapp.com",
    databaseURL: "https://homevue-fc0e5.firebaseio.com",
    projectId: "homevue-fc0e5",
    storageBucket: "homevue-fc0e5.appspot.com",
    messagingSenderId: "335787380090"
  };
firebase.initializeApp(config);

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export {db, auth, provider};
