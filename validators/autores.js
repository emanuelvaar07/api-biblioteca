const { body } = require('express-validator');

const validarAutor = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio').trim(),
  body('nacionalidad').notEmpty().withMessage('La nacionalidad es obligatoria').trim()
];

module.exports = validarAutor;
