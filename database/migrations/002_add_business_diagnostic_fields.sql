USE lexiuridicus;

ALTER TABLE clients
  ADD COLUMN company VARCHAR(180) NOT NULL DEFAULT '' AFTER full_name,
  ADD COLUMN role VARCHAR(120) NOT NULL DEFAULT '' AFTER company,
  ADD COLUMN business_goal VARCHAR(220) NOT NULL DEFAULT '' AFTER legal_need;
