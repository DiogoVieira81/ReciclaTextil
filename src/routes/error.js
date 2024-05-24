var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna a página inicial
 *     responses:
 *       200:
 *         description: Página inicial recuperada com sucesso
 */
router.get('/', function(req, res, next) {
  res.render('error');
});

module.exports = router;