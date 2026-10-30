require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const autores = require('./routes/autores');
const prestamos = require('./routes/prestamos');
const { login } = require('./controllers/authController');
const validarLogin = require('./validators/login');
const { validationResult } = require('express-validator');
const manejadorErrores = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Biblioteca activa y en línea',
    documentacion: '/api-docs',
    endpoints: [
      'POST /api/login',
      'GET /api/autores',
      'POST /api/autores',
      'PUT /api/autores/:id',
      'DELETE /api/autores/:id',
      'PUT /api/prestamos/:id/devolver'
    ]
  });
});

const revisarLogin = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });
  next();
};

app.post('/api/login', validarLogin, revisarLogin, login);
app.use('/api/autores', autores);
app.use('/api/prestamos', prestamos);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load(path.join(__dirname, 'swagger.yaml'))));
app.use(manejadorErrores);

if (require.main === module) {
  const puerto = process.env.PORT || process.env.PUERTO || 3000;
  app.listen(puerto, () => console.log(`Servidor en puerto ${puerto}`));
}

module.exports = app;
