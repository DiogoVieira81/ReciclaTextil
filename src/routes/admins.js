var express = require("express");
var router = express.Router();
const adminsController = require("../controllers/adminControllers");
const checkAuth = require('../middleware/auth');

router.get("/create", checkAuth, adminsController.admin_create_get);

/**
 * @swagger
 * /admins/create/api:
 *   post:
 *     summary: Cria um novo administrador (JSON)
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     requestBody:
 *       description: Dados do administrador a serem enviados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *   
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *       400:
 *         description: Falha ao criar o administrador
 *       401:
 *         description: Não autorizado
 */
router.post("/create/api", checkAuth, adminsController.admin_create_post_json);
router.post("/create", checkAuth, adminsController.admin_create_post);


router.get("/delete/:id", checkAuth, adminsController.admin_delete_get);

/**
 * @swagger
 * /admins/delete/{id}/api:
 *   post:
 *     summary: Exclui um administrador existente (JSON)
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do administrador a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administrador excluído com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/delete/:id/api", checkAuth, adminsController.admin_delete_post_json);
router.post("/delete/:id", checkAuth, adminsController.admin_delete_post);


router.get("/update", checkAuth, adminsController.admin_update_get);
/**
 * @swagger
 * /admins/update/api:
 *   post:
 *     summary: Atualiza um administrador existente (JSON)
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     requestBody:
 *       description: Dados do administrador a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               passwordAntiga:
 *                 type: string
 *               passwordNova:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso
 *       400:
 *         description: Falha ao atualizar o administrador
 *       401:
 *         description: Não autorizado
 */
router.post("/update/api", checkAuth, adminsController.admin_update_post_json);
router.post("/update", checkAuth, adminsController.admin_update_post);

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Rotas relacionadas a administradores
 */

/**
 * @swagger
 * /admins/list/api:
 *   get:
 *     summary: Lista todos os administradores (JSON)
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Lista de administradores recuperada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/list/api", checkAuth, adminsController.admin_list_json);
router.get("/list", checkAuth, adminsController.admin_list);

module.exports = router;
