const ServiceProvider = require('../models/ServiceProvider');
const Lead = require('../models/Lead');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

exports.registerProvider = async (req, res) => {
    try {
        const { name, email, phone, password, services, location } = req.body;

        const providerExists = await ServiceProvider.findOne({ email });
        if (providerExists) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const provider = await ServiceProvider.create({
            name,
            email,
            phone,
            password: hashedPassword,
            services,
            location
        });

        const token = signToken(provider._id);

        res.status(201).json({
            success: true,
            token,
            provider: {
                id: provider._id,
                name: provider.name,
                email: provider.email,
                services: provider.services
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.loginProvider = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        const provider = await ServiceProvider.findOne({ email }).select('+password');
        if (!provider) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, provider.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const token = signToken(provider._id);

        res.status(200).json({
            success: true,
            token,
            provider: {
                id: provider._id,
                name: provider.name,
                email: provider.email,
                services: provider.services
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getProviderProfile = async (req, res) => {
    try {
        const provider = await ServiceProvider.findById(req.provider.id);
        res.status(200).json({ success: true, data: provider });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getProviderLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ assignedTo: req.provider.id }).sort({ timestamp: -1 });
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

exports.getAllProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find().select('-password');
        res.status(200).json({ success: true, count: providers.length, data: providers });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
