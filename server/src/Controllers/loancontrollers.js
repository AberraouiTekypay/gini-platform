const Loan = require('../models/loan');
const Repayment = require('../models/repayment');
const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const { evaluateApplication } = require('../services/LoanEngine');
const { generateRepaymentSchedule } = require('../utils/finance');
const LoanProvider = require('../providers/LoanProvider');
const SignatureProvider = require('../services/SignatureProvider');

/**
 * Factory that creates loan controller functions with dependency injection.
 */
module.exports = (scoringService) => ({
  /**
   * Apply for a loan after validating user eligibility via the scoring service.
   */
  applyLoan: async (req, res) => {
    const { amount, autoDebitAuthorized } = req.body;
    try {
      const user = await User.findByPk(req.user.id, { include: Wallet });

      // 1. Get score from scoringService
      const score = await scoringService.calculateScore(user);

      // 2. Evaluate with LoanEngine
      const { grade, interestRate, status } = evaluateApplication(user, score);

      // 3. Generate Repayment Schedule
      const schedule = generateRepaymentSchedule(amount, interestRate);

      // 4. Create Loan Record (status becomes 'pending_signature' if approved)
      const loan = await Loan.create({
        amount,
        UserId: user.id,
        status: status === 'approved' ? 'pending_signature' : status,
        creditGrade: grade,
        interestRate: interestRate,
        repaymentSchedule: schedule,
        autoDebitAuthorized: !!autoDebitAuthorized,
      });

      // 5. Generate Contract if auto-approved
      let contractInfo = null;
      if (loan.status === 'pending_signature') {
        contractInfo = await SignatureProvider.generateContract(user.id, { amount, grade });
      }

      res.status(201).json({ loan, contractInfo });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Simulate signing the loan contract (Morocco Launch simulation)
   */
  signLoan: async (req, res) => {
    const { loanId } = req.params;
    try {
      const loan = await Loan.findByPk(loanId, { include: { model: User, include: Wallet } });
      if (!loan) return res.status(404).json({ error: 'Loan not found' });
      if (loan.status !== 'pending_signature') return res.status(400).json({ error: 'Loan not pending signature' });

      // Simulate Damanesign Callback
      await SignatureProvider.handleSignatureSuccess(loan.id);
      
      // Refresh loan data after signature success
      await loan.reload();

      // Disbursement happens ONLY AFTER SIGNED
      if (loan.signatureStatus === 'SIGNED' && loan.User && loan.User.Wallet) {
        const disbursement = await LoanProvider.disburseLoan({
          walletId: loan.User.Wallet.id,
          amount: loan.amount,
          loanId: loan.id
        });

        if (disbursement.success) {
          await Wallet.increment('balance', { by: loan.amount, where: { UserId: loan.UserId } });
          
          await Transaction.create({
            amount: loan.amount,
            type: 'loan',
            status: 'completed',
            WalletId: loan.User.Wallet.id,
            reference: disbursement.loanReference,
            providerName: disbursement.providerName,
            providerReference: disbursement.providerReference
          });
        }
      }

      res.json({ message: 'Loan signed and disbursed successfully', loan });
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
