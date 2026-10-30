const express = require('express');
const { validationResult } = require('express-validator');
const validarAutor = require('../validators/autores');
const autenticar = require('../middleware/auth');
const c = require('../controllers/autoresController');
const router = express.Router();

const revisar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
};

router.get('/', c.listar);
router.post('/', autenticar, validarAutor, revisar, c.crear);
router.put('/:id', autenticar, validarAutor, revisar, c.actualizar);
router.delete('/:id', autenticar, c.eliminar);

module.exports = router;
