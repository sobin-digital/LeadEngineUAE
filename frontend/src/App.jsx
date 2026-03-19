import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServiceLanding from './pages/ServiceLanding';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LeadEngine UAE",
    "image": "https://leadengine.ae/logo.png",
    "url": "https://leadengine.ae",
    "telephone": "+971501234567",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    }
  };

  return (
    <div className="home">
      <Helmet>
        <title>LeadEngine UAE - Home Services in Dubai</title>
        <meta name="description" content="Get the best AC repair, plumbing, and cleaning services in Dubai." />
        <meta property="og:title" content="LeadEngine UAE - Home Services in Dubai" />
        <meta property="og:description" content="Get the best AC repair, plumbing, and cleaning services in Dubai." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">LeadEngine UAE</span></h1>
          <p>Connecting you to top local services in Dubai</p>
          <button 
            className="cta-button" 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Find a Service
          </button>
        </div>
      </header>

      <section className="services-section" id="services">
        <h2>Our Core Services</h2>
        <div className="services">
          <Link to="/ac-repair-dubai" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="service-card">
              <div className="service-icon">❄️</div>
              <h3>AC Repair</h3>
              <p>Expert AC technicians at your doorstep.</p>
            </div>
          </Link>
          <Link to="/plumber-dubai" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="service-card">
              <div className="service-icon">🔧</div>
              <h3>Plumbing</h3>
              <p>Fast and reliable plumbing solutions.</p>
            </div>
          </Link>
          <Link to="/cleaning-dubai" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="service-card">
              <div className="service-icon">🧹</div>
              <h3>Cleaning</h3>
              <p>Professional cleaning for your home and office.</p>
            </div>
          </Link>
          <a href="#services" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="service-card">
              <div className="service-icon">🚗</div>
              <h3>Car Recovery</h3>
              <p>24/7 Car breakdown and recovery assistance.</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">LeadEngine UAE</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/ac-repair-dubai">AC Repair</a>
          <a href="/plumber-dubai">Plumbing</a>
          <a href="/cleaning-dubai">Cleaning</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/:serviceId" element={<ServiceLanding />} />
        </Routes>
      </main>
      
      {/* Global Floating WhatsApp Button */}
      <a href="https://wa.me/1234567890?text=Hi,%20I%20need%20AC%20repair%20service%20in%20Dubai" className="floating-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" className="whatsapp-icon">
          <path d="M16.033 0C7.17 0 0.005 7.172 0.005 16.033c0 2.822 0.742 5.584 2.155 8.019L0.006 32l8.118-2.126c2.348 1.288 4.992 1.967 7.904 1.967 8.864 0 16.028-7.168 16.028-16.028S24.898 0 16.033 0z m0 29.133c-2.43 0-4.809-0.655-6.884-1.885l-0.493-0.292-5.115 1.34 1.36-4.993-0.322-0.513C3.21 20.613 2.5 18.36 2.5 16.028 2.5 8.56 8.57 2.494 16.033 2.494c7.462 0 13.535 6.067 13.535 13.534s-6.073 13.105-13.535 13.105zM23.472 19.5c-0.408-0.203-2.413-1.192-2.788-1.328-0.372-0.136-0.645-0.203-0.916 0.203-0.272 0.408-1.054 1.328-1.291 1.6-0.24 0.272-0.478 0.306-0.887 0.102-0.408-0.203-1.72-0.634-3.279-2.025-1.213-1.082-2.031-2.418-2.271-2.825-0.24-0.408-0.026-0.628 0.178-0.831 0.183-0.183 0.408-0.476 0.612-0.713 0.203-0.24 0.272-0.408 0.408-0.68 0.136-0.272 0.068-0.511-0.034-0.713-0.102-0.203-0.916-2.21-1.256-3.027-0.331-0.795-0.667-0.688-0.916-0.7-0.24-0.012-0.511-0.012-0.783-0.012-0.272 0-0.713 0.102-1.087 0.511C8.654 9.475 7.5 10.564 7.5 12.875c0 2.311 2.308 4.545 2.628 4.973 0.323 0.428 3.394 5.176 8.225 7.258 1.15 0.493 2.046 0.787 2.748 1.008 1.15 0.366 2.197 0.313 3.025 0.19 0.926-0.137 2.85-1.164 3.253-2.291 0.404-1.127 0.404-2.091 0.283-2.291-0.121-0.203-0.441-0.325-0.85-0.528z" fill="#FFF"/>
        </svg>
      </a>

      <footer className="footer">
        <p>&copy; 2026 LeadEngine UAE. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
