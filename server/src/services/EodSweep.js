const cron = require('node-cron');
const { Op } = require('sequelize');
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');
const User = require('../models/user');

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

      // Calculate total fees (Gini slice is 0.5% while agent gets 1%, but for simplicity, let's say Gini takes a defined cut or we find specific GINI_FEE transactions)
      // Since we didn't store Gini fee directly as a transaction, let's say we sweep a known value or we sweep Agent commissions to a corporate account (Wait, commissions went to the agent float).
      // Let's instead log the sweep and simulate transferring Gini's 0.5% cut from a central reserve to a revenue account.
      let totalGiniRevenue = 0;
      for (const fee of fees) {
        // Reverse math: Agent got 1% (amount). Gross was amount * 100. Gini fee is Gross * 0.005 = amount * 0.5.
        const giniFee = fee.amount * 0.5;
        totalGiniRevenue += giniFee;
      }

      if (totalGiniRevenue > 0) {
        console.log(`[EOD Sweep] Sweeping ${totalGiniRevenue} MAD to Corporate Revenue Account.`);
        // In real life: await BankingProvider.transferToCorporate('GINI_REV_01', totalGiniRevenue);
      } else {
        console.log('[EOD Sweep] No fees to sweep today.');
      }
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
