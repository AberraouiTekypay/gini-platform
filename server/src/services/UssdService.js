const User = require('../models/user');
const Wallet = require('../models/wallet');
const logger = require('../utils/logger');

/**
 * USSD & Offline Gateway Service
 * Maps *123# style telco commands to Gini API logic.
 */
class UssdService {
  /**
   * Processes a USSD request from a Telco gateway.
   * @param {string} phoneNumber - The user's phone number.
   * @param {string} text - The input sequence (e.g., "", "1", "1*200").
   */
  async handleUssdRequest(phoneNumber, text) {
    // 1. Authenticate user by phone (Mock: in production, use a secure telco bind)
    // Note: We'll search for user with this phone.
    // For simulation, we'll assume the phone is passed directly.
    const user = await User.findOne({ where: { isBlocked: false }, include: Wallet }); 
    if (!user) return "END Error: User not found or blocked.";

    const levels = text.split('*');
    const input = levels[levels.length - 1];

    // USSD Menu State Machine
    if (text === "") {
      return `CON Welcome to Gini Offline
1. Check Balance
2. Agent Cash-Out
3. My Referral Code`;
    }

    if (text === "1") {
      return `END Your Gini balance is: ${user.Wallet.balance} MAD`;
    }

    if (text === "2") {
      return `CON Enter Amount to Cash-Out:`;
    }

    if (text.startsWith("2*")) {
      const amount = levels[1];
      return `END Cash-Out request for ${amount} MAD initiated. Please visit the nearest Gini Agent.`;
    }

    if (text === "3") {
      return `END Your Referral Code is: ${user.referralCode || 'N/A'}`;
    }

    return "END Invalid selection.";
  }
}

module.exports = new UssdService();
