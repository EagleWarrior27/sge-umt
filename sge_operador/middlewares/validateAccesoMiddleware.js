const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('becario').notEmpty().withMessage('Debe ingresar un número de becario'),
  body('contrasenia').notEmpty().withMessage('Debe ingresar la contraseña'),
]