import firebase from 'firebase';

// Api Details
var config = {
    apiKey: "AIzaSyAArullsm1GrTYfPx6PQflP2nLjspF2vQE",
    authDomain: "localpicks-4eb9c.firebaseapp.com",
    databaseURL: "https://localpicks-4eb9c.firebaseio.com",
    projectId: "localpicks-4eb9c",
    storageBucket: "localpicks-4eb9c.appspot.com",
    messagingSenderId: "848191948905"
};

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();