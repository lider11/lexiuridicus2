USE lexiuridicus;

ALTER TABLE clients
  ADD COLUMN urgency ENUM('baja', 'media', 'alta') NOT NULL DEFAULT 'media' AFTER legal_need,
  ADD COLUMN privacy_accepted BOOLEAN NOT NULL DEFAULT TRUE AFTER status;
