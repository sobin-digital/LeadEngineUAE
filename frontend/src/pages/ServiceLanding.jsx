import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { servicesConfig } from '../data/servicesConfig';
import LeadForm from '../components/LeadForm';
import './ServiceLanding.css';

const ServiceLanding = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (servicesConfig[serviceId]) {
      setConfig(servicesConfig[serviceId]);
    } else {
      setConfig(null);
    }
  }, [serviceId]);

  if (config === null) {
    // Basic 404 block for undefined routes
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2>Service Not Found</h2>
        <p>We could not find the service page you were looking for.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{marginTop: '1rem'}}>Return Home</button>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

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
    <div className="landing-page">
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <header className="service-hero">
        <div className="service-hero-overlay"></div>
        <div className="service-hero-content">
          <div className="hero-text">
            <span className="trust-badge">⭐ 4.9/5 Rated Services</span>
            <h1>{config.heroHeadline} <br /><span className="text-highlight">{config.heroHighlight}</span></h1>
            <p className="subheadline">{config.heroSubheadline}</p>
            
            <div className="hero-buttons">
              <a href="tel:+971501234567" className="btn btn-primary pulse">
                <span className="icon">📞</span> Call Now: +971 50 123 4567
              </a>
              <a href={`https://wa.me/1234567890?text=${encodeURIComponent(config.whatsappText)}`} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <span className="icon">💬</span> WhatsApp Us
              </a>
            </div>
          </div>
          
          <LeadForm serviceOptions={config.serviceOptions} />
          
        </div>
      </header>

      {/* Trust & Features */}
      <section className="why-us">
        <h2>Why Choose LeadEngine?</h2>
        <div className="features-grid">
          {config.features.map((feat, idx) => (
            <div className="feature-card" key={idx}>
              <div className="feature-icon">{feat.icon}</div>
              <h4>{feat.title}</h4>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services List */}
      <section className="services-list bg-light">
        <div className="container">
          <h2>Our Core Offerings</h2>
          <div className="services-cards">
            {config.servicesList.map((svc, idx) => (
              <div className="scard" key={idx}>
                <h4>{svc.title}</h4>
                <p>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testi-card">
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p className="quote">"Fast, reliable, and exactly what we needed. They arrived on time and the pricing was super transparent. Very happy with the result!"</p>
            <p className="author">- Verified Customer, Dubai</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq bg-light">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-items">
            {config.faqs.map((faq, idx) => (
              <div className="faq-item" key={idx}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="sticky-mobile-cta">
        <a href="tel:+971501234567" className="btn btn-primary d-block">
          Call Now: +971 50 123 4567
        </a>
      </div>
    </div>
  );
};

export default ServiceLanding;
