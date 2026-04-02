// server/src/providers/LoanProvider.js
const BankingProvider = require('./BankingProvider');

/**
 * Simulated Loan Provider for managing loan disbursements and repayment tracking.
 */
class LoanProvider {
  /**
   * Disburses a loan amount to a user's wallet via a Banking Provider.
   * @param {Object} loanData - Loan application and user wallet details.
   * @returns {Promise<Object>} Disbursement transaction status.
   */
  async disburseLoan(loanData) {
    const { walletId, amount, loanId } = loanData;
    console.log(`[LoanProvider] Initiating disbursement for Loan ${loanId}`);

    // Call BankingProvider to simulate the actual fund transfer.
    const bankTx = await BankingProvider.deposit(walletId, amount);

    if (bankTx.success) {
      return {
        success: true,
        loanReference: `LOAN-DISB-${loanId}-${bankTx.transactionId}`,
        providerName: bankTx.provider,
        providerReference: bankTx.transactionId
      };
    } else {
      throw new Error('Banking Provider failed to process disbursement.');
    }
  }
}

module.exports = new LoanProvider();
