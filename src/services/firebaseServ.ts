import firebase from "firebase";
// Required for side-effects
require("firebase/firestore");

import firebaseConfig from "../../fconfig";
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service

const firestore = firebase.firestore(app);
export const db = {
    games: firestore.collection('games')
}