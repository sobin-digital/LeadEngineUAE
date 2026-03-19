const Lead = require('../models/Lead');

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
exports.createLead = async (req, res) => {
    try {
        const { name, phone, location, service } = req.body;

        if (!name || !phone || !location || !service) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        const lead = await Lead.create({
            name,
            phone,
            location,
            service
        });

        res.status(201).json({
            success: true,
            data: lead
        });
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
    try {
        const { service, date } = req.query;
        let query = {};
        
        if (service) {
            query.service = service;
        }
        
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.timestamp = { $gte: startDate, $lt: endDate };
        }
        
        const leads = await Lead.find(query).sort({ timestamp: -1 });
        
        res.status(200).json({
            success: true,
            count: leads.length,
            data: leads
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
