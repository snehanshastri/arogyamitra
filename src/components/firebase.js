


// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc };
