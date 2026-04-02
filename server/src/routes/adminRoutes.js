const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

// All routes require admin key authentication
router.use(adminAuth);

// Fetch all pending loans
router.get('/loans', adminController.getPendingLoans);

// Review a loan (approve or reject)
router.post('/loan/review', adminController.reviewLoan);

// Get user overview with scoring/KYC summary
router.get('/user/:id', adminController.getUserOverview);

module.exports = router;
