const logger = require('../utils/logger');

/**
 * Logging Middleware
 * Masks sensitive data in logs and utilizes Winston for structured logging.
 */
const loggingMiddleware = (req, res, next) => {
  const mask = (str) => {
    if (!str || typeof str !== 'string') return str;
    if (str.length <= 4) return '****';
    return '*****' + str.slice(-4);
  };

  const body = { ...req.body };
  
  // Sensitive fields to mask
  const sensitiveFields = ['nationalId', 'phone', 'phoneNumber', 'password', 'bankAccount', 'selfie', 'images'];
  
  sensitiveFields.forEach(field => {
    if (body[field]) body[field] = mask(body[field]);
  });

  logger.info(`${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    body: Object.keys(body).length ? body : undefined,
    user: req.user ? req.user.id : 'anonymous',
    ip: req.ip,
    timestamp: new Date()
  });

  next();
};

module.exports = loggingMiddleware;
