var express = require("express");
var router = express.Router();
const donationController = require("../controllers/donationControllers");

const  checkAuth  = require('../middleware/auth');

router.get("/create", donationController.donation_create_get);

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
router.post("/create/api", donationController.donation_create_post_json);
router.post("/create", donationController.donation_create_post);


router.get("/update/:id", donationController.donation_update_get);

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
router.post("/update/:id", donationController.donation_update_post);


router.get("/delete/:id", donationController.donation_delete_get);

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
router.post("/delete/:id", donationController.donation_delete_post);

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
router.get("/list", donationController.donation_list);
router.post('/calculatePoints',donationController.donation_calculate_points);

module.exports = router;