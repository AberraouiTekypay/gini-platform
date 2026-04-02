// server/src/services/SwitchService.js
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');
const { sequelize } = require('../models');

/**
 * Ecosystem Interoperability (National Switch Integration)
 * Standardizes communication with external wallets (M-Pesa, MT Cash, etc).
 */
class SwitchService {
  /**
   * Simulates an outgoing transfer to an external wallet provider.
   * @param {Object} data - Transfer details (senderId, recipientHandle, provider, amount).
   */
  async initiateInteropTransfer(data) {
    const { senderId, recipientHandle, provider, amount } = data;
    console.log(`[SwitchService] Initiating Interop Transfer to ${provider} (${recipientHandle})...`);

    const t = await sequelize.transaction();

    try {
      const wallet = await Wallet.findOne({ where: { UserId: senderId }, transaction: t });
      if (!wallet || wallet.balance < amount) throw new Error('Insufficient funds for interop transfer.');

      // 1. Deduct from local wallet
      await wallet.decrement('balance', { by: amount, transaction: t });

      // 2. Map to JSON Interop Schema (ISO 20022 compatible fields)
      const interopPayload = {
        MessageId: `GINI-SW-${Date.now()}`,
        CreationDateTime: new Date().toISOString(),
        SettlementAmount: {
          Currency: 'MAD',
          Value: amount
        },
        Creditor: {
          AccountHandle: recipientHandle,
          Provider: provider
        },
        Debtor: {
          AccountHandle: `GINI-${senderId}`,
          Provider: 'GINI_FINTECH'
        }
      };

      // 3. Record local ledger entry
      const tx = await Transaction.create({
        amount,
        type: 'transfer',
        status: 'PENDING_PARTNER',
        WalletId: wallet.id,
        reference: interopPayload.MessageId,
        providerName: provider,
        providerReference: recipientHandle
      }, { transaction: t });

      // 4. Simulate Switch Callback
      await t.commit();
      console.log(`[SwitchService] Payload sent to National Switch:`, JSON.stringify(interopPayload));
      
      return { success: true, messageId: interopPayload.MessageId };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
}

module.exports = new SwitchService();
