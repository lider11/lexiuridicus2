USE lexiuridicus;

ALTER TABLE clients
  ADD COLUMN internal_notes TEXT NULL AFTER notes;
