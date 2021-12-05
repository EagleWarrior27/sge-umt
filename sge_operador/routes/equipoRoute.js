const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipoController');

const authMiddleware = require('../middlewares/authMiddleware');
const multerEquipoMiddleware = require('../middlewares/multer/multerEquipoMiddleware');
const validateEquipoMiddleware = require('../middlewares/registro/validateEquipoMiddleware');

router.get('/categoria/:tipo', equipoController.categoria);
router.get('/detalles/:id', authMiddleware, equipoController.detalles);
router.get('/registro', authMiddleware, equipoController.registro);
router.post('/registro', multerEquipoMiddleware.single('imagen'), validateEquipoMiddleware, equipoController.registroProcesamiento);


module.exports = router;