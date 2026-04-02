// server/src/providers/KycProvider.js
const RegulaProvider = require('./RegulaProvider');

/**
 * Orchestrates identity verification across multiple KYC providers.
 */
class KycOrchestrator {
  constructor() {
    // Current active provider
    this.provider = RegulaProvider;

    // Rerouting Ready: Swap providers in the constructor as needed.
    // Example: this.provider = require('./OtherProvider');
  }

  /**
   * Verify identity using the selected provider.
   * @param {Array} images - ID card/face image data.
   * @returns {Promise<Object>} Verification results.
   */
  async verify(images) {
    console.log(`[KycOrchestrator] Using ${this.provider.constructor.name} for verification.`);
    return this.provider.verifyIdentity(images);
  }
}

module.exports = new KycOrchestrator();
