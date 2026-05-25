USE lexiuridicus;

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
