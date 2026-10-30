const pool = require('../config/db');

const listar = async (req, res, next) => {
  try {
    const [filas] = await pool.execute('SELECT * FROM autores');
    res.json(filas);
  } catch (error) { next(error); }
};

const crear = async (req, res, next) => {
  const { nombre, nacionalidad } = req.body;
  try {
    const [repetido] = await pool.execute('SELECT id FROM autores WHERE nombre = ?', [nombre]);
    if (repetido.length) return res.status(409).json({ mensaje: 'El autor ya existe.' });
    const [resultado] = await pool.execute(
      'INSERT INTO autores (nombre, nacionalidad) VALUES (?, ?)',
      [nombre, nacionalidad]
    );
    res.status(201).json({ id: resultado.insertId, nombre, nacionalidad });
  } catch (error) { next(error); }
};

const actualizar = async (req, res, next) => {
  const { nombre, nacionalidad } = req.body;
  try {
    const [resultado] = await pool.execute(
      'UPDATE autores SET nombre = ?, nacionalidad = ? WHERE id = ?',
      [nombre, nacionalidad, req.params.id]
    );
    if (!resultado.affectedRows) return res.status(404).json({ mensaje: 'Autor no encontrado.' });
    res.json({ mensaje: 'Autor actualizado correctamente.' });
  } catch (error) { next(error); }
};

const eliminar = async (req, res, next) => {
  try {
    const [resultado] = await pool.execute('DELETE FROM autores WHERE id = ?', [req.params.id]);
    if (!resultado.affectedRows) return res.status(404).json({ mensaje: 'Autor no existe.' });
    res.json({ mensaje: 'Autor eliminado.' });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.code === 'ER_ROW_IS_REFERENCED') {
      return res.status(400).json({ mensaje: 'No se puede eliminar: el autor tiene libros asociados.' });
    }
    next(error);
  }
};

module.exports = { listar, crear, actualizar, eliminar };
