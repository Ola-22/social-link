// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi3lskWQkRDM7I583nEodaRBMnseMQZWg",
  authDomain: "sociallink-ab726.firebaseapp.com",
  databaseURL: "https://sociallink-ab726-default-rtdb.firebaseio.com",
  projectId: "sociallink-ab726",
  storageBucket: "sociallink-ab726.appspot.com",
  messagingSenderId: "513343141340",
  appId: "1:513343141340:web:0689bcdbf375a603ff0b19",
  measurementId: "G-78M86EG7QJ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
