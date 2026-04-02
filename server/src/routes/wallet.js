// server/src/routes/wallet.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const walletController = require('../Controllers/walletController');

const router = express.Router();

// Fetch wallet balance
router.get('/balance', authenticate, walletController.getBalance);

// Deposit funds (simulated via BankingProvider)
router.post('/deposit', authenticate, walletController.depositFunds);

module.exports = router;
