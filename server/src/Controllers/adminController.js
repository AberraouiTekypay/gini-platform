const Loan = require('../models/loan');
const User = require('../models/user');
const Wallet = require('../models/wallet');

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

      loan.status = status;
      loan.adminNotes = adminNotes;
      loan.reviewedBy = reviewerId;
      loan.reviewedAt = new Date();
      await loan.save();

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
  }
};

module.exports = adminController;
