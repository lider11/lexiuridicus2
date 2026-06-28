INSERT INTO blog_posts (
  title,
  slug,
  category,
  excerpt,
  content,
  author,
  status,
  published_at
)
VALUES
  (
    'Imagen empresarial: que revisa un tercero antes de confiar en tu empresa',
    'imagen-empresarial-que-revisa-un-tercero-antes-de-confiar-en-tu-empresa',
    'Imagen empresarial',
    'Los inversionistas y aliados no solo revisan cifras; tambien observan orden societario, decisiones y gobierno.',
    'La confianza empresarial se forma con multiples senales. Algunas son financieras, otras comerciales y muchas son juridicas. Un inversionista, aliado o comprador observa si la empresa tiene una estructura comprensible y si sus documentos respaldan lo que la administracion afirma.

Entre los elementos mas revisados estan la composicion accionaria, los estatutos, las actas de decisiones relevantes, la existencia de conflictos entre socios, los poderes de representacion y la forma en que se documentan los acuerdos internos.

Tambien importa la consistencia. Si la empresa dice tener una estructura, pero los documentos cuentan otra historia, aparece una alerta. Si las decisiones importantes no estan soportadas, el tercero puede interpretar que hay riesgo operativo o societario.

La imagen empresarial no consiste en aparentar perfeccion. Consiste en mostrar orden, reconocer pendientes y tener una ruta para corregirlos. Una empresa seria no es la que no tiene riesgos, sino la que sabe identificarlos y gestionarlos.

Por eso, antes de presentar la empresa ante terceros, conviene hacer una revision interna. Esta revision permite anticipar preguntas, ordenar documentos y fortalecer el relato corporativo.

El resultado es una empresa mas clara, mas confiable y mejor preparada para conversaciones estrategicas.',
    'Equipo Lexiuridicus',
    'publicado',
    NOW()
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  category = VALUES(category),
  excerpt = VALUES(excerpt),
  content = VALUES(content),
  author = VALUES(author),
  status = VALUES(status),
  published_at = COALESCE(blog_posts.published_at, VALUES(published_at));
