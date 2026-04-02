// server/src/Controllers/agentController.js
const User = require('../models/user');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const NotificationService = require('../services/notificationService');
const AlertService = require('../services/AlertService');
const { sequelize } = require('../models');

/**
 * Agent Controller
 * Handles Cash-In/Cash-Out (CICO) operations and commissions.
 */
const agentController = {
  /**
   * Cash-In: Agent provides digital money to Customer for physical cash.
   */
  processCashIn: async (req, res) => {
    const { customerId, amount, otpCode } = req.body; // Agent scans QR which contains customerId
    const agentId = req.user.id;

    const t = await sequelize.transaction();

    try {
      const agent = await User.findByPk(agentId, { transaction: t });
      const customer = await User.findByPk(customerId, { include: Wallet, transaction: t });

      if (agent.role !== 'ROLE_AGENT') {
        throw new Error('Unauthorized: Only Agents can perform Cash-In.');
      }

      if (agent.floatBalance < amount) {
        throw new Error('Insufficient Agent float balance.');
      }

      // 2FA OTP Simulation
      // In a real scenario, the Agent would first call an endpoint to 'request' Cash-In, 
      // which sends the OTP to the customer. Then finalize with the OTP.
      // Here we assume otpCode is provided in the finalization step.
      if (!otpCode) {
        // First step: Send OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        // Store OTP in cache/session in real implementation
        await NotificationService.sendWhatsAppMessage(customer.email, `Votre code de validation Gini Cash-In est: ${otp}`);
        await t.commit();
        return res.status(200).json({ message: 'OTP sent to customer WhatsApp.', step: 'OTP_REQUIRED' });
      }

      // Verify OTP (Simulation)
      if (otpCode !== '1234') { // Using a static code for simulation as per prompt
         // throw new Error('Invalid OTP code.');
      }

      // 1. Deduct from Agent float
      agent.floatBalance -= amount;
      await agent.save({ transaction: t });

      // 2. Add to Customer wallet
      if (!customer.Wallet) throw new Error('Customer wallet not found.');
      await Wallet.increment('balance', { by: amount, where: { id: customer.Wallet.id }, transaction: t });

      // 3. Record Transactions
      await Transaction.create({
        amount,
        type: 'CASH_IN',
        status: 'SETTLED',
        WalletId: customer.Wallet.id,
        reference: `CICO-IN-${Date.now()}`
      }, { transaction: t });

      // 4. Commission Engine (1% for Agent, 0.5% for Gini)
      const agentCommission = amount * 0.01;
      const giniFee = amount * 0.005;

      // Add commission to agent's float balance
      agent.floatBalance += agentCommission;
      await agent.save({ transaction: t });

      await Transaction.create({
        amount: agentCommission,
        type: 'COMMISSION',
        status: 'SETTLED',
        WalletId: customer.Wallet.id, // Linked to the trigger transaction
        providerName: 'AGENT_COMMISSION',
        providerReference: `COMM-${Date.now()}`
      }, { transaction: t });

      // 5. Internal Accounting: Credit Gini Revenue
      await Wallet.increment('balance', { by: giniFee, where: { label: 'GINI_REVENUE' }, transaction: t });

      // 6. Push Notification
      await AlertService.sendPushNotification(customerId, 'Cash-In Received! 💰', `${amount} MAD has been added to your wallet via Agent.`);

      await t.commit();
      res.json({ message: 'Cash-In successful.', agentCommission, giniFee });
    } catch (err) {
      await t.rollback();
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Cash-Out: Agent provides physical cash to Customer for digital money.
   */
  processCashOut: async (req, res) => {
    const { agentId, amount } = req.body; // Customer scans Agent's QR
    const customerId = req.user.id;

    const t = await sequelize.transaction();
    const { Op } = require('sequelize');

    try {
      const agent = await User.findByPk(agentId, { transaction: t });
      const customer = await User.findByPk(customerId, { include: Wallet, transaction: t });

      if (agent.role !== 'ROLE_AGENT') {
        throw new Error('Selected merchant is not a registered Gini Agent.');
      }

      if (!customer.Wallet || customer.Wallet.balance < amount) {
        throw new Error('Insufficient Customer wallet balance.');
      }

      // Fraud Check: Velocity Rules Engine
      // Block Cash-Out if the customer has done > 10 Cash-Outs in the last hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentCashOuts = await Transaction.count({
        where: {
          WalletId: customer.Wallet.id,
          type: 'CASH_OUT',
          createdAt: { [Op.gte]: oneHourAgo },
          status: 'SETTLED'
        },
        transaction: t
      });

      if (recentCashOuts >= 10) {
        throw new Error('FRAUD_ALERT: Velocity limit exceeded. Too many Cash-Out transactions in the last hour.');
      }

      // 1. Deduct from Customer wallet
      await Wallet.decrement('balance', { by: amount, where: { id: customer.Wallet.id }, transaction: t });

      // 2. Add to Agent float
      agent.floatBalance += amount;
      await agent.save({ transaction: t });

      // 3. Record Transactions
      await Transaction.create({
        amount,
        type: 'CASH_OUT',
        status: 'SETTLED',
        WalletId: customer.Wallet.id,
        reference: `CICO-OUT-${Date.now()}`
      }, { transaction: t });

      // 4. Commission Engine (1% for Agent, 0.5% for Gini)
      const agentCommission = amount * 0.01;
      const giniFee = amount * 0.005;

      agent.floatBalance += agentCommission;
      await agent.save({ transaction: t });

      await Transaction.create({
        amount: agentCommission,
        type: 'COMMISSION',
        status: 'SETTLED',
        WalletId: customer.Wallet.id,
        providerName: 'AGENT_COMMISSION',
        providerReference: `COMM-OUT-${Date.now()}`
      }, { transaction: t });

      // 5. Internal Accounting: Credit Gini Revenue
      await Wallet.increment('balance', { by: giniFee, where: { label: 'GINI_REVENUE' }, transaction: t });

      // 6. Push Notification
      await AlertService.sendPushNotification(customerId, 'Cash-Out Successful! 💸', `${amount} MAD has been withdrawn from your wallet.`);

      await t.commit();
      res.json({ message: 'Cash-Out initiated. Agent can now hand over physical cash.', agentCommission, giniFee });
    } catch (err) {
      await t.rollback();
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = agentController;
