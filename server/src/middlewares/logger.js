/**
 * Logging Middleware
 * Masks sensitive data in logs (e.g., National ID, Phone Number).
 */
const logger = (req, res, next) => {
  const mask = (str) => {
    if (!str || typeof str !== 'string') return str;
    if (str.length <= 4) return '****';
    return '*'.repeat(str.length - 4) + str.slice(-4);
  };

  const body = { ...req.body };
  
  // Sensitive fields to mask
  const sensitiveFields = ['nationalId', 'phone', 'phoneNumber', 'password', 'bankAccount'];
  
  sensitiveFields.forEach(field => {
    if (body[field]) body[field] = mask(body[field]);
  });

  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, {
    body: Object.keys(body).length ? body : undefined,
    user: req.user ? req.user.id : 'anonymous'
  });

  next();
};

module.exports = logger;
