
import React from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

  const handleProceedClick = () => {
    navigate('/login');
  };
  return (
    <div className="landing">
      <div className="image-container">
        <div className="image-wrapper">
          <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/01d0ccf5-2ac5-435c-aa78-945db33d62a5/DallEGeneratedImages/dalle-f2b53597-5b63-49c7-b179-dba9c76020810251676238715002212300.jpg&dcHint=KoreaCentral&fileToken=0a6d812f-c8f1-4a9d-9f62-34b0056dcc48" alt="Arogya Mitra 1" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
          </div>
        </div>
        <div className="image-wrapper">
          <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/01d0ccf5-2ac5-435c-aa78-945db33d62a5/DallEGeneratedImages/dalle-ba73a227-89c5-4aba-8455-5dfc40faeff50251676238562178204600.jpg&dcHint=KoreaCentral&fileToken=0a6d812f-c8f1-4a9d-9f62-34b0056dcc48" alt="Arogya Mitra 2" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
            <h1>Arogya Mitra</h1>
            <h2>Your Health,Our Priority</h2>
          </div>
        </div>
        <div className="image-wrapper">
          <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/01d0ccf5-2ac5-435c-aa78-945db33d62a5/DallEGeneratedImages/dalle-34cbcd39-273e-43d9-90ad-380e3c0c541d0251676237573276162800.jpg&dcHint=KoreaCentral&fileToken=0a6d812f-c8f1-4a9d-9f62-34b0056dcc48" alt="Arogya Mitra 3" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
          </div>
        </div>
      </div>
      <button  onClick={handleProceedClick} className="proceed-button">Proceed</button>
    </div>
  );
}

export default Landing;