/**
 * Admin Authentication Middleware (AdminToken)
 * Validates the presence and value of the 'AdminToken' header for operations.
 */
const AdminToken = (req, res, next) => {
  const adminToken = req.headers['admintoken']; // Case insensitive header lookup in Express
  const expectedToken = process.env.ADMIN_SECRET_KEY || 'default-admin-secret';

  if (!adminToken || adminToken !== expectedToken) {
    return res.status(403).json({ error: 'Access Denied: Invalid AdminToken.' });
  }

  next();
};

module.exports = AdminToken;
