var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const adminsController = require("../controllers/adminControllers");
const  checkAuth  = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Rotas relacionadas ao painel de controle do administrador
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Exibe o painel de controlos do administrador
 *     security:
 *       - bearerAuth: []
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Painel de controle do administrador exibido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get('/',checkAuth, adminsController.admin_dashboard_get);

module.exports = router;
