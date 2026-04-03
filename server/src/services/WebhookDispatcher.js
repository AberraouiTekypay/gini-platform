const crypto = require('crypto');
const axios = require('axios');
const { webhookQueue } = require('./QueueService');
const logger = require('../utils/logger');

/**
 * Merchant Webhook Dispatcher
 * Securely notifies external merchants of payment settlements.
 */
class WebhookDispatcher {
  /**
   * Dispatches a signed webhook to a merchant.
   * @param {string} url - Merchant's callback URL.
   * @param {Object} payload - Data to send.
   * @param {string} secret - Merchant's secret key for signing.
   */
  async dispatch(url, payload, secret) {
    const timestamp = Date.now().toString();
    const body = JSON.stringify(payload);
    
    // Create HMAC Signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(timestamp + body);
    const signature = hmac.digest('hex');

    logger.info(`[WebhookDispatcher] Queueing webhook for ${url}`);

    // Use BullMQ for resilience
    await webhookQueue.add('merchant-callback', {
      url,
      payload,
      headers: {
        'X-Gini-Signature': signature,
        'X-Gini-Timestamp': timestamp,
        'Content-Type': 'application/json'
      }
    }, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 2000 }
    });
  }
}

module.exports = new WebhookDispatcher();
