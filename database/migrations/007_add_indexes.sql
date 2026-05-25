USE lexiuridicus;

CREATE INDEX idx_clients_status_created ON clients(status, created_at);
CREATE INDEX idx_clients_urgency ON clients(urgency);
CREATE INDEX idx_blog_posts_status_published ON blog_posts(status, published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_comments_status_created ON blog_comments(status, created_at);
CREATE INDEX idx_blog_comments_post_status ON blog_comments(post_id, status);
