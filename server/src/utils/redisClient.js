const Redis = require('ioredis');

// Connect to Redis. In production, this would use a URL from environment variables.
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redisClient.on('error', (err) => {
  console.error('[Redis Error]', err);
});

redisClient.on('connect', () => {
  console.log('[Redis] Connected successfully.');
});

module.exports = redisClient;
