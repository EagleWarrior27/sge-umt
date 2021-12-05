const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('id').notEmpty().withMessage('Debe ingresar su número de becario'),
  body('nombre').notEmpty().withMessage('Debe ingresar su nombre'),
  body('contrasenia').notEmpty().withMessage('Debe ingresar su contraseña'),
  body('imagen').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jfif'];

    if (!file) {
        throw new Error('Tienes que subir una imagen');
    } else {
        let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
    }

    return true;
  })
]