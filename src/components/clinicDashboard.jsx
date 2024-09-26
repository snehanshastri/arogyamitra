


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { collection, query, where, getDocs, getDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import '../styles/clinicdashboard.css';

const ClinicDashboard = () => {
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [requests, setRequests] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchClinicData = async () => {
      const user = auth.currentUser;
      if (user) {
        const clinicRef = doc(firestore, 'clinics', user.uid);
        const clinicSnap = await getDoc(clinicRef);

        if (clinicSnap.exists()) {
          const clinicData = clinicSnap.data();
          setClinicName(clinicData.clinicName);
          setClinicAddress(clinicData.clinicAddress);
        } else {
          console.error('No clinic found for the current user.');
        }
      } else {
        console.error('No authenticated user found!');
      }
    };

    fetchClinicData();
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      const patientsCollection = collection(firestore, 'patients');
      const patientDocs = await getDocs(patientsCollection);
      const fetchedPatients = patientDocs.docs.reduce((acc, doc) => {
        const patientData = doc.data();
        acc[patientData.uid] = patientData.name;
        return acc;
      }, {});
      setPatients(fetchedPatients);
    };

    fetchPatientData();
  }, []);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      const doctorsCollection = collection(firestore, 'doctors');
      const doctorDocs = await getDocs(doctorsCollection);
      const fetchedDoctors = doctorDocs.docs.reduce((acc, doc) => {
        const doctorData = doc.data();
        acc[doctorData.uid] = doctorData.name;
        return acc;
      }, {});
      setDoctors(fetchedDoctors);
    };

    fetchDoctorsData();
  }, []);

  useEffect(() => {
    if (clinicName) {
      const fetchRequests = async () => {
        const user = auth.currentUser;
        if (user) {
          const requestsQuery = query(
            collection(firestore, 'requests'),
            where('clinicName', '==', clinicName),
            where('approved', '==', false)
          );
          const requestDocs = await getDocs(requestsQuery);
          const fetchedRequests = requestDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRequests(fetchedRequests);
        }
      };

      fetchRequests();
    }
  }, [clinicName]);

  useEffect(() => {
    if (clinicName) {
      const fetchApprovedAppointments = async () => {
        const user = auth.currentUser;
        if (user) {
          const approvedQuery = query(
            collection(firestore, 'requests'),
            where('clinicName', '==', clinicName),
            where('approved', '==', true)
          );
          const approvedDocs = await getDocs(approvedQuery);
          const fetchedApprovedAppointments = approvedDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setApprovedAppointments(fetchedApprovedAppointments);
        }
      };

      fetchApprovedAppointments();
    }
  }, [clinicName]);

  const handleApproveAppointment = async (requestId) => {
    try {
      const requestRef = doc(firestore, 'requests', requestId);
      await updateDoc(requestRef, { approved: true });

      const approvedRequest = requests.find(request => request.id === requestId);

      // Create new record in recorddata collection
      const recordDataRef = doc(firestore, 'recorddata', requestId);
      await setDoc(recordDataRef, {
        patientName: patients[approvedRequest.patientUid],
        appointmentDate: approvedRequest.requestedDate,
        patientUid: approvedRequest.patientUid,
        illness: '',
        prescription: ''
      });

      setApprovedAppointments([...approvedAppointments, { ...approvedRequest, approved: true }]);
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      setError('Error approving appointment: ' + error.message);
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const appointmentRef = doc(firestore, 'requests', appointmentId);
      await updateDoc(appointmentRef, { completed: true });

      setApprovedAppointments(approvedAppointments.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      setError('Error completing appointment: ' + error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    }).catch((error) => {
      setError('Error during logout: ' + error.message);
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>ArogyaMitra</h2>
        <ul>
          <li onClick={() => handleNavigation('/clinicdashboard')}>Dashboard</li>
          <li onClick={() => handleNavigation('/recorddata')}>Record Data</li>
          <li onClick={() => handleNavigation('/patientslist')}>Patients</li>
        </ul>
        <div className="sidebar-general">
          <p>Settings</p>
          <p>Support</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="user-info">
            <p>{clinicName || 'Loading...'}</p>
            <p>{clinicAddress || 'Loading...'}</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="appointments-container">
          {/* Upcoming Appointments Column */}
          <div className="appointments-section">
            <div className="section-header">
              <h3>Upcoming Appointments</h3>
            </div>
            <div className="appointment-times">
              {approvedAppointments.length === 0 ? (
                <p>No upcoming appointments</p>
              ) : (
                approvedAppointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-request">
                    <p>Patient: {patients[appointment.patientUid] || 'Loading...'}</p>
                    <p>Date: {appointment.requestedDate}</p>
                    <p>Time: {appointment.requestedTime}</p>
                    <button className="completed-btn" onClick={() => handleCompleteAppointment(appointment.id)}>
                      Completed
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="view-all">
              <p>View all</p>
            </div>
          </div>
      
          {/* Approve Appointment Column */}
          <div className="approve-appointment-section">
            <div className="section-header">
              <h3>Approve Appointments</h3>
            </div>
            <div className="appointment-requests">
              {requests.length === 0 ? (
                <p>No appointments pending approval</p>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="appointment-request">
                    <p>Patient: {patients[request.patientUid] || 'Loading...'}</p>
                    <p>Date: {request.requestedDate}</p>
                    <p>Time: {request.requestedTime}</p>
                    <button
                      className="approve-btn"
                      onClick={() => handleApproveAppointment(request.id)}
                    >
                      Approve
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="view-all">
              <p>View all</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;


