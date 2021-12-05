const express = require('express');
const router = express.Router();

// Controller
const alumnoController = require('../controllers/alumnoController');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const validateAlumnoMiddleware = require('../middlewares/registro/validateAlumnoMiddleware');

// Formulario de registro
router.get('/registro', authMiddleware, alumnoController.registro);
// Procesamiento de registro
router.post('/registro', validateAlumnoMiddleware, alumnoController.registroProcesamiento);

module.exports = router;