/**
 * @module userRoutes
 */

const express = require('express');
const router = express.Router();
const db_utils = require('../../config/db_utils');
// const rolesMiddleware = require('../middlewares/rolesMiddleware');

/**
 * GET /users
 * Route pour récupérer la liste des utilisateurs.
 * @name GET /users
 * @function
 * @memberof module:userRoutes
 */
router.get('/', db_utils.main);

module.exports = router;