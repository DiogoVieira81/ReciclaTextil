var express = require("express");
var router = express.Router();
const donationController = require("../controllers/donationControllers");

const  checkAuth  = require('../middleware/auth');

router.get("/create", checkAuth,donationController.donation_create_get);
router.get("/create/api", donationController.donation_create_get);

/**
 * @swagger
 * /donations/create/api:
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
router.post("/create/api", donationController.donation_create_post_json);
router.post("/create",checkAuth,  donationController.donation_create_post);


router.get("/update/:id",checkAuth, donationController.donation_update_get);
router.get("/update/:id/api",donationController.donation_update_get);

/**
 * @swagger
 * /donations/update/{id}/api:
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
router.post("/update/:id/api", donationController.donation_update_post_json);
router.post("/update/:id",checkAuth, donationController.donation_update_post);


router.get("/delete/:id", checkAuth,donationController.donation_delete_get);
router.get("/delete/:id/api",donationController.donation_delete_get);

/**
 * @swagger
 * /donations/delete/{id}/api:
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
router.post("/delete/:id/api", donationController.donation_delete_post_json);
router.post("/delete/:id",checkAuth, donationController.donation_delete_post);

/**
 * @swagger
 * /donations/list/api:
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
router.get("/list/api", donationController.donation_list_json);
router.get("/list", checkAuth,donationController.donation_list);

/**
 * @swagger
 * /donations/calculatePoints/api:
 *   post:
 *     summary: Calcula pontos obtidos pela doação
 *     security:
 *       - bearerAuth: []
 *     tags: [Donations]
 *     requestBody:
 *       description: Dados da doação para cálculo de pontos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kg:
 *                 type: number
 *                 description: Peso da doação em quilogramas
 *                 example: 5
 *               condition:
 *                 type: string
 *                 description: Condição dos itens doados
 *                 enum: [nova, semi-nova, desgastada]
 *                 example: nova
 *     responses:
 *       200:
 *         description: Pontos calculados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: number
 *                   description: Pontos calculados com base no peso e condição da doação
 *                   example: 45
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Requisição inválida (ex. falta de parâmetros)
 */
router.post('/calculatePoints/api',donationController.donation_calculate_points_json);
router.post('/calculatePoints',checkAuth,donationController.donation_calculate_points);

module.exports = router;