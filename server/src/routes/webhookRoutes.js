const express = require('express');
const router = express.Router();
const { webhookQueue } = require('../services/QueueService');

/**
 * Webhook Support
 * Handles asynchronous callbacks from Regula (KYC) and Damanesign (Signature).
 */

// Regula KYC Webhook
router.post('/regula-kyc', async (req, res) => {
  const { userId, status, confidence } = req.body;
  console.log(`[Webhook] Queueing Regula KYC update for user ${userId}`);
  
  try {
    await webhookQueue.add('process-kyc', {
      type: 'REGULA_KYC',
      payload: { userId, status, confidence }
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 }
    });
    
    // Instantly return 200 to partner
    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Damanesign Signature Webhook
router.post('/damanesign-signature', async (req, res) => {
  const { loanId, signatureStatus } = req.body;
  console.log(`[Webhook] Queueing Damanesign update for loan ${loanId}`);
  
  try {
    await webhookQueue.add('process-signature', {
      type: 'DAMANESIGN_SIGNATURE',
      payload: { loanId, signatureStatus }
    }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 }
    });

    // Instantly return 200 to partner
    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
