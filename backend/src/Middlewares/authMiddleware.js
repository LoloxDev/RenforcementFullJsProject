const jwt = require('jsonwebtoken');
const JWT_SECRET = 'poulet'; 

/**
 * @module authMiddleware
 */

/**
 * Middleware pour vérifier si l'utilisateur est authentifié via son jeton.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 * @memberof module:authMiddleware
*/
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = auth;
