import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase'; // Ensure you have access to auth for user UID
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './doctorDetail.css';

const DoctorDetail = () => {
  const { clinicName } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeslots, setTimeslots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const clinicRef = collection(firestore, 'clinics');
        const q = query(clinicRef, where('clinicName', '==', clinicName));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('No such doctor found');
          return;
        }

        const doctorData = querySnapshot.docs[0].data();
        setDoctor(doctorData);
        setAvailability(doctorData.availability);
        setTimeslots(generateTimeslots(doctorData.availability, new Date()));
      } catch (error) {
        setError('Failed to fetch doctor');
      }
    };

    fetchDoctor();
  }, [clinicName]);

  const generateTimeslots = (availability, selectedDate) => {
    if (!availability) return [];
  
    const currentDay = selectedDate.getDay();
    const isWeekend = currentDay === 0 || currentDay === 6;
    const dayAvailability = isWeekend ? availability.Weekends : availability.Weekdays;
  
    let slots = [];
    const currentTime = new Date();
  
    dayAvailability.forEach((slot) => {
      const startHour = parseInt(slot.start.split(':')[0], 10);
      const endHour = parseInt(slot.end.split(':')[0], 10);
      const startPeriod = slot.startPeriod === 'PM' && startHour !== 12 ? 12 : 0;
      const endPeriod = slot.endPeriod === 'PM' && endHour !== 12 ? 12 : 0;
  
      for (let hour = startHour + startPeriod; hour < endHour + endPeriod; hour++) {
        let displayHour = hour;
        let period = hour >= 12 ? 'PM' : 'AM';
  
        // Adjust for the 12-hour format and special cases
        if (hour === 12) {
          displayHour = 12;
          period = 'noon'; // 12:00 PM (noon)
        } else if (hour === 11) {
          displayHour = 11;
          period = 'AM'; // Handle 11:00 AM to 12:00 noon
        } else if (hour > 12) {
          displayHour = hour - 12; // Convert to 12-hour format
        }
  
        // Special case for 11 AM to 12 noon
        const formattedSlot = hour === 11
          ? `11:00 AM - 12:00 noon`
          : hour === 12
          ? `12:00 noon - 1:00 PM`
          : `${displayHour}:00 - ${displayHour + 1}:00 ${period}`;
  
        // Check if time is valid to display
        if (
          selectedDate.toDateString() !== currentTime.toDateString() ||
          hour > currentTime.getHours()
        ) {
          slots.push(formattedSlot);
        }
      }
    });
  
    return slots;
  };
  
  

  const handleDateChange = (date) => {
    if (date >= new Date()) {
      setSelectedDate(date);
      if (availability) {
        setTimeslots(generateTimeslots(availability, date));
      }
    } else {
      alert('Cannot select a past date.');
    }
  };

  const handleRequestAppointment = async () => {
    if (!selectedTimeslot) {
      alert('Please select a time slot');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('User not logged in');
        return;
      }

      const requestData = {
        patientUid: user.uid,
        clinicName: doctor.clinicName,
        doctorName: doctor.name,
        requestedDate: selectedDate.toLocaleDateString(),
        requestedTime: selectedTimeslot,
        approved: false,
      };

      await addDoc(collection(firestore, 'requests'), requestData);
      setSuccessMessage('Appointment requested successfully!');
    } catch (error) {
      setError('Failed to request appointment');
      console.error('Error requesting appointment:', error);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard-patient');
  };

  if (error) {
    return <p>{error}</p>;
  }

  return doctor ? (
    <div className="doctor-detail-container">
      <div className="doctor-detail-card">
        <h2>{doctor.name}</h2>
        <p>Clinic: {doctor.clinicName}</p>
        <p>Location: {doctor.clinicAddress}</p>

        <div className="calendar-section">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()} // Disables past dates
          />
        </div>

        <div className="availability-section">
          <h3>Select a Time Slot</h3>
          <select value={selectedTimeslot} onChange={(e) => setSelectedTimeslot(e.target.value)}>
            <option value="">Select a time slot</option>
            {timeslots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {successMessage ? (
          <div className="success-message">
            <p>{successMessage}</p>
            <button onClick={handleGoToDashboard}>Head to Dashboard</button>
          </div>
        ) : (
          <button className="request-button" onClick={handleRequestAppointment}>
            Request Appointment
          </button>
        )}
      </div>
    </div>
  ) : (
    <p>Loading doctor details...</p>
  );
};

export default DoctorDetail;
