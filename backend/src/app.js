const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const leadRoutes = require('./routes/leadRoutes');
const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing
app.use('/api', routes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to LeadEngine UAE API' });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
