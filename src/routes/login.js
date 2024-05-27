var express = require('express');
var router = express.Router();
const loginController=require('../controllers/loginController');
/* GET home page. */





router.get('/', function (req, res) {
  res.render('login/logins',{error:''});
});

/**
 * @swagger
 * /login/api:
 *   post:
 *     summary: Rota para login 
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
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: <JWT token>
 *       401:
 *         description: Unauthorized, incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/api',loginController.login_session_json);
router.post('/',loginController.login_session);
  

module.exports = router;
