// server/src/routes/merchantRoutes.js
const express = require('express');
const merchantController = require('../Controllers/merchantController');

const router = express.Router();

/**
 * Public Merchant API (v1)
 * Typically secured by a different 'X-Merchant-Key' middleware.
 */
router.post('/v1/checkout', merchantController.createPaymentRequest);
router.post('/v1/confirm', merchantController.confirmPayment);

module.exports = router;
