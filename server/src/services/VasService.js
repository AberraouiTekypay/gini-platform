// server/src/services/VasService.js
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const { sequelize } = require('../models');
const AlertService = require('./AlertService');

/**
 * Value Added Services (VAS)
 * Handles Bill Payments, Airtime, and Digital Goods.
 */
class VasService {
  /**
   * Processes a bill payment (e.g., Lydec, ONE).
   */
  async payBill(userId, data) {
    const { biller, accountRef, amount } = data;
    console.log(`[VAS] Processing ${biller} bill payment for User ${userId}...`);

    const t = await sequelize.transaction();
    try {
      const wallet = await Wallet.findOne({ where: { UserId: userId }, transaction: t });
      if (!wallet || wallet.balance < amount) throw new Error('Insufficient balance for bill payment.');

      await wallet.decrement('balance', { by: amount, transaction: t });

      const tx = await Transaction.create({
        amount,
        type: 'purchase',
        status: 'SETTLED',
        WalletId: wallet.id,
        reference: `BILL-${biller.toUpperCase()}-${Date.now()}`,
        providerName: 'FATOURATI_AGGREGATOR',
        providerReference: accountRef
      }, { transaction: t });

      await t.commit();

      // Push Notification
      await AlertService.sendPushNotification(userId, 'Payment Successful 🧾', `Your payment of ${amount} MAD to ${biller} was successful.`);

      return { success: true, transactionId: tx.reference };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  /**
   * Processes Airtime top-ups.
   */
  async rechargeAirtime(userId, data) {
    const { operator, phoneNumber, amount } = data;
    console.log(`[VAS] Top-up ${operator} for ${phoneNumber}...`);
    // Logic similar to payBill
    return { success: true, message: 'Airtime recharge initiated.' };
  }
}

module.exports = new VasService();
