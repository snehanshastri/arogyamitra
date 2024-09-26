

import React, { useState } from 'react';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, createUserWithEmailAndPassword, doc, setDoc } from './firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create a new user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare the user data to be saved in Firestore
      const userData = {
        name: name,           // Use the name from state
        age: age,             // Use the age from state
        email: email,         // Use the email from state
        role: role,           // Use the role from state
        uid: user.uid         // Get the uid from Firebase user object
      };

      // Define the Firestore collection based on the role
      const collection = role === 'patient' ? 'patients' : 'doctors';

      // Save the user data to the respective Firestore collection
      await setDoc(doc(firestore, collection, user.uid), userData);
      
      // Show a success message
      alert(`Account created successfully as ${role}!`);

      // Redirect based on the role
      if (role === 'doctor') {
        navigate('/setupdoctorprofile'); // Redirect doctors to setup profile page
      } else {
        navigate('/login'); // Redirect patients to login page
      }

    } catch (error) {
      console.error("Error signing up or updating Firestore:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="landing-container">
      <div className="form-container">
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div> 
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input 
              type="number" 
              placeholder="Enter your age" 
              value={age}
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Choose Role</label>
            <select 
              className="role-dropdown"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <button className="sign-up-button" type="submit">Sign Up</button>
        </form>
        <div className="links">
          <Link to="/login">Already have an account? Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

