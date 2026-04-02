// server/src/Controllers/walletController.js
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const User = require('../models/user');
const BankingProvider = require('../providers/BankingProvider');
const { Op } = require('sequelize');

/**
 * Wallet Controller for managing user balances and fund transfers.
 */
const walletController = {
  /**
   * Fetch current wallet balance.
   */
  getBalance: async (req, res) => {
    try {
      const wallet = await Wallet.findOne({ where: { UserId: req.user.id } });
      if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
      res.json(wallet);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Check spending limits.
   */
  checkLimits: async (user, amount) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const wallet = await Wallet.findOne({ where: { UserId: user.id } });
    if (!wallet) throw new Error('Wallet not found');

    const dailyTotal = await Transaction.sum('amount', {
      where: {
        WalletId: wallet.id,
        createdAt: { [Op.gte]: startOfDay },
        status: 'SETTLED'
      }
    }) || 0;

    const monthlyTotal = await Transaction.sum('amount', {
      where: {
        WalletId: wallet.id,
        createdAt: { [Op.gte]: startOfMonth },
        status: 'SETTLED'
      }
    }) || 0;

    if (dailyTotal + amount > user.dailyLimit) {
      throw new Error(`Daily limit exceeded. Remaining: ${user.dailyLimit - dailyTotal}`);
    }

    if (monthlyTotal + amount > user.monthlyLimit) {
      throw new Error(`Monthly limit exceeded. Remaining: ${user.monthlyLimit - monthlyTotal}`);
    }

    return true;
  },

  /**
   * Deposit funds via BankingProvider.
   */
  depositFunds: async (req, res) => {
    const { amount } = req.body;
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Enforce limits (Simulated as a spending operation for this check)
      await walletController.checkLimits(user, amount);

      const wallet = await Wallet.findOne({ where: { UserId: user.id } });
      if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

      // Call the Banking Provider to process the deposit.
      const bankTx = await BankingProvider.deposit(wallet.id, amount);

      if (bankTx.success) {
        await wallet.increment('balance', { by: amount });
        
        const tx = await Transaction.create({
          amount,
          type: 'deposit',
          status: 'SETTLED',
          WalletId: wallet.id,
          reference: bankTx.transactionId,
          providerName: bankTx.provider,
          providerReference: bankTx.transactionId
        });

        res.json({ message: 'Funds deposited successfully', wallet, transaction: tx });
      } else {
        res.status(400).json({ error: 'Banking provider failed' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = walletController;
