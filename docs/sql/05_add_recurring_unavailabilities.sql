-- ================================================
-- Barber Agenda — 05: Indisponibilidade recorrente por dia da semana
-- Execute se o banco já foi criado com 01_create_tables.sql
--
-- Complementa `unavailabilities` (bloqueio por data/hora específica) com
-- um bloqueio que se repete toda semana num dia fixo (ex.: "nunca
-- trabalho aos domingos", "almoço todo dia às 12h") — mesmo padrão de
-- `business_hours` (day_of_week + horário), só que por profissional em
-- vez de por barbearia.
-- ================================================

CREATE TABLE IF NOT EXISTS recurring_unavailabilities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID    NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  day_of_week     INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time      TIME    NOT NULL,
  end_time        TIME    NOT NULL,
  reason          TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (end_time > start_time)
);

CREATE INDEX IF NOT EXISTS idx_recurring_unavailabilities_professional
  ON recurring_unavailabilities(professional_id, day_of_week);
