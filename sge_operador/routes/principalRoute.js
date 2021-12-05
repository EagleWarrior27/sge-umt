const express = require('express');
const router = express.Router();

const principalController = require('../controllers/principalController');

router.get('/', principalController.principal);

module.exports = router;