-- ================================================
-- Barber Agenda — 02: Índices de Desempenho
-- Execute após o script 01_create_tables.sql
-- ================================================

CREATE INDEX idx_appointments_professional_date
  ON appointments(professional_id, date);

CREATE INDEX idx_appointments_client
  ON appointments(client_id);

CREATE INDEX idx_appointments_barbershop
  ON appointments(barbershop_id);

CREATE INDEX idx_professionals_barbershop
  ON professionals(barbershop_id);

CREATE INDEX idx_services_barbershop
  ON services(barbershop_id);

CREATE INDEX idx_unavailabilities_professional
  ON unavailabilities(professional_id, starts_at, ends_at);
