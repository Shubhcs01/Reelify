

import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration (Only ConfigObject changes with Projects)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBklm8yHicbjkfykauOFZrfHvcb-Lo2CFY",
    authDomain: "apnareeldb.firebaseapp.com",
    projectId: "apnareeldb",
    storageBucket: "apnareeldb.appspot.com",
    messagingSenderId: "186466779491",
    appId: "1:186466779491:web:0d20e3d48265537e98d356"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
  //create collections
    users: firestore.collection('users'),
    posts:firestore.collection('posts'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage();
