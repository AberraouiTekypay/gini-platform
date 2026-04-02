const Loan = require('../models/loan');
const User = require('../models/user');
const Wallet = require('../models/wallet');

/**
 * Admin Controller
 * Handles backend operations for administrative users.
 */
const adminController = {
  /**
   * Fetch all pending loans.
   */
  getPendingLoans: async (req, res) => {
    try {
      const pendingLoans = await Loan.findAll({
        where: { status: 'pending' },
        include: { model: User, attributes: ['id', 'email', 'firstName', 'lastName'] }
      });
      res.json(pendingLoans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Approve or reject a loan based on ID.
   */
  reviewLoan: async (req, res) => {
    const { loanId, status, reviewerId } = req.body; // status should be 'approved' or 'rejected'
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    try {
      const loan = await Loan.findByPk(loanId);
      if (!loan) {
        return res.status(404).json({ error: 'Loan not found' });
      }

      loan.status = status;
      loan.reviewedBy = reviewerId;
      loan.reviewDate = new Date();
      await loan.save();

      res.json({ message: `Loan ${status} successfully`, loan });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Get a summary of user information including CredoLab scores and KYC basics.
   */
  getUserOverview: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        include: [{ model: Wallet }, { model: Loan }]
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Placeholder for actual CredoLab/KYC data lookup
      const userOverview = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt
        },
        wallet: user.Wallet,
        loans: user.Loans,
        credoLabData: {
          score: 720, // Placeholder
          riskLevel: 'Low',
          lastScanned: new Date()
        },
        kycStatus: 'Verified' // Placeholder
      };

      res.json(userOverview);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = adminController;
