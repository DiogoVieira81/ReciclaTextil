
var express = require('express');
var router = express.Router();
const logoutController=require('../controllers/logoutController');
 
/**
 * @swagger
 * tags:
 *   name: Logout
 *   description: Rotas relacionadas ao logout do usuário
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Realiza o logout do usuário
 *     tags: [Logout]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get('/',logoutController.session_logout);


module.exports = router;