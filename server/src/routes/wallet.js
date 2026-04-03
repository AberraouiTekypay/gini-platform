// server/src/routes/wallet.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const walletController = require('../Controllers/walletController');
const idempotency = require('../middlewares/idempotency');

const router = express.Router();

// Fetch wallet balance
router.get('/balance', authenticate, walletController.getBalance);

// Deposit funds (simulated via BankingProvider)
router.post('/deposit', authenticate, idempotency, walletController.depositFunds);

// Transfer funds between wallets
router.post('/transfer', authenticate, idempotency, walletController.transferFunds);

// Download monthly statement
router.get('/statement', authenticate, walletController.getStatement);

module.exports = router;
