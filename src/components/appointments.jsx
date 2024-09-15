import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore'; // Updated imports
import { firestore, auth } from './firebase';
import './appointments.css';
import UserDashboard from './UserDashboard';

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [locations, setLocations] = useState([]); // To store unique locations
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const clinicCollectionRef = collection(firestore, 'clinics');
        const clinicSnapshot = await getDocs(clinicCollectionRef);
        if (clinicSnapshot.empty) {
          console.log('No clinics found');
          setDoctors([]);
        } else {
          const doctorsData = clinicSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log('Doctors Data:', doctorsData); // Log the fetched data
          setDoctors(doctorsData);

          // Extract unique locations
          const uniqueLocations = [...new Set(doctorsData.map(doctor => doctor.clinicAddress))];
          setLocations(uniqueLocations); // Set the unique locations for dropdown
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Navigate to home
  const handleHomeClick = () => {
    navigate('/home'); // Assuming '/home' is the path for the home page
  };

  // Filter logic by clinic and doctor name
  const filteredDoctors = doctors.filter(doctor =>
    (doctor.clinicName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doctor.name?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterLocation === '' || doctor.clinicAddress?.toLowerCase().includes(filterLocation.toLowerCase()))
  );

  const handleCardClick = (clinicName) => {
    navigate(`/doctor/${clinicName}`); // Navigate using clinicName
  };

  return (
    <div className="appointments-container">
      <div className="header">
        
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <button className="dash-button" onClick={() => navigate('/dashboard-patient')}>Dashboard</button>

        <input
          type="text"
          placeholder="Search by clinic or doctor name..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          className="location-filter"
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="grid-container">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div 
              key={doctor.id}  // Use doctor.id instead of index for keys
              className="doctor-card"
              onClick={() => handleCardClick(doctor.clinicName)} // Pass clinicName to handleCardClick
            >
              {/* Show only name and clinic name */}
              <h3 className="doctor-name">{doctor.name}</h3>
              <h4 className="clinic-name">{doctor.clinicName}</h4>
            </div>
          ))
        ) : (
          <p>No doctors found</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
