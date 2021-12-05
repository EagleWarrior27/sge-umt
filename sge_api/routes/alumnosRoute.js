var express = require('express');
var router = express.Router();

var alumnosController = require('../controllers/alumnosController');

/* POST Creación de alumno - CREATE. */
router.post('/create', alumnosController.create);
/* GET Lectura de alumnos - READ. */
router.get('/read', alumnosController.read);
/* PUT Actualización de alumno - UPDATE. */
router.put('/update/:id', alumnosController.update);
/* DELETE Eliminación de alumno - DELETE. */
router.delete('/delete/:id', alumnosController.delete);

/* GET Obtención de alumno - GET. */
router.get('/get/:id', alumnosController.get);
/* GET Obtención de último alumno - LAST. */
router.get('/last', alumnosController.last);

module.exports = router;
