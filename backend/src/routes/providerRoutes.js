const express = require('express');
const { registerProvider, loginProvider, getProviderProfile, getProviderLeads, getAllProviders } = require('../controllers/providerController');
const { protectProvider } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerProvider);
router.post('/login', loginProvider);
router.get('/', getAllProviders);
router.get('/profile', protectProvider, getProviderProfile);
router.get('/leads', protectProvider, getProviderLeads);

module.exports = router;
