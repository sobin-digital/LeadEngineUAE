import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [serviceFilter, setServiceFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let query = [];
      if (serviceFilter) query.push(`service=${encodeURIComponent(serviceFilter)}`);
      if (dateFilter) query.push(`date=${encodeURIComponent(dateFilter)}`);
      
      const queryString = query.length > 0 ? `?${query.join('&')}` : '';
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/leads${queryString}`);
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <Helmet>
        <title>Dashboard | LeadEngine UAE</title>
      </Helmet>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>LeadEngine</h2>
          <span>Admin Panel</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">📊 Dashboard</a>
          <a href="#" className="nav-item">⚙️ Settings</a>
        </nav>
        <div className="sidebar-bottom">
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>Leads Overview</h1>
        </header>

        <div className="dashboard-content">
          {/* Summary Cards */}
          <div className="stats-row">
            <div className="stat-card">
              <h3>Total Leads</h3>
              <p className="stat-value">{leads.length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <form onSubmit={handleFilterSubmit} className="filters-form">
              <div className="filter-group">
                <label>Service Type</label>
                <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
                  <option value="">All Services</option>
                  <option value="AC Repair">AC Repair & Fixing</option>
                  <option value="AC Maintenance">General Maintenance</option>
                  <option value="AC Installation">AC Installation</option>
                  <option value="Duct Cleaning">Duct Cleaning</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={dateFilter} 
                  onChange={(e) => setDateFilter(e.target.value)} 
                />
              </div>
              <div className="filter-actions">
                <button type="submit" className="btn btn-primary">Apply Filters</button>
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setServiceFilter('');
                  setDateFilter('');
                  setTimeout(fetchLeads, 0); // Re-fetch immediately without filters
                }}>Clear</button>
              </div>
            </form>
          </div>

          {/* Leads Table */}
          <div className="table-container">
            {loading ? (
              <div className="loading-state">Loading leads...</div>
            ) : leads.length === 0 ? (
              <div className="empty-state">No leads found.</div>
            ) : (
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>Date Received</th>
                    <th>Name</th>
                    <th>Service</th>
                    <th>Phone</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id || lead.phone + lead.timestamp}>
                      <td className="date-cell">{new Date(lead.timestamp).toLocaleString()}</td>
                      <td className="bold">{lead.name}</td>
                      <td><span className="badge">{lead.service}</span></td>
                      <td>
                        <a href={`tel:${lead.phone}`} className="phone-link">{lead.phone}</a>
                      </td>
                      <td>{lead.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
