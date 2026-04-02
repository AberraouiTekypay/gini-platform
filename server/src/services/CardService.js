const Card = require('../models/card');
const Wallet = require('../models/wallet');

/**
 * Card Management Service
 * Interfaces with LanaCash/HPS for card lifecycle operations.
 */
class CardService {
  /**
   * Issues a new virtual card for a user's wallet.
   * @param {number} walletId - Target wallet ID.
   */
  async issueVirtualCard(walletId) {
    console.log(`[CardService] Issuing virtual card for wallet ${walletId}...`);
    
    // 1. Generate mock card data
    const cardNumber = Array.from({length: 16}, () => Math.floor(Math.random() * 10)).join('');
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const expiry = '12/28';

    // 2. Persist in database
    const card = await Card.create({
      cardNumber,
      cvv,
      expiry,
      WalletId: walletId,
      status: 'active'
    });

    return card;
  }

  /**
   * Toggles the freeze status of a card.
   * @param {number} cardId - The ID of the card.
   */
  async toggleCardFreeze(cardId) {
    const card = await Card.findByPk(cardId);
    if (!card) throw new Error('Card not found');

    card.status = card.status === 'active' ? 'frozen' : 'active';
    await card.save();
    
    console.log(`[CardService] Card ${cardId} status changed to: ${card.status}`);
    return card;
  }
}

module.exports = new CardService();
