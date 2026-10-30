const jwt = require('jsonwebtoken');
require('dotenv').config();

const autenticar = (req, res, next) => {
  const encabezado = req.headers.authorization;
  if (!encabezado) return res.status(401).json({ mensaje: 'Acceso denegado' });
  const token = encabezado.split(' ')[1];
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = autenticar;
