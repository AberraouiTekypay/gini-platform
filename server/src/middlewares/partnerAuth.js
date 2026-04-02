// server/src/middlewares/partnerAuth.js
const Partner = require('../models/Partner');

/**
 * Partner API Key Middleware
 * Validates the 'Partner-API-Key' header.
 */
const partnerAuth = async (req, res, next) => {
  const apiKey = req.headers['partner-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'Partner-API-Key header is missing.' });
  }

  const partner = await Partner.findOne({ where: { apiKey } });

  if (!partner) {
    return res.status(403).json({ error: 'Invalid Partner API Key.' });
  }

  req.partner = partner;
  next();
};

module.exports = partnerAuth;
