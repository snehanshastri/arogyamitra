// src/components/login.jsx
import React, { useState } from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, signInWithEmailAndPassword, doc, getDoc, setDoc } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(firestore, role === 'patient' ? 'patients' : 'doctors', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        if (role === 'doctor') {
          // Check if the doctor profile is fully set up
          const doctorData = docSnap.data();
          if (doctorData && !doctorData.profileSetup) {
            // Redirect to the setup profile page if not set up
            navigate('/setupdoctorprofile');
          } else {
            // Redirect to the appropriate dashboard
            navigate(`/dashboard-${role}`);
          }
        } else {
          // Redirect to the appropriate dashboard for patients
          navigate(`/dashboard-${role}`);
        }
      } else {
        // Handle new user creation
        const userData = {
          email: user.email,
          role: role,
          uid: user.uid,
          profileSetup: role === 'doctor' ? false : true // Mark doctor profiles as not set up initially
        };

        console.log("Adding new user data to Firestore:", userData);
        await setDoc(userRef, userData);
        alert(`New ${role} added to Firestore and logged in successfully!`);
        if (role === 'doctor') {
          // Redirect to the setup profile page for new doctors
          navigate('/setupdoctorprofile');
        } else {
          // Redirect to the appropriate dashboard for patients
          navigate(`/dashboard-${role}`);
        }
      }
    } catch (error) {
      console.error("Error logging in or updating Firestore:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="landing-container">
      <div className="form-container">
        <form onSubmit={handleLogin}>
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
          <button className="sign-up-button" type="submit">Sign In</button>
        </form>
        <div className="links">
          <a href="#">Forgot Password?</a>
          <Link to="/signup">New User? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
