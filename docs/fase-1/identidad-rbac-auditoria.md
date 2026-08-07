# Incremento: identidad, RBAC y auditoría

## Alcance

- Usuarios administrativos individuales.
- Membresías por organización.
- Roles y permisos de backend con denegación por defecto.
- Sesiones opacas de ocho horas, almacenadas solo mediante hash y revocables.
- Aislamiento de clientes por `organization_id`.
- Auditoría append-only de cambios administrativos.

## Despliegue

1. Crear una copia de seguridad de MySQL.
2. Ejecutar `database/migrations/008_identity_rbac_audit.sql` en ensayo.
3. Generar el hash de la contraseña inicial:

   ```bash
   npm run admin:hash-password -- 'una-contraseña-segura'
   ```

4. Insertar el primer `admin_user`, su `organization_membership` y el rol
   `owner` mediante una operación administrativa controlada. No guardar la
   contraseña ni el token de sesión en Git.
5. Configurar `LEAD_ORGANIZATION_SLUG=lex-iuridicus`.
6. Validar inicio y cierre de sesión, lectura de clientes y una prueba negativa
   con otra organización antes de desplegar.

## Límites del incremento

- El almacenamiento del token en memoria del navegador implica que la sesión se
  pierde al recargar; evita persistirlo en `localStorage`.
- La migración debe probarse en una copia de la base Hostinger antes de
  producción.
- Blog y comentarios continúan como contenido global; la separación multiempresa
  de esos módulos queda para un incremento posterior.
