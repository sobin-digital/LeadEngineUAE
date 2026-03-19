const express = require('express');
const router = express.Router();
const { createLead, getLeads, assignLead } = require('../controllers/leadController');

router.route('/')
    .post(createLead)
    .get(getLeads);

router.put('/:id/assign', assignLead);

module.exports = router;
