import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import './UserDashboard.css'; // Ensure you have styles updated accordingly

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState(null); // For storing user details
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user data (name, age) from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userQuery = query(collection(firestore, 'patients'), where('uid', '==', user.uid));
        const userDocs = await getDocs(userQuery);
        if (!userDocs.empty) {
          setUserData(userDocs.docs[0].data()); // Assuming user data is in the first document
        }
      }
    };
    fetchUserData();
  }, []);

  // Real-time listener for upcoming approved appointments
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const appointmentsQuery = query(
        collection(firestore, 'requests'),
        where('patientUid', '==', user.uid),
        where('approved', '==', true) // Only listen for approved appointments
      );
      
      // Use onSnapshot to listen for changes in real-time
      const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
        const fetchedAppointments = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            date: data.requestedDate,  // Date in string (e.g., '9/13/2024')
            time: data.requestedTime,  // Time in string (e.g., '1:00 PM')
            clinicName: data.clinicName,
            doctorName: data.doctorName
          };
        });

        // Filter upcoming appointments
        const now = new Date();
        const upcomingAppointments = fetchedAppointments.filter((appointment) => {
          const [month, day, year] = appointment.date.split('/').map(Number);
          const [hour, minute] = appointment.time.split(/[: ]/).map(Number);
          const ampm = appointment.time.includes('PM') ? 'PM' : 'AM';
          const appointmentDate = new Date(year, month - 1, day, hour % 12 + (ampm === 'PM' ? 12 : 0), minute);
          
          // Only keep appointments that are after the current time
          return appointmentDate > now;
        });

        // Map appointments to include the original time/date for display
        const formattedAppointments = upcomingAppointments.map(appointment => ({
          ...appointment,
          date: appointment.date,  // Date as retrieved from Firestore
          time: appointment.time   // Time as retrieved from Firestore
        }));

        setAppointments(formattedAppointments);
      });

      // Clean up the listener when the component is unmounted
      return () => unsubscribe();
    }
  }, []);

  // Navigate to History page (History component)
  const handleNavigateToHistory = () => {
    navigate('/history'); // Navigate to the History component to display past records
  };

  // Handle Book Appointment button click
  const handleBookAppointment = () => {
    navigate('/appointments'); // Navigate to appointments page
  };

  // Handle Logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login'); // Redirect to login page after logout
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>ArogyaMitra</h2>
        <ul>
          <li onClick={handleNavigateToHistory}>History</li> {/* Updated to navigate to History */}
        </ul>
        <div className="sidebar-general">
          <p onClick={() => navigate('/support')}>Support</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="user-info">
            <p>Name: {userData?.name || 'Loading...'}</p>
            <p>Age: {userData?.age ? `${userData.age} years old` : 'Loading...'}</p>
            <p>{new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div className="appointments-section">
          <div className="section-header">
            <h3>Upcoming Appointments</h3>
            <button className="new-appointment" onClick={handleBookAppointment}>
              Book Appointment +
            </button>
          </div>

          <div className="appointment-times">
            {appointments.length === 0 ? (
              <p>No upcoming appointments</p>
            ) : (
              appointments.map((appointment, index) => (
                <div key={index} className="appointment">
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Clinic: {appointment.clinicName}</p>
                  <p>Doctor: {appointment.doctorName}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
