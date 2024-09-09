
import React, { useState } from 'react';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, createUserWithEmailAndPassword, doc, setDoc } from './firebase';


function Signup() {
  const [email, setEmail] = useState('');
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        email: user.email,
        role: role,
        uid: user.uid,
      };

      const collection = role === 'patient' ? 'patients' : 'doctors';
      console.log("Storing user data in Firestore:", userData);

      await setDoc(doc(firestore, collection, user.uid), userData);
      alert(`Account created successfully as ${role}!`);
      navigate('/login');
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
            <label>Email</label>
            <input 
              type="text" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Link to="/login">Already have an account? Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
