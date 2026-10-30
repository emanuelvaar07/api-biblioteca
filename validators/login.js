const { body } = require('express-validator');

const validarLogin = [
  body('correo').isEmail().withMessage('El correo no es válido'),
  body('clave').notEmpty().withMessage('La clave es obligatoria')
];

module.exports = validarLogin;
