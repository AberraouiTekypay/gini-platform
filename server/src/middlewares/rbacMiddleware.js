/**
 * RBAC Middleware
 * Validates user roles for specific operations.
 * 
 * @param {Array<string>} roles - The roles allowed to access the route.
 */
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: `Access Denied: Requires one of the following roles: ${roles.join(', ')}` });
    }
    next();
  };
};

module.exports = checkRole;
