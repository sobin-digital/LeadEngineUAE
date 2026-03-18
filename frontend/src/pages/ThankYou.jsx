import React from 'react';
import { Helmet } from 'react-helmet-async';
import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thank-you-page">
      <Helmet>
        <title>Thank You | LeadEngine UAE</title>
        <meta name="description" content="Your request has been received. We will contact you shortly." />
      </Helmet>
      
      <div className="thank-you-container">
        <div className="success-icon">✅</div>
        <h1>Request Received!</h1>
        <p className="success-message">Thank you for choosing LeadEngine UAE.<br/>Our team will call you within the next 15 minutes.</p>
        
        <div className="action-box">
          <p>Need immediate assistance?</p>
          <a href="https://wa.me/1234567890?text=Hi,%20I%20need%20AC%20repair%20service%20in%20Dubai" 
             className="btn btn-whatsapp-large" 
             target="_blank" 
             rel="noopener noreferrer">
            <span className="icon">💬</span> Chat on WhatsApp Now
          </a>
        </div>
        
        <a href="/" className="btn-link">← Back to Home</a>
      </div>
    </div>
  );
};

export default ThankYou;
