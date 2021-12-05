var express = require('express');
var router = express.Router();

var principalController = require('../controllers/principalController');

/* GET Principal. */
router.get('/', principalController.principal);

module.exports = router;
