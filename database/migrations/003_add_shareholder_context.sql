USE lexiuridicus;

ALTER TABLE clients
  ADD COLUMN shareholder_context VARCHAR(120) NULL AFTER business_goal;
