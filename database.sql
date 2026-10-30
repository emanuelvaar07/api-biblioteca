-- Script de creación y datos iniciales para la base de datos de la API Biblioteca

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(100) NOT NULL UNIQUE,
  clave VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  nacionalidad VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  anio INT,
  autor_id INT NOT NULL,
  disponible BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libro_id INT NOT NULL,
  usuario_id INT,
  fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_devolucion TIMESTAMP NULL DEFAULT NULL,
  FOREIGN KEY (libro_id) REFERENCES libros(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Datos iniciales de prueba
-- Contraseña para usuario@correo.com: 123456
INSERT INTO usuarios (correo, clave) VALUES
('usuario@correo.com', '$2b$10$TOJqXAtX8qI6YDqiTQcQ5upAceb/88mOnFbj/JqTu6VoVDczl3iMq')
ON DUPLICATE KEY UPDATE correo=correo;

INSERT INTO autores (nombre, nacionalidad) VALUES
('Gabriel García Márquez', 'Colombiana'),
('Mario Vargas Llosa', 'Peruana'),
('Isabel Allende', 'Chilena')
ON DUPLICATE KEY UPDATE nombre=nombre;

INSERT INTO libros (titulo, anio, autor_id, disponible) VALUES
('Cien años de soledad', 1967, 1, 1),
('El amor en los tiempos del cólera', 1985, 1, 0),
('La ciudad y los perros', 1963, 2, 1);

INSERT INTO prestamos (libro_id, usuario_id, fecha_prestamo, fecha_devolucion) VALUES
(2, 1, NOW(), NULL);
