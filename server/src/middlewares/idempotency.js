const redisClient = require('../utils/redisClient');

/**
 * Idempotency Middleware
 * Prevents double-processing of requests using a unique 'idempotency-key'.
 */
const idempotency = async (req, res, next) => {
  const key = req.headers['idempotency-key'];

  if (!key) {
    return next(); // Skip if no key provided
  }

  const existingKey = await redisClient.get(`idempotency:${key}`);
  if (existingKey) {
    console.warn(`[Idempotency] Duplicate request detected for key: ${key}`);
    return res.status(409).json({ error: 'Request already processed or in progress.', key });
  }

  // Store the key with a 1-hour expiration
  await redisClient.set(`idempotency:${key}`, 'processing', 'EX', 3600);

  next();
};

module.exports = idempotency;
