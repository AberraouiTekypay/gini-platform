// server/src/Controllers/merchantController.js
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');
const { sequelize } = require('../models');

/**
 * Public Merchant API
 * Allows external e-commerce sites to integrate Gini payments.
 */
const merchantController = {
  /**
   * Create a payment request.
   * Called by the Merchant's server.
   */
  createPaymentRequest: async (req, res) => {
    const { amount, merchantId, orderId, callbackUrl } = req.body;
    
    // In production, validate merchantId and API Key
    const paymentRef = `MERCH-PAY-${Date.now()}-${orderId}`;
    
    res.json({
      paymentUrl: `https://pay.gini.ma/checkout/${paymentRef}`,
      paymentReference: paymentRef,
      amount,
      currency: 'MAD'
    });
  },

  /**
   * Finalize payment (after customer approval in mobile app).
   */
  confirmPayment: async (req, res) => {
    const { paymentReference, customerId } = req.body;
    // Logic: Deduct from customer, add to merchant wallet, trigger callbackUrl
    res.json({ status: 'SETTLED', message: 'Merchant payment completed.' });
  }
};

module.exports = merchantController;
