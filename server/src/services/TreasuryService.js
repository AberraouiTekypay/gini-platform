const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Treasury & Settlement Service
 * Manages platform liquidity and inter-bank settlement exports.
 */
class TreasuryService {
  /**
   * Monitors Gini corporate wallets for low liquidity.
   */
  async checkLiquidity() {
    const LIQUIDITY_THRESHOLD = 100000; // 100,000 MAD
    
    try {
      const revenueWallet = await Wallet.findOne({ where: { label: 'GINI_REVENUE' } });
      const marketingWallet = await Wallet.findOne({ where: { label: 'GINI_MARKETING' } });

      if (revenueWallet && revenueWallet.balance < LIQUIDITY_THRESHOLD) {
        logger.warn(`[Treasury] LOW LIQUIDITY ALERT: Gini Revenue wallet at ${revenueWallet.balance} MAD.`);
      }

      if (marketingWallet && marketingWallet.balance < (LIQUIDITY_THRESHOLD / 2)) {
        logger.warn(`[Treasury] LOW LIQUIDITY ALERT: Gini Marketing wallet at ${marketingWallet.balance} MAD.`);
      }
    } catch (err) {
      logger.error('[Treasury] Error during liquidity check:', err);
    }
  }

  /**
   * Generates a daily settlement file for NAPS/HPS reconciliation.
   */
  async generateNapsSettlementFile() {
    console.log('[Treasury] Generating daily NAPS settlement file...');
    
    const startOfYesterday = new Date();
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date();
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999);

    try {
      const dailyTransactions = await Transaction.findAll({
        where: {
          status: 'SETTLED',
          createdAt: {
            [Op.between]: [startOfYesterday, endOfYesterday]
          }
        }
      });

      if (dailyTransactions.length === 0) {
        console.log('[Treasury] No transactions to settle for yesterday.');
        return;
      }

      const csvHeader = 'TransactionID,Amount,Type,ProviderRef,Timestamp\n';
      const csvRows = dailyTransactions.map(tx => 
        `${tx.reference},${tx.amount},${tx.type},${tx.providerReference},${tx.createdAt.toISOString()}`
      ).join('\n');

      const fileName = `settlement_naps_${startOfYesterday.toISOString().split('T')[0]}.csv`;
      const filePath = path.join(__dirname, '../../exports', fileName);

      // Ensure directory exists
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      fs.writeFileSync(filePath, csvHeader + csvRows);
      logger.info(`[Treasury] Settlement file generated: ${fileName}`);
      
      return filePath;
    } catch (err) {
      logger.error('[Treasury] Failed to generate settlement file:', err);
    }
  }
}

module.exports = new TreasuryService();
