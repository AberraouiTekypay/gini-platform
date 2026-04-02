const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// All routes require 'AdminToken' header authentication
router.use(adminAuth);

// Fetch all pending loans for the dashboard table
router.get('/loans', adminController.getAllPendingLoans);

// Update status to approved or rejected (ID in body)
router.post('/loan/review', adminController.updateLoanStatus);

// Get user risk/CredoLab profile
router.get('/user/:id/risk', adminController.getUserRiskProfile);

module.exports = router;
