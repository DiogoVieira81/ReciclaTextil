var express = require("express");
var router = express.Router();
const multer=require('multer')
const path=require('path')
const Entity=require('../models/Entity')
const entitiesController = require("../controllers/entityControllers");
const uploadPath = path.join("./public", Entity.coverPath);
const  checkAuth  = require('../middleware/auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

 const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  
 const upload = multer({
     dest: uploadPath,
     fileFilter: (req, file, callback) => {
       callback(null, imageMimeTypes.includes(file.mimetype));
     },
   });

/**
 * @swagger
 * tags:
 *   name: Entities
 *   description: Rotas relacionadas a entidades
 */


router.get("/create",checkAuth, entitiesController.entity_create_get);
router.get("/create/api", entitiesController.entity_create_get);

/**
 * @swagger
 * /entities/create/api:
 *   post:
 *     summary: Cria uma nova entidade
 *     security:
 *       - bearerAuth: []
 *     tags: [Entities]
 *     requestBody:
 *       description: Dados da entidade a serem enviados para criar uma nova entidade
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               taxpayerNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               district:
 *                 type: string
 *               description:
 *                 type: string
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Entidade criada com sucesso
 *       400:
 *         description: Falha ao criar a entidade
 *       401:
 *         description: Não autorizado
 */
router.post("/create/api", upload.single("cover"), entitiesController.entity_create_post_json)
router.post("/create",checkAuth, upload.single("cover"), entitiesController.entity_create_post);

router.get("/update/:id",checkAuth, entitiesController.entity_update_get);
router.get("/update/:id/api", entitiesController.entity_update_get);

/**
 * @swagger
 * /entities/update/{id}/api:
 *   post:
 *     summary: Atualiza uma entidade existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da entidade a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados da entidade a serem enviados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               taxpayerNumber:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email,
 *               password:
 *                 type:string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               district:
 *                 type: string
 *               description:
 *                 type: string
 *               kg:
 *                 type: number
 *     responses:
 *       200:
 *         description: Entidade atualizada com sucesso
 *       400:
 *         description: Falha ao atualizar a entidade
 *       401:
 *         description: Não autorizado
 */
router.post("/update/:id/api", entitiesController.entity_update_post_json);
router.post("/update/:id", entitiesController.entity_update_post);

router.get("/delete/:id",checkAuth, entitiesController.entity_delete_get);
router.get("/delete/:id/api", entitiesController.entity_delete_get);

/**
 * @swagger
 * /entities/delete/{id}/api:
 *   post:
 *     summary: Exclui uma entidade existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da entidade a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entidade excluída com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/delete/:id/api",entitiesController.entity_delete_post_json);
router.post("/delete/:id",checkAuth, entitiesController.entity_delete_post);

/**
 * @swagger
 * /entities/list/api:
 *   get:
 *     summary: Lista todas as entidades
 *     security:
 *       - bearerAuth: []
 *     tags: [Entities]
 *     responses:
 *       200:
 *         description: Lista de todas as entidades recuperada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/list/api",entitiesController.entity_list_json)
router.get("/list",checkAuth, entitiesController.entity_list);

/**
 * @swagger
 * /entities/list/{id}/api:
 *   get:
 *     summary: Lista a entidade pretendida
 *     security:
 *       - bearerAuth: []
 *     tags: [Entities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da entidade
 *     responses:
 *       200:
 *         description: Entidade recuperada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 taxpayerNumber:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 district:
 *                   type: string
 *                 description:
 *                   type: string
 *                 kg:
 *                   type: number
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Entidade não encontrada
 */
router.get("/list/:id/api/",entitiesController.entity_detail);

module.exports = router;
