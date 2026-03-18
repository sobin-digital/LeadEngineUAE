import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeadForm.css';

const LeadForm = ({ defaultService, serviceOptions }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    service: defaultService || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    } else if (serviceOptions && serviceOptions.length > 0) {
      setFormData(prev => ({ ...prev, service: serviceOptions[0] }));
    }
  }, [defaultService, serviceOptions]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        navigate('/thank-you');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Connecting to WhatsApp instead...');
      setTimeout(() => {
        const waText = encodeURIComponent(`Hi, I tried submitting a form for ${formData.service}.`);
        window.open(`https://wa.me/1234567890?text=${waText}`);
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="lead-form-container">
      <h3>Get a Free Quote Now</h3>
      <p>Fill out the form below and we'll call you back instantly!</p>
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', fontSize: '0.9rem'}}>{error}</div>}
      
      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-group">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="tel" name="phone" placeholder="Phone Number (e.g. 050 ...)" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="location" placeholder="Dubai Area (e.g. Marina, JLT, Al Barsha)" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <select name="service" value={formData.service} onChange={handleChange} required>
            {(serviceOptions || []).map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-submit" disabled={loading}>
          {loading ? (
            <span className="spinner-text">⏳ Submitting...</span>
          ) : (
            'Request Service'
          )}
        </button>
        <div className="trust-microcopy">
          <span className="lock-icon">🔒</span> No hidden fees. Same-day service.
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
