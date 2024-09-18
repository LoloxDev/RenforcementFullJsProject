/**
 * @module userRoutes
 */

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController')
// const rolesMiddleware = require('../middlewares/rolesMiddleware');

/**
 * GET /users
 * Route pour récupérer la liste des utilisateurs.
 * @name GET /getUsers
 * @function
 * @memberof module:userRoutes
 */
router.get('/getUsers', userController.getUsers);

/**
 * POST /signup
 * Route pour inscrire un nouvel utilisateur.
 * @name POST /signup
 * @function
 * @memberof module:userRoutes
 */
router.post('/signup', userController.signup);


module.exports = router;