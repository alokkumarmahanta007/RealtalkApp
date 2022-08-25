// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB5uoJQDvzkpmV-joEjvdKE_8ZzFl24zU",
  authDomain: "realtalk-971bb.firebaseapp.com",
  projectId: "realtalk-971bb",
  storageBucket: "realtalk-971bb.appspot.com",
  messagingSenderId: "539434125938",
  appId: "1:539434125938:web:5d1fb3a5efad76407750eb",
  measurementId: "G-2WY1P1MNR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage=getStorage(app)

export { auth, db,storage };
