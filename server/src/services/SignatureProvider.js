// server/src/services/SignatureProvider.js
const Loan = require('../models/loan');
const { isMockMode } = require('../utils/config');

/**
 * Digital Signature Provider using Damanesign integration logic.
 */
class DamanesignProvider {
  constructor() {
    this.isMock = isMockMode('DAMANESIGN');
    if (this.isMock) console.log('[DamanesignProvider] Initialized in MOCK mode.');
  }

  /**
   * Generates a contract for a user to sign.
   * @param {number} userId - ID of the user.
   * @param {Object} loanTerms - Terms of the loan.
   * @returns {Promise<Object>} Status of the contract generation.
   */
  async generateContract(userId, loanTerms) {
    console.log(`[DamanesignProvider] Generating contract for user ${userId} with amount ${loanTerms.amount}`);
    // Simulate Damanesign API call to create contract
    return {
      status: 'Pending Signature',
      contractId: `DS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      signingUrl: `https://damanesign.ma/sign/${Math.random().toString(36).substr(2, 20)}`
    };
  }

  /**
   * Webhook placeholder to handle successful signature from Damanesign.
   * In a real implementation, this would be an endpoint.
   * @param {number} loanId - ID of the loan signed.
   */
  async handleSignatureSuccess(loanId) {
    console.log(`[DamanesignProvider] Webhook received: Loan ${loanId} signed successfully.`);
    const loan = await Loan.findByPk(loanId);
    if (loan) {
      loan.signatureStatus = 'SIGNED';
      loan.status = 'active'; // Move from pending_signature to active
      await loan.save();
      
      // Trigger disbursement logic (should be moved to a service in production)
      console.log(`[DamanesignProvider] Loan ${loanId} is now SIGNED. Ready for disbursement.`);
    }
  }
}

module.exports = new DamanesignProvider();
