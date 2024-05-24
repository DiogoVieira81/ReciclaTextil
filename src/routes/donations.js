var express = require("express");
var router = express.Router();
const donationController = require("../controllers/donationControllers");

const  checkAuth  = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Rotas relacionadas a doações
 */

/**
 * @swagger
 * /donations/create:
 *   get:
 *     summary: Exibe o formulário de criação de doação
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: Formulário de criação de doação exibido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/create", checkAuth, donationController.donation_create_get);

/**
 * @swagger
 * /donations/create:
 *   post:
 *     summary: Cria uma nova doação
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     requestBody:
 *       description: Dados da doação a serem enviados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numberOfParts:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 1000
 *               condition:
 *                 type: string
 *                 enum: [desgastada, semi-nova, nova]
 *               kg:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 1000
 *     responses:
 *       201:
 *         description: Doação criada com sucesso
 *       400:
 *         description: Falha ao criar a doação
 *       401:
 *         description: Não autorizado
 */
router.post("/create", checkAuth, donationController.donation_create_post);

/**
 * @swagger
 * /donations/update/{id}:
 *   get:
 *     summary: Exibe o formulário de atualização de doação
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da doação a ser atualizada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulário de atualização de doação exibido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/update/:id", checkAuth, donationController.donation_update_get);

/**
 * @swagger
 * /donations/update/{id}:
 *   post:
 *     summary: Atualiza uma doação existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da doação a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados da doação a serem enviados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numberOfParts:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 1000
 *               condition:
 *                 type: string
 *                 enum: [desgastada, semi-nova, nova]
 *               kg:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 1000
 *     responses:
 *       200:
 *         description: Doação atualizada com sucesso
 *       400:
 *         description: Falha ao atualizar a doação
 *       401:
 *         description: Não autorizado
 */
router.post("/update/:id", checkAuth, donationController.donation_update_post);

/**
 * @swagger
 * /donations/delete/{id}:
 *   get:
 *     summary: Exibe o formulário de exclusão de doação
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da doação a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulário de exclusão de doação exibido com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/delete/:id", checkAuth, donationController.donation_delete_get);

/**
 * @swagger
 * /donations/delete/{id}:
 *   post:
 *     summary: Exclui uma doação existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da doação a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doação excluída com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/delete/:id", checkAuth, donationController.donation_delete_post);

/**
 * @swagger
 * /donations/list:
 *   get:
 *     summary: Lista todas as doações
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     responses:
 *       200:
 *         description: Lista de todas as doações recuperada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/list", checkAuth, donationController.donation_list);

/**
 * @swagger
 * /donations/calculatePoints:
 *   post:
 *     summary: Calcula os pontos para uma doação
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     requestBody:
 *       description: Dados da doação para calcular pontos
 *       required: true
 *       content:
 *         application/json:
 */       

module.exports = router;