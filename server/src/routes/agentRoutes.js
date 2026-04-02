// server/src/routes/agentRoutes.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');
const agentController = require('../Controllers/agentController');

const router = express.Router();

// Cash-In: Agent provides digital money to Customer (for cash)
router.post('/cash-in', authenticate, agentController.processCashIn);

// Cash-Out: Customer provides digital money to Agent (for cash)
router.post('/cash-out', authenticate, agentController.processCashOut);

module.exports = router;
