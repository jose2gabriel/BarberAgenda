export interface Profissional {
  id: string
  userId: string
  barbershopId: string
  specialty: string | null
  createdAt: string
}

/**
 * RF004 — dados exibidos na listagem de profissionais da barbearia.
 * Foto e serviços oferecidos ficam para quando Módulo 6 (avatares) e
 * RF014/RF015 (serviços) existirem (roadmap.md).
 */
export interface ProfissionalPublico {
  id: string
  barbershopId: string
  specialty: string | null
  createdAt: string
  name: string
}
