/**
 * @module userRoutes
 */

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController')
// const rolesMiddleware = require('../middlewares/rolesMiddleware');
const auth = require('../Middlewares/authMiddleware');

/**
 * GET /users
 * Route pour récupérer la liste des utilisateurs.
 * @name GET /getUsers
 * @function
 * @memberof module:userRoutes
 */
router.get('/getUsers', auth, userController.getUsers);

/**
 * POST /login
 * Route qu'un utilisateur se connecte.
 * @name post /login
 * @function
 * @memberof module:userRoutes
 */
router.post('/login', userController.login);

/**
 * POST /signup
 * Route pour inscrire un nouvel utilisateur.
 * @name POST /signup
 * @function
 * @memberof module:userRoutes
 */
router.post('/signup', userController.signup);


module.exports = router;