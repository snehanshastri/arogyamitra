// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/login';
import Signup from './components/signup';
import SetupDoctorProfile from './components/setupdoctorprofile';
//import DashboardPatient from './components/dashboardpatient'; // Replace with your actual dashboard component for patients
//import DashboardDoctor from './components/dashboarddoctor';   // Replace with your actual dashboard component for doctors
import './styles/landing.css';
import './styles/login.css';
import './styles/signup.css';
import './styles/setupdoctorprofile.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setupdoctorprofile" element={<SetupDoctorProfile />} />
        {/* <Route path="/dashboard-patient" element={<DashboardPatient />} />
        <Route path="/dashboard-doctor" element={<DashboardDoctor />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
