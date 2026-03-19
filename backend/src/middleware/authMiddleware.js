const jwt = require('jsonwebtoken');
const ServiceProvider = require('../models/ServiceProvider');

exports.protectProvider = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        req.provider = await ServiceProvider.findById(decoded.id);
        
        if (!req.provider) {
            return res.status(401).json({ success: false, error: 'Provider not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
};
