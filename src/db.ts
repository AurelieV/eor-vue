import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAEjaMLLL_VeuX9eyAqaLeMpll25Z7oTaE",
  authDomain: "eor-beta-dev.firebaseapp.com",
  databaseURL: "https://eor-beta-dev.firebaseio.com",
  projectId: "eor-beta-dev",
  storageBucket: "eor-beta-dev.appspot.com",
  messagingSenderId: "28941068774",
  appId: "1:28941068774:web:275f75044d4b622c"
};

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).database();
