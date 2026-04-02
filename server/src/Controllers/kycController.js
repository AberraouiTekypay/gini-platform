// server/src/Controllers/kycController.js
const User = require('../models/user');
const KycOrchestrator = require('../providers/KycProvider');

/**
 * KYC Controller for handling identity verification.
 */
const kycController = {
  /**
   * Handle POST /api/kyc/verify request.
   * Verify identity via KycOrchestrator and update user status.
   */
  verifyIdentity: async (req, res) => {
    const { images } = req.body;
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Call the KYC orchestrator for verification.
      const kycResult = await KycOrchestrator.verify(images);

      if (kycResult.success && kycResult.verified) {
        // KYC Success: Mark as verified and ensure not blocked.
        user.kycStatus = 'verified';
        user.isBlocked = false;
        await user.save();
        
        return res.status(200).json({
          message: 'Identity successfully verified',
          kycResult
        });
      } else {
        // Logic Rule: If KYC fails or is not 'verified', block user.
        user.kycStatus = 'rejected';
        user.isBlocked = true;
        await user.save();

        return res.status(400).json({
          error: 'Identity verification failed',
          kycResult
        });
      }
    } catch (err) {
      console.error('[kycController] Error during verification:', err.message);
      res.status(500).json({ error: 'Internal server error during KYC verification' });
    }
  }
};

module.exports = kycController;
