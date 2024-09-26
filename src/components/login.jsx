

import React, { useState } from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore, signInWithEmailAndPassword, doc, getDoc } from './firebase';

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
          //const doctorData = docSnap.data();
          // if (doctorData && !doctorData.profileSetup) {
          //   // Redirect to profile setup page if not set up
          //   navigate('/setupdoctorprofile');
          // } else {
          //   // Redirect to the clinic dashboard if profile is set up
            navigate('/clinicdashboard');
          // }
        } else {
          // Redirect to patient dashboard
          navigate(`/dashboard-patient`);
        }
      } else {
        alert('No user found!');
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
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
          <Link to="/signup">New User? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
