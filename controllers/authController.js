const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res, next) => {
  const { correo, clave } = req.body;
  try {
    const [usuarios] = await pool.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (!usuarios.length || !(await bcrypt.compare(clave, usuarios[0].clave))) {
      return res.status(401).json({ mensaje: 'Correo o clave incorrectos.' });
    }
    const usuario = usuarios[0];
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token });
  } catch (error) { next(error); }
};

module.exports = { login };
