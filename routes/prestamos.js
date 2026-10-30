const express = require('express');
const autenticar = require('../middleware/auth');
const c = require('../controllers/prestamosController');
const router = express.Router();

router.put('/:id/devolver', autenticar, c.devolver);

module.exports = router;
