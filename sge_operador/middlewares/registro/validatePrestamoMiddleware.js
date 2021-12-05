const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('matricula').notEmpty().withMessage('Debe ingresar la matrícula del alumno'),
  body('tipo').notEmpty().withMessage('Debe elegir el tipo de préstamo'),
  body('fecha').notEmpty().withMessage('Debe ingresar la fecha de devolución propuesta'),
  body('hora').notEmpty().withMessage('Debe ingresar la hora de devolución propuesta'),
]