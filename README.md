# Lexiuridicus

Sitio web y panel administrativo para promocion de servicios de abogados, gestion de clientes potenciales y administracion de blog.

## Requisitos

- Node.js 20 o superior
- MySQL 8 o compatible

## Inicio rapido

1. Instala dependencias:

```bash
npm install
```

2. Crea la base de datos:

```bash
mysql -u root -p < database/schema.sql
```

Si ya habias creado la base antes de estas mejoras de UX, aplica tambien:

```bash
mysql -u root -p < database/migrations/001_add_client_ux_fields.sql
mysql -u root -p < database/migrations/002_add_business_diagnostic_fields.sql
mysql -u root -p < database/migrations/003_add_shareholder_context.sql
mysql -u root -p < database/migrations/004_add_internal_notes.sql
mysql -u root -p < database/migrations/005_add_blog_category.sql
mysql -u root -p < database/migrations/006_create_blog_comments.sql
mysql -u root -p < database/migrations/007_add_indexes.sql
```

3. Copia variables de entorno:

```bash
cp .env.example .env
```

4. Ejecuta el proyecto:

```bash
npm run dev
```

La aplicacion queda disponible en `http://localhost:3000`.

## Rutas principales

- `/`: pagina promocional del servicio.
- `/blog`: listado publico de articulos publicados.
- `/admin`: panel de clientes y articulos.
- `/api/clients`: API para clientes.
- `/api/posts`: API para articulos del blog.
