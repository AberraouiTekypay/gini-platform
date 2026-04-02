// server/src/routes/kyc.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const kycController = require('../Controllers/kycController');

const router = express.Router();

/**
 * KYC Verification route.
 * POST /api/kyc/verify
 */
router.post('/verify', authenticate, kycController.verifyIdentity);

module.exports = router;
