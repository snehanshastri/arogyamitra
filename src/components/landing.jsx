
import React from 'react';
import '../styles/landing.css';
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
          <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/e0772523-250c-47f2-8b09-0d44b0b282ea/DallEGeneratedImages/dalle-caa4dbb9-437e-4651-804f-809f942a4b9f0251677035242579623300.jpg&dcHint=JapanEast&fileToken=5070aed1-6a59-4a4b-892d-fa48eeaf87b4" alt="Arogya Mitra 1" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
          </div>
        </div>
        <div className="image-wrapper">
          <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/e0772523-250c-47f2-8b09-0d44b0b282ea/DallEGeneratedImages/dalle-378244b4-5ec2-4040-99c9-45f9028a41360251677035242579623300.jpg&dcHint=JapanEast&fileToken=5070aed1-6a59-4a4b-892d-fa48eeaf87b4" alt="Arogya Mitra 2" className="background-image" />
          <div className="overlay"></div>
          <div className="content">
            <h1>Arogya Mitra</h1>
            <h2>Your Health,Our Priority</h2>
          </div>
        </div>
        <div className="image-wrapper">
          <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/e0772523-250c-47f2-8b09-0d44b0b282ea/DallEGeneratedImages/dalle-1db749f6-75c5-44e9-923c-b5adf4eef1b90251677035295799270200.jpg&dcHint=JapanEast&fileToken=5070aed1-6a59-4a4b-892d-fa48eeaf87b4" alt="Arogya Mitra 3" className="background-image" />
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
