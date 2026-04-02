const Loan = require('../models/loan');
const User = require('../models/user');
const Wallet = require('../models/wallet');
const AuditLog = require('../models/AuditLog');
const PendingAction = require('../models/PendingAction');

/**
 * Admin Controller
 * Handles backend operations for Gini back-office administrators.
 */
const adminController = {
  /**
   * Fetch all pending loans for the dashboard.
   */
  getAllPendingLoans: async (req, res) => {
    try {
      const pendingLoans = await Loan.findAll({
        where: { status: 'pending' },
        include: { 
          model: User, 
          attributes: ['id', 'email', 'firstName', 'lastName'] 
        }
      });
      res.json(pendingLoans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Update status to approved or rejected with admin notes.
   */
  updateLoanStatus: async (req, res) => {
    const { loanId, status, adminNotes, reviewerId } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved or rejected.' });
    }

    try {
      const loan = await Loan.findByPk(loanId, { include: User });
      if (!loan) {
        return res.status(404).json({ error: 'Loan entry not found.' });
      }

      // Maker-Checker: High value loans require SUPER_ADMIN approval
      if (status === 'approved' && loan.amount > 10000) {
        const pendingAction = await PendingAction.create({
          actionType: 'LOAN_APPROVAL',
          payload: { loanId, status, adminNotes, reviewerId },
          requestedBy: req.user ? req.user.id : reviewerId || 1
        });
        return res.json({ message: 'Loan amount exceeds 10,000 MAD. Sent to SUPER_ADMIN for approval.', pendingAction });
      }

      loan.status = status;
      loan.adminNotes = adminNotes;
      loan.reviewedBy = reviewerId;
      loan.reviewedAt = new Date();
      await loan.save();

      // Audit Trail: Record Admin Action
      await AuditLog.create({
        action: `LOAN_${status.toUpperCase()}`,
        entityType: 'Loan',
        entityId: loan.id,
        adminId: reviewerId,
        details: { adminNotes, amount: loan.amount }
      });

      // Logic for wallet incrementing if approved
      if (status === 'approved' && loan.User) {
        const wallet = await Wallet.findOne({ where: { UserId: loan.User.id } });
        if (wallet) {
          await wallet.increment('balance', { by: loan.amount });
        }
      }

      res.json({ message: `Loan successfully ${status}.`, loan });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Retrieve risk profile data from CredoLab logic.
   */
  getUserRiskProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Simulated CredoLab Risk Logic
      const riskProfile = {
        userId: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        credoScore: 685, // Mock score from SDK collection
        riskLevel: 'Moderate',
        behavioralInsights: [
          'High device battery stability',
          'Consistent social connectivity',
          'No historical gambling application usage'
        ],
        kycStatus: 'Verified',
        lastAudit: new Date()
      };

      res.json(riskProfile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * System Health Pulse
   * Pings core partners (Regula, Damanesign, LanaCash) to ensure connectivity.
   */
  getSystemHealth: async (req, res) => {
    // Simulated pings
    const health = {
      status: 'UP',
      timestamp: new Date(),
      services: {
        Regula: { status: 'OK', latency: '45ms' },
        Damanesign: { status: 'OK', latency: '120ms' },
        LanaCash: { status: 'OK', latency: '88ms' },
        PostgreSQL: { status: 'CONNECTED' }
      },
      environment: process.env.NODE_ENV || 'production',
      version: '1.0.0-Hardened'
    };
    res.json(health);
  },

  /**
   * Reverse a transaction (Dispute Handling)
   * Creates a counter-entry in the ledger.
   */
  reverseTransaction: async (req, res) => {
    const { transactionId, adminNotes } = req.body;
    const { sequelize } = require('../models');
    const Transaction = require('../models/transaction');

    try {
      const originalTx = await Transaction.findByPk(transactionId);
      if (!originalTx) throw new Error('Transaction not found');
      if (originalTx.status !== 'SETTLED') throw new Error('Only SETTLED transactions can be reversed');

      // Maker-Checker: Reversals require SUPER_ADMIN approval
      const pendingAction = await PendingAction.create({
        actionType: 'REVERSAL',
        payload: { transactionId, adminNotes },
        requestedBy: req.user ? req.user.id : 1
      });
      return res.json({ message: 'Reversal request sent to SUPER_ADMIN for approval.', pendingAction });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Approve a pending action (SUPER_ADMIN only)
   */
  approvePendingAction: async (req, res) => {
    const { actionId } = req.body;
    const { sequelize } = require('../models');
    const Transaction = require('../models/transaction');
    const AuditLog = require('../models/AuditLog');

    const t = await sequelize.transaction();

    try {
      const action = await PendingAction.findByPk(actionId, { transaction: t });
      if (!action) throw new Error('Pending action not found');
      if (action.status !== 'PENDING') throw new Error('Action is not pending');

      action.status = 'APPROVED';
      action.approvedBy = req.user ? req.user.id : 1;
      await action.save({ transaction: t });

      if (action.actionType === 'REVERSAL') {
        const { transactionId, adminNotes } = action.payload;
        const originalTx = await Transaction.findByPk(transactionId, { transaction: t });
        
        const reversedTx = await Transaction.create({
          amount: -originalTx.amount, // Negative amount for reversal
          type: originalTx.type,
          status: 'REVERSED',
          WalletId: originalTx.WalletId,
          reference: `REV-${originalTx.reference}`,
          providerName: originalTx.providerName,
          providerReference: originalTx.providerReference
        }, { transaction: t });

        originalTx.status = 'REVERSED';
        await originalTx.save({ transaction: t });

        const wallet = await Wallet.findByPk(originalTx.WalletId, { transaction: t });
        if (wallet) {
          if (['deposit', 'CASH_IN', 'loan', 'COMMISSION'].includes(originalTx.type)) {
            await wallet.decrement('balance', { by: originalTx.amount, transaction: t });
          } else if (['CASH_OUT', 'repayment', 'transfer'].includes(originalTx.type)) {
            await wallet.increment('balance', { by: originalTx.amount, transaction: t });
          }
        }

        await AuditLog.create({
          action: 'TRANSACTION_REVERSE_APPROVED',
          entityType: 'Transaction',
          entityId: originalTx.id,
          adminId: action.approvedBy,
          details: { adminNotes, originalReference: originalTx.reference }
        }, { transaction: t });

        await t.commit();
        res.json({ message: 'Transaction reversed successfully', reversedTx });
      } else if (action.actionType === 'LOAN_APPROVAL') {
        const { loanId, status, adminNotes, reviewerId } = action.payload;
        const loan = await Loan.findByPk(loanId, { include: User, transaction: t });
        
        loan.status = status;
        loan.adminNotes = adminNotes;
        loan.reviewedBy = reviewerId;
        loan.reviewedAt = new Date();
        await loan.save({ transaction: t });

        await AuditLog.create({
          action: `LOAN_${status.toUpperCase()}_APPROVED`,
          entityType: 'Loan',
          entityId: loan.id,
          adminId: action.approvedBy,
          details: { adminNotes, amount: loan.amount }
        }, { transaction: t });

        if (status === 'approved' && loan.User) {
          const wallet = await Wallet.findOne({ where: { UserId: loan.User.id }, transaction: t });
          if (wallet) {
            await wallet.increment('balance', { by: loan.amount, transaction: t });
          }
        }

        await t.commit();
        res.json({ message: `Loan successfully ${status}.`, loan });
      } else {
        throw new Error('Unknown action type');
      }
    } catch (err) {
      await t.rollback();
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Financial Observability: Trial Balance
   */
  getTrialBalance: async (req, res) => {
    const ReconService = require('../services/ReconService');
    try {
      const report = await ReconService.generateTrialBalanceReport();
      res.json(report);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Support Hub: Search Users
   */
  searchUsers: async (req, res) => {
    const { q } = req.query;
    const { Op } = require('sequelize');
    try {
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { email: { [Op.iLike]: `%${q}%` } },
            { id: isNaN(q) ? -1 : parseInt(q) }
          ]
        },
        attributes: ['id', 'email', 'kycStatus', 'isBlocked', 'role', 'floatBalance'],
        limit: 10
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Support Hub: Manual KYC Override
   */
  manualKycOverride: async (req, res) => {
    const { userId, adminNotes } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });

      user.kycStatus = 'verified';
      user.isBlocked = false;
      await user.save();

      await AuditLog.create({
        action: 'MANUAL_KYC_VERIFY',
        entityType: 'User',
        entityId: user.id,
        adminId: req.user ? req.user.id : 1,
        details: { adminNotes }
      });

      res.json({ message: 'User manually verified successfully.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Support Hub: User Activity Timeline
   */
  getUserTimeline: async (req, res) => {
    const { id } = req.params;
    const Transaction = require('../models/transaction');
    try {
      const wallet = await Wallet.findOne({ where: { UserId: id } });
      const transactions = wallet ? await Transaction.findAll({ where: { WalletId: wallet.id }, order: [['createdAt', 'DESC']] }) : [];
      const logs = await AuditLog.findAll({ where: { entityId: id }, order: [['createdAt', 'DESC']] });
      
      const timeline = [
        ...transactions.map(t => ({ date: t.createdAt, event: `${t.type.toUpperCase()} - ${t.amount} MAD`, status: t.status })),
        ...logs.map(l => ({ date: l.timestamp, event: l.action, status: 'AUDITED' }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json(timeline);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = adminController;
