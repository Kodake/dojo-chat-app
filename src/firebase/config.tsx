import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAn3PQ5qU-7EDW4XqNNXHsiRfRr_ScbDoE",
    authDomain: "genericdb2.firebaseapp.com",
    projectId: "genericdb2",
    storageBucket: "genericdb2.appspot.com",
    messagingSenderId: "771082677938",
    appId: "1:771082677938:web:e20e5a5c1a225fff43a3ab"
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };