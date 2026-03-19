// Hardcoded basic credentials for MVP
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
exports.login = (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        // In a real database-backed app, we would generate a JWT token.
        // Returning simple flag here.
        res.status(200).json({ success: true, token: 'mock-jwt-token-73892' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
};
