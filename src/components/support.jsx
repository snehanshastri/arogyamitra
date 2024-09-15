// Support.js
import React from 'react';
import './Support.css'; // Import the CSS file for styles

const Support = () => {
  return (
    <div className="support-container">
      <h2>Support</h2>
      <div className="support-details">
        <p>
          For assistance, you can reach us via:
        </p>
        <p>
          <strong>Email:</strong> 
          <a href="mailto:support@arogyamitra.com" className="support-link"> support@arogyamitra.com</a>
        </p>
        <p>
          <strong>Phone:</strong> 
          <a href="tel:+1234567890" className="support-link"> +123-456-7890</a>
        </p>
      </div>
    </div>
  );
};

export default Support;
