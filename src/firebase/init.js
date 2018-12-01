import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmai8i36KohsH1D3yT-XqrktrJsPA1hJw",
    authDomain: "csci5117-mooncake-project2.firebaseapp.com",
    databaseURL: "https://csci5117-mooncake-project2.firebaseio.com",
    projectId: "csci5117-mooncake-project2",
    storageBucket: "csci5117-mooncake-project2.appspot.com",
    messagingSenderId: "228207579873"
  };
firebase.initializeApp(config);

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export {db, auth, provider};
