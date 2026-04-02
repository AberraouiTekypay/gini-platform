const CardService = require('../services/CardService');
const Wallet = require('../models/wallet');

/**
 * Card Controller
 * Handles user card operations.
 */
const cardController = {
  /**
   * Request a new virtual card.
   */
  issueCard: async (req, res) => {
    try {
      const wallet = await Wallet.findOne({ where: { UserId: req.user.id } });
      if (!wallet) return res.status(404).json({ error: 'Wallet not found' });

      const card = await CardService.issueVirtualCard(wallet.id);
      res.status(201).json(card);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  /**
   * Toggle freeze/active status.
   */
  toggleFreeze: async (req, res) => {
    const { id } = req.params;
    try {
      const card = await CardService.toggleCardFreeze(id);
      res.json({ message: `Card ${card.status} successfully.`, card });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = cardController;
