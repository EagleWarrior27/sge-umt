const express = require('express');
const router = express.Router();

const prestamoController = require('../controllers/prestamoController');

const authMiddleware = require('../middlewares/authMiddleware');
const validatePrestamoMiddleware = require('../middlewares/registro/validatePrestamoMiddleware');

router.get('/lista', authMiddleware, prestamoController.lista);
router.get('/registro/:id', authMiddleware, prestamoController.registro);
router.post('/registro/:equipo/:becario', validatePrestamoMiddleware, prestamoController.registroProcesamiento);
router.get('/edicion/:id', authMiddleware, prestamoController.edicion);
router.post('/edicion/:id/:becario', prestamoController.edicionProcedimiento);
router.post('/eliminacion/:id/:equipo', prestamoController.eliminacion);
router.get('/devolucion/:id', authMiddleware, prestamoController.devolucion);
router.post('/devolucion/:id/:equipo', prestamoController.devolucionProcesamiento);


module.exports = router;