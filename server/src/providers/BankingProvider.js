// server/src/providers/BankingProvider.js

const { isMockMode } = require('../utils/config');

/**
 * Simulated Banking Provider for managing fund transfers.
 */
class BankingProvider {
  constructor() {
    this.isMock = isMockMode('LANACASH');
    if (this.isMock) console.log('[BankingProvider] Initialized in MOCK mode.');
  }

  /**
   * Simulates a deposit of funds into a user's account/wallet.
   * @param {string} walletId - Target wallet ID.
   * @param {number} amount - Amount to deposit.
   * @returns {Promise<Object>} Deposit transaction details.
   */
  async deposit(walletId, amount) {
    console.log(`[BankingProvider] Depositing ${amount} to wallet ${walletId}`);
    return {
      success: true,
      transactionId: `BANK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      provider: 'GiniBank',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Simulates a withdrawal of funds from a user's account/wallet to the Gini Ledger.
   * @param {string} walletId - Target wallet ID.
   * @param {number} amount - Amount to withdraw.
   * @returns {Promise<Object>} Withdrawal transaction details.
   */
  async withdraw(walletId, amount) {
    console.log(`[BankingProvider] Withdrawing ${amount} from wallet ${walletId} to Gini Ledger`);
    return {
      success: true,
      transactionId: `WITHDRAW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      provider: 'GiniBank',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Simulates a QR transaction with fee deduction.
   * @param {string} walletId - Target wallet ID.
   * @param {number} amount - Gross amount of the transaction.
   * @returns {Promise<Object>} Transaction details with fee breakdown.
   */
  async processQrTransaction(walletId, amount) {
    const GINI_FEE_PERCENT = 0.015; // 1.5%
    const PARTNER_FEE_PERCENT = 0.005; // 0.5%

    const giniFee = amount * GINI_FEE_PERCENT;
    const partnerFee = amount * PARTNER_FEE_PERCENT;
    const netAmount = amount - giniFee - partnerFee;

    console.log(`[BankingProvider] Processing QR transaction: Gross=${amount}, Net=${netAmount}, GiniFee=${giniFee}, PartnerFee=${partnerFee}`);

    // Internal Accounting: Credit Gini Revenue Wallet
    const Wallet = require('../models/wallet');
    await Wallet.increment('balance', { by: giniFee, where: { label: 'GINI_REVENUE' } });

    return {
      success: true,
      transactionId: `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      provider: 'GiniBank',
      grossAmount: amount,
      netAmount: parseFloat(netAmount.toFixed(2)),
      giniFee: parseFloat(giniFee.toFixed(2)),
      partnerFee: parseFloat(partnerFee.toFixed(2)),
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new BankingProvider();
