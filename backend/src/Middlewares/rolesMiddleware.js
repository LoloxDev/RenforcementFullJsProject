const jwt = require('jsonwebtoken');
const JWT_SECRET = 'poulet';

/**
 * @module rolesMiddleware
 */

/**
 * Middleware pour restreindre l'accès aux routes en fonction des rôles des utilisateurs.
 * @param {string[]} roles - Les rôles possibles sont 'super', 'admin' et 'guest'.
 * @returns {Function}
 * @memberof module:rolesMiddleware
 */

const rolesMiddleware = (roles) => {
  return (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (roles.includes(decoded.role)) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ error: 'Accès interdit', success: false });
      }
    } catch (error) {
      res.status(403).json({ error: 'Token invalide ou expiré', success: false });
    }
  };
};

module.exports = rolesMiddleware;
