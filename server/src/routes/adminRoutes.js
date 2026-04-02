const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');
const { authenticate } = require('../middlewares/auth');
const checkRole = require('../middlewares/rbacMiddleware');

// All routes require authentication
router.use(authenticate);

// Fetch all pending loans for the dashboard table
router.get('/loans', adminAuth, adminController.getAllPendingLoans);

// Update status to approved or rejected (ID in body)
// loanApproval requires 'CREDIT_OFFICER' or 'ADMIN' role
router.post('/loan/review', adminAuth, checkRole(['CREDIT_OFFICER', 'ADMIN']), adminController.updateLoanStatus);

// Get user risk/CredoLab profile
router.get('/user/:id/risk', adminAuth, adminController.getUserRiskProfile);

// System Health Pulse
router.get('/health', adminAuth, adminController.getSystemHealth);

// Reverse a transaction
router.post('/transaction/reverse', adminAuth, checkRole(['CREDIT_OFFICER', 'ADMIN', 'SUPER_ADMIN']), adminController.reverseTransaction);

// Approve a pending action
router.post('/action/approve', adminAuth, checkRole(['SUPER_ADMIN']), adminController.approvePendingAction);

// Financial Observability
router.get('/trial-balance', adminAuth, adminController.getTrialBalance);

// Support Hub
router.get('/users/search', adminAuth, adminController.searchUsers);
router.post('/users/manual-verify', adminAuth, checkRole(['SUPER_ADMIN']), adminController.manualKycOverride);
router.get('/users/:id/timeline', adminAuth, adminController.getUserTimeline);

module.exports = router;
