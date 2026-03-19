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
        let queryObj = {};

        // exact match for service type if provided
        if (service) {
            queryObj.service = service;
        }

        // date range from start of day to end of day if date provided
        if (date) {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);

            queryObj.timestamp = { $gte: startDate, $lte: endDate };
        }

        const leads = await Lead.find(queryObj)
            .populate('assignedTo', 'name email phone')
            .sort({ timestamp: -1 });

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

// @desc    Assign lead to provider
// @route   PUT /api/leads/:id/assign
// @access  Private (Admin)
exports.assignLead = async (req, res) => {
    try {
        const leadId = req.params.id;
        const { providerId } = req.body;

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }

        lead.assignedTo = providerId || null;
        await lead.save();

        // Populate the assignedTo field before returning so frontend gets the full object
        const updatedLead = await Lead.findById(leadId).populate('assignedTo', 'name email phone');

        res.status(200).json({
            success: true,
            data: updatedLead
        });
    } catch (error) {
        console.error('Error assigning lead:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
