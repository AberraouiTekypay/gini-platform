const cron = require('node-cron');
const { Op } = require('sequelize');
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');
const User = require('../models/user');
const TreasuryService = require('./TreasuryService');

class EodSweepService {
  async sweepGiniFees() {
    console.log('[EOD Sweep] Starting daily Gini fee sweep...');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    try {
      // Find all commissions from the last 24h
      const fees = await Transaction.findAll({
        where: {
          type: 'COMMISSION',
          providerName: 'AGENT_COMMISSION',
          createdAt: { [Op.gte]: today },
          status: 'SETTLED'
        }
      });

      let totalGiniRevenue = 0;
      for (const fee of fees) {
        const giniFee = fee.amount * 0.5;
        totalGiniRevenue += giniFee;
      }

      if (totalGiniRevenue > 0) {
        console.log(`[EOD Sweep] Sweeping ${totalGiniRevenue} MAD to Corporate Revenue Account.`);
        // In real life: await BankingProvider.transferToCorporate('GINI_REV_01', totalGiniRevenue);
      } else {
        console.log('[EOD Sweep] No fees to sweep today.');
      }

      // Generate Settlement File
      await TreasuryService.generateNapsSettlementFile();
      
      // Perform Liquidity Check
      await TreasuryService.checkLiquidity();
    } catch (err) {
      console.error('[EOD Sweep] Error during sweep:', err);
    }
  }

  startCron() {
    // Run every day at 23:59
    cron.schedule('59 23 * * *', () => {
      this.sweepGiniFees();
    });
    console.log('[EOD Sweep] Cron job scheduled (23:59 daily).');
  }
}

module.exports = new EodSweepService();
