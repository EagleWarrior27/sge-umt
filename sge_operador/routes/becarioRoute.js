const express = require('express');
const router = express.Router();

// Controller
const becarioController = require('../controllers/becarioController');

// Middlewares de Autentificación
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
// Middlewares de Multer - Subida de archivos
const multerBecarioMiddleware = require('../middlewares/multer/multerBecarioMiddleware');
// Middlewares de Validación de formularios
const validateAccesoMiddleware = require('../middlewares/validateAccesoMiddleware');
const validateBecarioMiddleware = require('../middlewares/registro/validateBecarioMiddleware');

// Formulario de acceso - becarioRegistro.ejs
router.get('/acceso', guestMiddleware, becarioController.acceso);
// Procesamiento de acceso
router.post('/acceso', validateAccesoMiddleware, becarioController.accesoProcesamiento);
// Formulario de registro
router.get('/registro', becarioController.registro);
// Procesamiento de registro
router.post('/registro', multerBecarioMiddleware.single('imagen'), validateBecarioMiddleware, becarioController.registroProcesamiento);
// Perfil de Usuario
router.get('/perfil', authMiddleware, becarioController.perfil);
// Logout
router.get('/salida', becarioController.salida);

module.exports = router;