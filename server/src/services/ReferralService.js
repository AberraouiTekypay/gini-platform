// server/src/services/ReferralService.js
const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const { sequelize } = require('../models');

/**
 * Growth & Engagement Engine
 * Handles referral bonuses and loyalty logic.
 */
class ReferralService {
  /**
   * Triggers a reward for the referrer when a new user takes their first loan.
   * @param {number} newUserId - The ID of the newly funded user.
   */
  async processFirstLoanReward(newUserId) {
    console.log(`[ReferralService] Checking rewards for User ${newUserId}...`);
    
    try {
      const user = await User.findByPk(newUserId);
      if (!user || !user.referredBy) return;

      const referrer = await User.findByPk(user.referredBy, { include: Wallet });
      if (!referrer || !referrer.Wallet) return;

      const REWARD_AMOUNT = 10.00; // 10 MAD Referral Bonus

      const t = await sequelize.transaction();
      try {
        // 0. Find the Marketing Wallet
        const marketingWallet = await Wallet.findOne({ where: { label: 'GINI_MARKETING' }, transaction: t });
        if (marketingWallet) {
          await marketingWallet.decrement('balance', { by: REWARD_AMOUNT, transaction: t });
        }

        // 1. Add reward to referrer's wallet
        await Wallet.increment('balance', { 
          by: REWARD_AMOUNT, 
          where: { id: referrer.Wallet.id },
          transaction: t 
        });

        // 2. Record as COMMISSION/REFERRAL type
        await Transaction.create({
          amount: REWARD_AMOUNT,
          type: 'COMMISSION',
          status: 'SETTLED',
          WalletId: referrer.Wallet.id,
          reference: `REF-BONUS-${newUserId}`,
          providerName: 'GINI_GROWTH'
        }, { transaction: t });

        await t.commit();
        console.log(`[ReferralService] Successfully paid ${REWARD_AMOUNT} MAD bonus to Referrer ${referrer.id}`);
      } catch (err) {
        await t.rollback();
        throw err;
      }
    } catch (err) {
      console.error('[ReferralService] Error processing referral reward:', err.message);
    }
  }
}

module.exports = new ReferralService();
