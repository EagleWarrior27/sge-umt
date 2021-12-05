var express = require('express');
var router = express.Router();

var equiposController = require('../controllers/equiposController');

/* POST Creación de equipos - CREATE. */
router.post('/create', equiposController.create);
/* GET Lectura de equipos - READ. */
router.get('/read', equiposController.read);
/* PUT Actualización de equipos - UPDATE. */
router.put('/update/:id', equiposController.update);
/* DELETE Eliminación de equipos - DELETE. */
router.delete('/delete/:id', equiposController.delete);

/* GET Obtención de equipo - GET. */
router.get('/get/:id', equiposController.get);
/* GET Obtención de equipo por tipo - Tipo de equipo. */
router.get('/categoria/:tipo', equiposController.tipo);
/* GET Obtención de equipo por tipo - Tipo de equipo. */
router.get('/last', equiposController.last);
/* GET Obtención de equipos disponibles. */
router.get('/disponible', equiposController.disponible);
/* GET Obtención de equipos prestados. */
router.get('/prestado', equiposController.prestado);
/* PUT Actualización de disponibilidad de equipos - 'Disponible'. */
router.post('/prestamo', equiposController.prestamo);
/* PUT Actualización de disponibilidad de equipos - 'Con retraso'. */
router.put('/devolucion/:id', equiposController.devolucion);

module.exports = router;