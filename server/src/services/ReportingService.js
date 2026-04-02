// server/src/services/ReportingService.js
const { Op } = require('sequelize');
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');
const User = require('../models/user');

/**
 * Service to generate regulatory reports (e.g., for ANRF/UTRF).
 */
class ReportingService {
  /**
   * Generates a JSON report of transactions over 10,000 threshold.
   * @param {number} threshold - The threshold amount (default 10,000).
   * @returns {Promise<Array>} List of flagged transactions.
   */
  async generateHighValueReport(threshold = 10000) {
    console.log(`[ReportingService] Generating high-value transaction report (> ${threshold})...`);
    
    const transactions = await Transaction.findAll({
      where: {
        amount: { [Op.gt]: threshold },
        status: 'SETTLED'
      },
      include: {
        model: Wallet,
        include: {
          model: User,
          attributes: ['id', 'email', 'kycStatus'] // National ID should be decrypted here in a real scenario
        }
      }
    });

    const report = transactions.map(tx => ({
      transactionReference: tx.reference,
      amount: tx.amount,
      date: tx.createdAt,
      type: tx.type,
      userId: tx.Wallet.User.id,
      userEmail: tx.Wallet.User.email,
      kycStatus: tx.Wallet.User.kycStatus,
      // National ID would be included here after decryption
      nationalId: `ID-USER-${tx.Wallet.User.id}` 
    }));

    return report;
  }
}

module.exports = new ReportingService();
