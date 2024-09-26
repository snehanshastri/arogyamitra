


import React, { useState } from 'react';
import '../styles/setupdoctorprofile.css';
import { firestore, doc, setDoc } from './firebase'; // Import Firestore functions
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const SetupDoctorProfile = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [specialisation, setSpecialisation] = useState('');
  const [availability, setAvailability] = useState({
    Weekdays: [{ start: '', end: '', startPeriod: 'AM', endPeriod: 'PM' }],
    Weekends: [{ start: '', end: '', startPeriod: 'AM', endPeriod: 'PM' }]
  });

  const handleSpecialisationChange = (e) => {
    setSpecialisation(e.target.value);
  };

  const handleTimeChange = (day, index, field, value) => {
    const newAvailability = [...availability[day]];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setAvailability(prevState => ({
      ...prevState,
      [day]: newAvailability
    }));
  };

  const handlePeriodChange = (day, index, field, value) => {
    const newAvailability = [...availability[day]];
    newAvailability[index] = { ...newAvailability[index], [field]: value };
    setAvailability(prevState => ({
      ...prevState,
      [day]: newAvailability
    }));
  };
  const navigate = useNavigate();
  

  const addTimeSlot = (day) => {
    setAvailability(prevState => ({
      ...prevState,
      [day]: [...prevState[day], { start: '', end: '', startPeriod: 'AM', endPeriod: 'PM' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(); // Get Firebase auth instance
      const user = auth.currentUser;
      if (!user) {
        alert('No authenticated user found!');
        return;
      }
      const doctorId = user.uid;
      const doctorRef = doc(firestore, 'clinics', doctorId);
      
      await setDoc(doctorRef, {
        name,
        contactNumber,
        clinicName,
        clinicAddress,
        specialisation,
        availability
      
      });

      alert('Profile setup successfully!');
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Error saving profile data:', error.message);
      alert('Failed to save profile data.');
    }
    navigate('/clinicdashboard');
  };
 

  return (
    <div className="setup-doctor-profile">
      <div className="profile-container">
        <h1 className="title">Setup your Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Contact Number</label>
            <input
              className="input"
              type="text"
              placeholder="Enter your contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Specialisation</label>
            <select
              className="dropdown"
              value={specialisation}
              onChange={handleSpecialisationChange}
              required
            >
              <option value="">Select Specialisation</option>
              <option value="GeneralMedicine">General Medicine</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Orthopedist">Orthopedist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Radiologist">Radiologist</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Clinic Name</label>
            <input
              className="input"
              type="text"
              placeholder="Enter clinic name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Clinic Address</label>
            <input
              className="input"
              type="text"
              placeholder="Enter clinic address"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Availability</label>
            {Object.keys(availability).map(day => (
              <div key={day} className="availability-group">
                <label className="day-label">{day}</label>
                {availability[day].map((slot, index) => (
                  <div key={index} className="time-slot">
                    <div className="time-input-group">
                      <input
                        className="input-time"
                        type="time"
                        value={slot.start}
                        onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                        placeholder="Start Time"
                      />
                      <select
                        className="dropdown-period"
                        value={slot.startPeriod}
                        onChange={(e) => handlePeriodChange(day, index, 'startPeriod', e.target.value)}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <div className="time-input-group">
                      <input
                        className="input-time"
                        type="time"
                        value={slot.end}
                        onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                        placeholder="End Time"
                      />
                      <select
                        className="dropdown-period"
                        value={slot.endPeriod}
                        onChange={(e) => handlePeriodChange(day, index, 'endPeriod', e.target.value)}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addTimeSlot(day)}>Add Time Slot</button>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SetupDoctorProfile;
