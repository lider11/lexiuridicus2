USE lexiuridicus;

ALTER TABLE blog_posts
  ADD COLUMN category VARCHAR(120) NOT NULL DEFAULT 'Gobierno corporativo' AFTER slug;

UPDATE blog_posts
SET category = CASE
  WHEN title LIKE '%acciones%' THEN 'Tradicion de acciones'
  WHEN title LIKE '%inversion%' THEN 'Imagen empresarial'
  ELSE 'Gobierno corporativo'
END
WHERE category = 'Gobierno corporativo';
