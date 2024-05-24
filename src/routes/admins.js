var express = require("express");
var router = express.Router();
const adminsController = require("../controllers/adminControllers");
const  checkAuth  = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Rotas relacionadas a administradores
 */

/**
 * @swagger
 * /admins/create:
 *   get:
 *     summary: Exibe o formulário de criação de administrador
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Formulário de criação de administrador exibido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/create", checkAuth,adminsController.admin_create_get);

/**
 * @swagger
 * /admins/create:
 *   post:
 *     summary: Cria um novo administrador
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
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *       400:
 *         description: Falha ao criar o administrador
 *       401:
 *         description: Não autorizado
 */
router.post("/create",checkAuth, adminsController.admin_create_post);
/**
 * @swagger
 * /admins/delete/{id}:
 *   get:
 *     summary: Exibe o formulário de exclusão de administrador
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
 *         description: Formulário de exclusão de administrador exibido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/delete/:id", checkAuth,adminsController.admin_delete_get);
/**
 * @swagger
 * /admins/delete/{id}:
 *   post:
 *     summary: Exclui um administrador existente
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
router.post("/delete/:id",checkAuth, adminsController.admin_delete_post);
/**
 * @swagger
 * /admins/delete/{id}:
 *   post:
 *     summary: Exclui um administrador existente
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
router.post("/delete/:id", checkAuth, adminsController.admin_delete_post);

/**
 * @swagger
 * /admins/update:
 *   get:
 *     summary: Exibe o formulário de atualização de administrador
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Formulário de atualização de administrador exibido com sucesso
 *       401:
 *         description: Não autorizado
 */

router.get("/update",checkAuth,adminsController.admin_update_get);
/**
 * @swagger
 * /admins/update:
 *   post:
 *     summary: Atualiza um administrador existente
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador atualizado com sucesso
 *       400:
 *         description: Falha ao atualizar o administrador
 *       401:
 *         description: Não autorizado
 */
router.post("/update",checkAuth,adminsController.admin_update_post);
/**
 * @swagger
 * /admins/list:
 *   get:
 *     summary: Lista todos os administradores
 *     security:
 *       - bearerAuth: []
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Lista de administradores recuperada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/list", checkAuth,adminsController.admin_list);


module.exports = router;