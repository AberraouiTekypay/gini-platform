/**
 * Admin Authentication Middleware
 * Validates the presence and value of the x-admin-key header.
 */
const adminAuth = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_SECRET_KEY || 'default-admin-secret';

  if (!adminKey || adminKey !== expectedKey) {
    return res.status(403).json({ error: 'Access Denied: Invalid Admin Key' });
  }

  next();
};

module.exports = adminAuth;
