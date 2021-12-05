var express = require('express');
var router = express.Router();

var prestamosController = require('../controllers/prestamosController');

/* POST Creación de prestamos - CREATE. */
router.post('/create', prestamosController.create);
/* GET Lectura de prestamos - READ. */
router.get('/read', prestamosController.read);
/* PUT Actualización de prestamos - UPDATE. */
router.put('/update/:id', prestamosController.update);
/* DELETE Eliminación de prestamos - DELETE. */
router.delete('/delete/:id', prestamosController.delete);
/* GET Obtención de préstamo - GET. */
router.get('/get/:id', prestamosController.get);
router.put('/devolucion/:id', prestamosController.devolucion);

router.get('/activo', prestamosController.activo);
/* POST Obtención de préstamo - Por rango. */
router.get('/devuelto', prestamosController.devuelto);
router.post('/rango', prestamosController.rango);
/* POST Obtención de préstamo - Por filtro. */
router.post('/filtro', prestamosController.filtro);

router.get('/last', prestamosController.last);
module.exports = router;
