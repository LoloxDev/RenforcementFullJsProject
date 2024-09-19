/**
 * @module userRoutes
 */

const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController')
const rolesMiddleware = require('../Middlewares/rolesMiddleware');
const auth = require('../Middlewares/authMiddleware');

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

/**
 * GET /users
 * Route pour récupérer la liste des utilisateurs.
 * @name GET /getUsers
 * @function
 * @memberof module:userRoutes
 */
router.get('/getUsers', auth, rolesMiddleware(['admin', 'super']), userController.getUsers);

/**
 * DELETE /deleteUser/:email
 * Route pour inscrire un nouvel utilisateur.
 * @name DELETE /deleteUser
 * @function
 * @memberof module:userRoutes
 */
router.delete('/deleteUser/:email', auth, rolesMiddleware(['admin', 'super']), userController.deleteUser);

/**
 * PUT /updateUser/:email
 * Route pour inscrire un nouvel utilisateur.
 * @name PUT /updateUser
 * @function
 * @memberof module:userRoutes
 */
router.put('/updateUser/:email', auth, rolesMiddleware(['admin', 'super']), userController.updateUser);



module.exports = router;