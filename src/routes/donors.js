var express = require("express");
var router = express.Router();
const multer=require('multer');
const path=require('path');
const donorsController = require("../controllers/donorControllers");
const  Donor=require('../models/Donor')
const uploadPath = path.join("./public", Donor.coverImageBasePath);

const  checkAuth  = require('../middleware/auth');

  //tipos de imagens que vai aceitar
  const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  
  const upload = multer({
      dest: uploadPath,
      fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
      },
    });



router.get("/create", checkAuth, donorsController.donor_create_get);
/**
 * @swagger
 * /donors/create/api:
 *   post:
 *     summary: Cria um novo doador
 *     security:
 *       - bearerAuth: []
 *     tags: [Donors]
 *     requestBody:
 *       description: Dados do doador a serem enviados
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
 *               kg:
 *                 type: number
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Doador criado com sucesso
 *       400:
 *         description: Falha ao criar o doador
 *       401:
 *         description: Não autorizado
 */
router.post("/create/api", checkAuth, upload.single("cover"), donorsController.donor_create_post_json);
router.post("/create", checkAuth, upload.single("cover"), donorsController.donor_create_post);

router.get("/update/:id", checkAuth, donorsController.donor_update_get);

/**
 * @swagger
 * /donors/update/{id}/api:
 *   post:
 *     summary: Atualiza um doador existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do doador a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados atualizados do doador a serem enviados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
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
 *               kg:
 *                 type: number
 *     responses:
 *       200:
 *         description: Doador atualizado com sucesso
 *       400:
 *         description: Falha ao atualizar o doador
 *       401:
 *         description: Não autorizado
 */
router.post("/update/:id/api", checkAuth, donorsController.donor_update_post_json);
router.post("/update/:id", checkAuth, donorsController.donor_update_post);


router.get("/delete/:id", checkAuth, donorsController.donor_delete_get);

/**
 * @swagger
 * /donors/delete/{id}/api:
 *   post:
 *     summary: Exclui um doador existente
 *     security:
 *       - bearerAuth: []
 *     tags: [Donors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do doador a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doador excluído com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/delete/:id/api", checkAuth, donorsController.donor_delete_post_json);
router.post("/delete/:id", checkAuth, donorsController.donor_delete_post);

/**
 * @swagger
 * /donors/list/api:
 *   get:
 *     summary: Lista todas os doadores
 *     security:
 *       - bearerAuth: []
 *     tags: [Donors]
 *     responses:
 *       200:
 *         description: Lista de todas os doadores recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   district:
 *                     type: string
 *                   kg:
 *                     type: number
 *                   points:
 *                     type: number
 *                   totalDonations:
 *                     type: number
 *       401:
 *         description: Não autorizado
 */

router.get("/list/api", donorsController.donor_list_json);
router.get("/list", checkAuth, donorsController.donor_list);

module.exports = router;