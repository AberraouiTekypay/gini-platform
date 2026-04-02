const Loan = require('../models/loan');
const Repayment = require('../models/repayment');
const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const { evaluateApplication } = require('../services/LoanEngine');
const { generateRepaymentSchedule } = require('../utils/finance');
const LoanProvider = require('../providers/LoanProvider');

/**
 * Factory that creates loan controller functions with dependency injection.
 */
module.exports = (scoringService) => ({
  /**
   * Apply for a loan after validating user eligibility via the scoring service.
   */
  applyLoan: async (req, res) => {
    const { amount } = req.body;
    try {
      const user = await User.findByPk(req.user.id, { include: Wallet });

      // 1. Get score from scoringService
      const score = await scoringService.calculateScore(user);

      // 2. Evaluate with LoanEngine
      const { grade, interestRate, status } = evaluateApplication(user, score);

      // 3. Generate Repayment Schedule
      const schedule = generateRepaymentSchedule(amount, interestRate);

      // 4. Create Loan Record
      const loan = await Loan.create({
        amount,
        UserId: user.id,
        status: status,
        creditGrade: grade,
        interestRate: interestRate,
        repaymentSchedule: schedule,
      });

      // 5. If auto-approved, disburse via Provider
      if (status === 'approved' && user.Wallet) {
        const disbursement = await LoanProvider.disburseLoan({
          walletId: user.Wallet.id,
          amount: amount,
          loanId: loan.id
        });

        if (disbursement.success) {
          await Wallet.increment('balance', { by: amount, where: { UserId: user.id } });
          
          await Transaction.create({
            amount,
            type: 'loan',
            status: 'completed',
            WalletId: user.Wallet.id,
            reference: disbursement.loanReference,
            providerName: disbursement.providerName,
            providerReference: disbursement.providerReference
          });
        }
      }

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
