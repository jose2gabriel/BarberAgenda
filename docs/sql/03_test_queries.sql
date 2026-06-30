-- ================================================
-- Barber Agenda — 03: Consultas de Teste
-- Use para validar a implementação do banco.
-- ================================================

-- 1. Verificar conflito de horário antes de agendar
SELECT id FROM appointments
WHERE professional_id = $1
  AND date = $2
  AND status = 'agendado'
  AND start_time < $4
  AND end_time   > $3;

-- 2. Buscar horário de funcionamento de uma barbearia
SELECT open_time, close_time
FROM business_hours
WHERE barbershop_id = $1
  AND day_of_week = EXTRACT(DOW FROM $2::DATE);

-- 3. Listar agendamentos do cliente autenticado
SELECT a.date, a.start_time, a.end_time, a.status,
       s.name AS servico, u.name AS profissional
FROM appointments a
JOIN services      s ON s.id = a.service_id
JOIN professionals p ON p.id = a.professional_id
JOIN users         u ON u.id = p.user_id
WHERE a.client_id = $1
ORDER BY a.date, a.start_time;

-- 4. Listar profissionais de uma barbearia com seus serviços
SELECT u.name AS profissional, s.name AS servico, s.price, s.duration_minutes
FROM professionals p
JOIN users                u  ON u.id  = p.user_id
JOIN professional_services ps ON ps.professional_id = p.id
JOIN services              s  ON s.id = ps.service_id
WHERE p.barbershop_id = $1;
