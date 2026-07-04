-- ================================================
-- Barber Agenda — 04: Adicionar avatar_url
-- Execute se o banco já foi criado com 01_create_tables.sql
-- ================================================

ALTER TABLE barbershops  ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE professionals ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
