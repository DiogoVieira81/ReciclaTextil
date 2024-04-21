var express = require('express');
var router = express.Router();

router.get('/entities/:id', function(req, res) {
  entities.show(req, res);
});

module.exports = router;