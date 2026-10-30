const pool = require('../config/db');

const devolver = async (req, res, next) => {
  const conexion = await pool.getConnection();
  try {
    await conexion.beginTransaction();
    const [prestamos] = await conexion.execute(
      'SELECT libro_id FROM prestamos WHERE id = ? AND fecha_devolucion IS NULL FOR UPDATE',
      [req.params.id]
    );
    if (!prestamos.length) {
      const error = new Error('El préstamo no existe o ya fue devuelto.');
      error.statusCode = 404;
      throw error;
    }
    const libroId = prestamos[0].libro_id;
    await conexion.execute('UPDATE prestamos SET fecha_devolucion = NOW() WHERE id = ?', [req.params.id]);
    await conexion.execute('UPDATE libros SET disponible = TRUE WHERE id = ?', [libroId]);
    await conexion.commit();
    res.json({ mensaje: 'Devolución registrada correctamente.' });
  } catch (error) {
    await conexion.rollback();
    next(error);
  } finally {
    conexion.release();
  }
};

module.exports = { devolver };
