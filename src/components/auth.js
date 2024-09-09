
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Initialize Firebase Auth and Firestore
const auth = getAuth();
const firestore = getFirestore();

// Sign-up function
const handleSignup = async (email, password, role) => {
  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Define the collection based on the role
    const collection = role === 'patient' ? 'patients' : 'doctors';
    
    // Add role to user document in Firestore
    const userData = {
      email: user.email,
      role: role,
      uid: user.uid,
    };
    console.log("Creating user in Firestore:", userData);
    await setDoc(doc(firestore, collection, user.uid), userData);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

export { handleSignup,auth };
