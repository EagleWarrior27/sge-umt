const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('matricula').notEmpty().withMessage('Debe ingresar la matrícula del alumno'),
  body('nombre').notEmpty().withMessage('Debe ingresar el nombre del alumno'),
  body('procedencia').notEmpty().withMessage('Debe ingresar la procedencia del alumno'),
]