const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('numSerie').notEmpty().withMessage('Debe ingresar el número de serie del equipo'),
  body('tipo').notEmpty().withMessage('Debe elegir el tipo de equipo'),
  body('marca').notEmpty().withMessage('Debe ingresar la marca del equipo'),
  body('modelo').notEmpty().withMessage('Debe ingresar el modelo del equipo'),
  body('numInventario').notEmpty().withMessage('Debe ingresar el número de inventario del equipo'),
  body('imagen').custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];

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