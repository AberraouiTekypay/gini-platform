// server/src/routes/partnerRoutes.js
const express = require('express');
const router = express.Router();
const partnerAuth = require('../middlewares/partnerAuth');
const Loan = require('../models/loan');
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');

/**
 * Partner-Facing API
 * Allows banks/partners to communicate with the Gini platform.
 */

// Secure all routes with the Partner-API-Key middleware
router.use(partnerAuth);

/**
 * POST /partner/v1/disbursement-confirm
 * Confirms that funds have been sent from the bank's balance sheet.
 */
router.post('/v1/disbursement-confirm', async (req, res) => {
  const { loanId, providerReference } = req.body;

  try {
    const loan = await Loan.findByPk(loanId, { include: 'User' });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found.' });
    }

    if (loan.PartnerId !== req.partner.id) {
      return res.status(403).json({ error: 'Unauthorized for this loan.' });
    }

    // Logic for successful disbursement from partner bank
    loan.status = 'active';
    await loan.save();

    // Update wallet and record transaction
    const wallet = await Wallet.findOne({ where: { UserId: loan.UserId } });
    if (wallet) {
      await wallet.increment('balance', { by: loan.amount });
      await Transaction.create({
        amount: loan.amount,
        type: 'loan',
        status: 'SETTLED',
        WalletId: wallet.id,
        providerName: req.partner.name,
        providerReference: providerReference || `PARTNER-${Date.now()}`
      });
    }

    res.json({ message: 'Disbursement confirmed and funds available in user wallet.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
