const express = require('express');
const router = express.Router();
const Loan = require('../models/loan');
const User = require('../models/user');

/**
 * Webhook Support
 * Handles asynchronous callbacks from Regula (KYC) and Damanesign (Signature).
 */

// Regula KYC Webhook
router.post('/regula-kyc', async (req, res) => {
  const { userId, status, confidence } = req.body;
  console.log(`[Webhook] Regula KYC update for user ${userId}: ${status}`);
  
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.kycStatus = status === 'success' ? 'verified' : 'rejected';
      if (status !== 'success') user.isBlocked = true;
      await user.save();
    }
    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Damanesign Signature Webhook
router.post('/damanesign-signature', async (req, res) => {
  const { loanId, signatureStatus } = req.body;
  console.log(`[Webhook] Damanesign update for loan ${loanId}: ${signatureStatus}`);
  
  try {
    const loan = await Loan.findByPk(loanId);
    if (loan) {
      loan.signatureStatus = signatureStatus === 'SIGNED' ? 'SIGNED' : 'FAILED';
      if (signatureStatus === 'SIGNED') loan.status = 'active';
      await loan.save();
    }
    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
