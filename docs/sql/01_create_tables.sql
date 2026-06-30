-- ================================================
-- Barber Agenda — 01: Criação das Tabelas
-- PostgreSQL / Supabase | Silph Corp | 2026
-- Execute este script primeiro.
-- ================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── 1. USUÁRIOS ───────────────────────────────────
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(150)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  phone         VARCHAR(20)   NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  role          VARCHAR(20)   NOT NULL
                CHECK (role IN ('cliente','profissional','owner')),
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── 2. BARBEARIAS ─────────────────────────────────
CREATE TABLE barbershops (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id   UUID         NOT NULL REFERENCES users(id),
  name       VARCHAR(150) NOT NULL,
  address    VARCHAR(255) NOT NULL,
  phone      VARCHAR(20)  NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── 3. PROFISSIONAIS ──────────────────────────────
CREATE TABLE professionals (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID         NOT NULL REFERENCES users(id) UNIQUE,
  barbershop_id  UUID         NOT NULL REFERENCES barbershops(id),
  specialty      VARCHAR(100),
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── 4. SERVIÇOS ───────────────────────────────────
CREATE TABLE services (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barbershop_id    UUID           NOT NULL REFERENCES barbershops(id),
  name             VARCHAR(150)   NOT NULL,
  description      TEXT,
  duration_minutes INTEGER        NOT NULL CHECK (duration_minutes > 0),
  price            NUMERIC(10,2)  NOT NULL CHECK (price >= 0),
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- ── 5. SERVIÇOS POR PROFISSIONAL ──────────────────
CREATE TABLE professional_services (
  professional_id UUID NOT NULL REFERENCES professionals(id),
  service_id      UUID NOT NULL REFERENCES services(id),
  PRIMARY KEY (professional_id, service_id)
);

-- ── 6. HORÁRIO DE FUNCIONAMENTO ───────────────────
CREATE TABLE business_hours (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  barbershop_id UUID    NOT NULL REFERENCES barbershops(id),
  day_of_week   INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time     TIME    NOT NULL,
  close_time    TIME    NOT NULL,
  CHECK (close_time > open_time),
  UNIQUE (barbershop_id, day_of_week)
);

-- ── 7. INDISPONIBILIDADES ─────────────────────────
CREATE TABLE unavailabilities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID        NOT NULL REFERENCES professionals(id),
  starts_at       TIMESTAMPTZ NOT NULL,
  ends_at         TIMESTAMPTZ NOT NULL,
  reason          TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (ends_at > starts_at)
);

-- ── 8. AGENDAMENTOS ───────────────────────────────
CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID        NOT NULL REFERENCES users(id),
  professional_id UUID        NOT NULL REFERENCES professionals(id),
  service_id      UUID        NOT NULL REFERENCES services(id),
  barbershop_id   UUID        NOT NULL REFERENCES barbershops(id),
  date            DATE        NOT NULL,
  start_time      TIME        NOT NULL,
  end_time        TIME        NOT NULL,
  status          VARCHAR(20) NOT NULL DEFAULT 'agendado'
                  CHECK (status IN ('agendado','concluido','cancelado')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (end_time > start_time)
);

-- ── 9. RECUPERAÇÃO DE SENHA ───────────────────────
CREATE TABLE password_resets (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID         NOT NULL REFERENCES users(id),
  token      VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ  NOT NULL,
  used       BOOLEAN      NOT NULL DEFAULT FALSE
);
