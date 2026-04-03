// server/src/providers/RegulaProvider.js

const { isMockMode } = require('../utils/config');

/**
 * Regula SDK provider for identity verification.
 */
class RegulaProvider {
  constructor() {
    this.isMock = isMockMode('REGULA');
    if (this.isMock) console.log('[RegulaProvider] Initialized in MOCK mode.');
  }

  /**
   * Mock verifyIdentity implementation.
   * @param {Array} images - ID card/face image data.
   * @returns {Promise<Object>} Verification results.
   */
  async verifyIdentity(images) {
    console.log('[RegulaProvider] Processing verification...');
    // Simulated processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          confidence: 0.98,
          docType: 'Moroccan ID',
          verified: true
        });
      }, 500);
    });
  }

  /**
   * Mock verifyBiometric implementation for PIN reset.
   * @param {string} selfie - Selfie image data.
   * @param {string} storedID - Stored ID reference.
   * @returns {Promise<Object>} Verification results.
   */
  async verifyBiometric(selfie, storedID) {
    console.log(`[RegulaProvider] Processing biometric verification against stored ID: ${storedID}...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          matchConfidence: 0.99,
          verified: true
        });
      }, 500);
    });
  }
}

module.exports = new RegulaProvider();
