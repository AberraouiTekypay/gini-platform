const idempotencyStore = new Map(); // Simple in-memory store. Use Redis in production.

/**
 * Idempotency Middleware
 * Prevents double-processing of requests using a unique 'idempotency-key'.
 */
const idempotency = (req, res, next) => {
  const key = req.headers['idempotency-key'];

  if (!key) {
    return next(); // Skip if no key provided
  }

  if (idempotencyStore.has(key)) {
    console.warn(`[Idempotency] Duplicate request detected for key: ${key}`);
    return res.status(409).json({ error: 'Request already processed or in progress.', key });
  }

  // Store the key
  idempotencyStore.set(key, { timestamp: new Date(), status: 'processing' });

  // Cleanup after 1 hour
  setTimeout(() => idempotencyStore.delete(key), 3600000);

  next();
};

module.exports = idempotency;
