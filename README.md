# Actividad 3.3 – Apropiación

Esta carpeta contiene la parte de seguridad y documentación de la API.

## Lo que incluye

- Validaciones con `express-validator` en login y autores.
- Middleware central para manejar errores.
- Login con JWT.
- Protección de las rutas de autores y préstamos.
- Documentación Swagger disponible en `/api-docs`.

## Instalación

Desde la carpeta `codigo` ejecutar:

```bash
npm install
npm start
```


La documentación queda en:

```text
http://localhost:3000/api-docs
```

## Login

```json
{
  "correo": "usuario@correo.com",
  "clave": "123456"
}
```

El token recibido se usa en las rutas protegidas con:

```text
Authorization: Bearer TOKEN
```
