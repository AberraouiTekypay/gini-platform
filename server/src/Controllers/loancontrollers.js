codex/reorganiser-la-logique-de-scoring
// src/controllers/loancontrollers.js
const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const User = require('../models/User');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
=======
// src/controllers/loanController.js
const Loan = require('../models/loan');
const Repayment = require('../models/repayment');
const User = require('../models/user');
main

/**
 * Factory that creates loan controller functions with dependency injection.
 * @param {Object} scoringService - service with a `calculateScore` method
 */
module.exports = (scoringService) => ({
  /**
   * Apply for a loan after validating user eligibility via the scoring service.
   */
  applyLoan: async (req, res) => {
    const { amount } = req.body;
    try {
      const user = await User.findByPk(req.user.id, { include: Wallet });

      const eligible = await scoringService.calculateScore(user);
      if (!eligible) {
        return res.status(400).json({ error: 'Loan denied' });
      }

      const loan = await Loan.create({
        amount,
        UserId: user.id,
        status: 'approved'
      });

      await Wallet.increment('balance', { by: amount, where: { UserId: user.id } });

      await Transaction.create({
        amount,
        type: 'loan',
        status: 'completed',
        WalletId: user.Wallet.id
      });

      res.status(201).json(loan);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /** List all loans for the authenticated user */
  getLoans: async (req, res) => {
    const loans = await Loan.findAll({ where: { UserId: req.user.id } });
    res.json(loans);
  },

  /** Retrieve a single loan record */
  getLoan: async (req, res) => {
    const loan = await Loan.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  },

  /** Mark a loan as repaid */
  repayLoan: async (req, res) => {
    const loan = await Loan.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    loan.repaid = true;
    loan.status = 'repaid';
    await loan.save();
    res.json({ message: 'Loan repaid', loan });
  },

  /** Admin helper to approve a loan */
  approveLoan: async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    loan.status = 'approved';
    await loan.save();
    res.json({ message: 'Loan approved', loan });
  },

  /** Admin helper to reject a loan */
  rejectLoan: async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    loan.status = 'rejected';
    await loan.save();
    res.json({ message: 'Loan rejected', loan });
  }
});

