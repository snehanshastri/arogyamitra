


import React, { useState, useEffect } from 'react';
import { firestore, collection, getDocs, doc, updateDoc } from './firebase'; // Adjust import path if necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/recorddata.css';

const RecordData = () => {
  const [recordData, setRecordData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [illness, setIllness] = useState('');
  const [prescription, setPrescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const recordDataCollection = collection(firestore, 'recorddata');
        const recordDataDocs = await getDocs(recordDataCollection);
        const fetchedRecordData = recordDataDocs.docs.map(doc => {
          const data = doc.data();
          const appointmentDate = data.appointmentDate || 'No Date Available';
          return { id: doc.id, ...data, appointmentDate };
        });
        setRecordData(fetchedRecordData);
      } catch (error) {
        console.error('Error fetching record data: ', error);
      }
    };

    fetchRecordData();
  }, []);

  const handleEditClick = (id, currentIllness, currentPrescription) => {
    setEditingId(id);
    setIllness(currentIllness);
    setPrescription(currentPrescription);
  };

  const handleUpdate = async (id) => {
    try {
      const recordRef = doc(firestore, 'recorddata', id);
      await updateDoc(recordRef, { illness, prescription });
      setEditingId(null);
      setIllness('');
      setPrescription('');
      const recordDataCollection = collection(firestore, 'recorddata');
      const recordDataDocs = await getDocs(recordDataCollection);
      const updatedRecordData = recordDataDocs.docs.map(doc => {
        const data = doc.data();
        const appointmentDate = data.appointmentDate || 'No Date Available';
        return { id: doc.id, ...data, appointmentDate };
      });
      setRecordData(updatedRecordData);
    } catch (error) {
      console.error('Error updating record data: ', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>ArogyaMitra</h2>
        <ul>
          <li onClick={() => navigate('/clinicdashboard')}>Dashboard</li>
          <li onClick={() => navigate('/recorddata')}>Record Data</li>
        </ul>
        <div className="sidebar-general">
          <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </div>

      <div className="main-content">
        <div className="record-data-container">
          <div className="section-header">
            <h3>Record Data</h3>
          </div>
          <div className="record-items">
            {recordData.length === 0 ? (
              <p>No records available</p>
            ) : (
              recordData.map(record => (
                <div key={record.id} className="record-item">
                  <p>Patient Name: {record.patientName}</p>
                  <p>Date: {record.appointmentDate}</p>
                  {editingId === record.id ? (
                    <>
                      <textarea
                        value={illness}
                        onChange={(e) => setIllness(e.target.value)}
                        placeholder="Enter illness"
                      />
                      <textarea
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        placeholder="Enter prescription"
                      />
                      <button className="submit-btn" onClick={() => handleUpdate(record.id)}>
                        Submit
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Illness: {record.illness}</p>
                      <p>Prescription: {record.prescription}</p>
                      <button className="edit-btn" onClick={() => handleEditClick(record.id, record.illness, record.prescription)}>
                        Edit
                      </button>
                    </>
                  )}
                  <button className="billing-btn" onClick={() => setIsModalOpen(true)}>
                    Submit
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal for Payment Confirmation */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Payment done Successfully</h2>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordData;


