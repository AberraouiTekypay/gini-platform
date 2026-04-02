const express = require('express');
const { authenticate } = require('../middlewares/auth');
const scoringService = require('../services/scoringService');
const createLoanController = require('../Controllers/loancontrollers');

const router = express.Router();
const loanController = createLoanController(scoringService);

router.post('/apply', authenticate, loanController.applyLoan);
router.get('/', authenticate, loanController.getLoans);
router.get('/:id', authenticate, loanController.getLoan);
router.post('/:id/repay', authenticate, loanController.repayLoan);
router.post('/:id/approve', authenticate, loanController.approveLoan);
router.post('/:id/reject', authenticate, loanController.rejectLoan);

module.exports = router;
