var express = require('express');
var router = express.Router();
const loginController=require('../controllers/loginController');
/* GET home page. */




/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Rotas relacionadas ao login
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Mostra a página de login
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: Página de login recuperada com sucesso
 */

router.get('/', function (req, res) {
  res.render('login/logins',{error:''});
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica o usuário
 *     tags: [Login]
 *     requestBody:
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
 *                 format: password
 *               
 * 
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/',loginController.login_session);
  

module.exports = router;
