// server/src/Controllers/walletController.js
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const BankingProvider = require('../providers/BankingProvider');

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
   * Deposit funds via BankingProvider.
   */
  depositFunds: async (req, res) => {
    const { amount } = req.body;
    try {
      const wallet = await Wallet.findOne({ where: { UserId: req.user.id } });
      if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

      // Call the Banking Provider to process the deposit.
      const bankTx = await BankingProvider.deposit(wallet.id, amount);

      if (bankTx.success) {
        await wallet.increment('balance', { by: amount });
        
        const tx = await Transaction.create({
          amount,
          type: 'deposit',
          status: 'completed',
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
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = walletController;
