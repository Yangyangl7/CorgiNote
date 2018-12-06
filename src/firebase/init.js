import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"


//Firestore (luo yangyang)
//Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBmai8i36KohsH1D3yT-XqrktrJsPA1hJw",
//     authDomain: "csci5117-mooncake-project2.firebaseapp.com",
//     databaseURL: "https://csci5117-mooncake-project2.firebaseio.com",
//     projectId: "csci5117-mooncake-project2",
//     storageBucket: "csci5117-mooncake-project2.appspot.com",
//     messagingSenderId: "228207579873"
// };


// Firestore (Wenjing)
// var config = {
//     apiKey: "AIzaSyAeK-QF1BdG9kf6l18cFJib0lTJV96AIpk",
//     authDomain: "corgi-note.firebaseapp.com",
//     databaseURL: "https://corgi-note.firebaseio.com",
//     projectId: "corgi-note",
//     storageBucket: "corgi-note.appspot.com",
//     messagingSenderId: "406428669708"
// };


//  This is used for testing ( Yuhao Li)
// var config = {
//   apiKey: "AIzaSyCxqcQA5tZ8zuWdN9Q31ioGo8qVreYl6_M",
//       authDomain: "homevue-fc0e5.firebaseapp.com",
//       databaseURL: "https://homevue-fc0e5.firebaseio.com",
//       projectId: "homevue-fc0e5",
//       storageBucket: "homevue-fc0e5.appspot.com",
//       messagingSenderId: "335787380090"
// };

// Batu's config
var config = {
    apiKey: "AIzaSyAGt1H4ED9v2Y_O0kUjINsCuQdgO3Y9Zh0",
    authDomain: "mooncake-firestore-demo.firebaseapp.com",
    databaseURL: "https://mooncake-firestore-demo.firebaseio.com",
    projectId: "mooncake-firestore-demo",
    storageBucket: "mooncake-firestore-demo.appspot.com",
    messagingSenderId: "334864270761"
};

firebase.initializeApp(config);

const db = firebase.firestore();


const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);
db.enablePersistence({
    experimentalTabSynchronization: true
});

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
var storage = firebase.storage();

export {
    db,
    auth,
    provider,
    storage
};