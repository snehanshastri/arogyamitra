import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, query, where, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkOXvWcrKYmjqlWmgvn-8OcJzwnrulWmI",
  authDomain: "arogyamitra-72d86.firebaseapp.com",
  projectId: "arogyamitra-72d86",
  storageBucket: "arogyamitra-72d86.appspot.com",
  messagingSenderId: "846223650115",
  appId: "1:846223650115:web:b73900e33e59551cf6d3f6",
  measurementId: "G-8ZBSJXPW1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(firestore)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time.
      console.error("Persistence failed: Multiple tabs open");
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the features required to enable persistence
      console.error("Persistence is not available");
    }
  });

// Exporting necessary Firebase functionalities
export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc, getDocs, collection, updateDoc, query, where };
