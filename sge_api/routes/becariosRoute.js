var express = require('express');
var router = express.Router();

var becariosController = require('../controllers/becariosController');

/* POST Creación de becario - CREATE. */
router.post('/create', becariosController.create);
/* GET Lectura de becarios - READ. */
router.get('/read', becariosController.read);
/* PUT Actualización de becario - UPDATE. */
router.put('/update/:id', becariosController.update);
/* DELETE Eliminación de becario - DELETE. */
router.delete('/delete/:id', becariosController.delete);

/* GET Obtención de becario - GET. */
router.get('/get/:id', becariosController.get);
/* GET Obtención de último becario - LAST. */
router.get('/last', becariosController.last);

module.exports = router;
