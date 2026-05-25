CREATE DATABASE IF NOT EXISTS lexiuridicus
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lexiuridicus;

CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(180) NOT NULL,
  company VARCHAR(180) NOT NULL,
  role VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  legal_need VARCHAR(220) NOT NULL,
  business_goal VARCHAR(220) NOT NULL,
  shareholder_context VARCHAR(120) NULL,
  urgency ENUM('baja', 'media', 'alta') NOT NULL DEFAULT 'media',
  status ENUM('nuevo', 'contactado', 'en_proceso', 'cerrado') NOT NULL DEFAULT 'nuevo',
  privacy_accepted BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT NULL,
  internal_notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(240) NOT NULL UNIQUE,
  category VARCHAR(120) NOT NULL DEFAULT 'Gobierno corporativo',
  excerpt VARCHAR(320) NOT NULL,
  content LONGTEXT NOT NULL,
  author VARCHAR(120) NOT NULL DEFAULT 'Lexiuridicus',
  status ENUM('borrador', 'publicado') NOT NULL DEFAULT 'borrador',
  published_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  author_name VARCHAR(140) NOT NULL,
  author_email VARCHAR(180) NOT NULL,
  comment TEXT NOT NULL,
  status ENUM('pendiente', 'aprobado', 'rechazado') NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_blog_comments_post
    FOREIGN KEY (post_id) REFERENCES blog_posts(id)
    ON DELETE CASCADE
);

INSERT INTO blog_posts (title, slug, category, excerpt, content, author, status, published_at)
VALUES
  (
    'Como preparar la empresa para inversionistas',
    'como-preparar-la-empresa-para-inversionistas',
    'Imagen empresarial',
    'Una guia breve para revisar estructura, documentos y mensajes antes de presentar la empresa.',
    'Antes de hablar con inversionistas conviene ordenar informacion societaria, decisiones internas, documentos clave y narrativa corporativa. Una empresa clara transmite menos riesgo y facilita conversaciones de confianza.',
    'Equipo Lexiuridicus',
    'publicado',
    NOW()
  ),
  (
    'Por que la tradicion de acciones importa en una sociedad',
    'por-que-la-tradicion-de-acciones-importa-en-una-sociedad',
    'Tradicion de acciones',
    'La trazabilidad accionaria puede prevenir conflictos entre socios y mejorar seguridad juridica.',
    'La tradicion de acciones permite entender quien tiene la titularidad, como se transfirio y que soportes existen. Cuando esta historia no es clara, la empresa puede enfrentar dudas de socios, compradores o inversionistas.',
    'Equipo Lexiuridicus',
    'publicado',
    NOW()
  )
ON DUPLICATE KEY UPDATE title = VALUES(title);
