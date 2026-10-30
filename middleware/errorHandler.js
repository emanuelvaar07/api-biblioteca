const manejadorErrores = (err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || 500).json({
    mensaje: err.statusCode ? err.message : 'Error interno del servidor'
  });
};

module.exports = manejadorErrores;
