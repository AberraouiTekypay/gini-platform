// server/src/services/ReconService.js
const Transaction = require('../models/transaction');

/**
 * Reconciliation Service
 * Compares internal ledger entries with provider transaction IDs.
 */
class ReconService {
  /**
   * Reconciles transactions for a specific provider.
   * @param {string} providerName - Name of the provider.
   * @param {Array<Object>} providerTransactions - List of transactions from the provider's API.
   */
  async reconcile(providerName, providerTransactions) {
    console.log(`[ReconService] Starting reconciliation for ${providerName}...`);
    
    const internalTransactions = await Transaction.findAll({
      where: { providerName }
    });

    const report = {
      matched: [],
      missingInInternal: [],
      missingInProvider: [],
      statusMismatches: []
    };

    const internalMap = new Map(internalTransactions.map(t => [t.providerReference, t]));
    const providerMap = new Map(providerTransactions.map(t => [t.id, t]));

    // Check provider transactions against internal records
    for (const pTx of providerTransactions) {
      const iTx = internalMap.get(pTx.id);
      if (iTx) {
        if (iTx.status !== pTx.status) {
          report.statusMismatches.push({ internal: iTx, provider: pTx });
        } else {
          report.matched.push(iTx.id);
        }
      } else {
        report.missingInInternal.push(pTx);
      }
    }

    // Check internal records against provider transactions
    for (const iTx of internalTransactions) {
      if (!providerMap.has(iTx.providerReference)) {
        report.missingInProvider.push(iTx);
      }
    }

    console.log(`[ReconService] Reconciliation complete for ${providerName}. Matched: ${report.matched.length}`);
    return report;
  }
}

module.exports = new ReconService();
