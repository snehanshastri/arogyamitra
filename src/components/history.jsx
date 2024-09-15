import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './History.css'; // Ensure you have appropriate styles

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Query for historical records in 'recorddata' for the current user by UID
        const historyQuery = query(
          collection(firestore, 'recorddata'),
          where('patientUid', '==', user.uid) // Assuming the UID is stored in 'userId' field
        );

        const historyDocs = await getDocs(historyQuery);
        const fetchedHistory = historyDocs.docs.map(doc => doc.data());
        setHistoryData(fetchedHistory);
      }
    };

    fetchHistoryData();
  }, []);

  return (
    <div className="history-container">
      <h2>Appointment History</h2>
      <div className="history-list">
        {historyData.length === 0 ? (
          <p>No past appointments found</p>
        ) : (
          historyData.map((record, index) => (
            <div key={index} className="history-item">
              <p>Date: {record.appointmentDate}</p>
              <p>Illness: {record.illness}</p>
              <p>Prescription: {record.prescription}</p>
              <p>Patient Name: {record.patientName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
