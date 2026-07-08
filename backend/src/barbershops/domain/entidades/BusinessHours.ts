// src/barbershops/domain/entidades/BusinessHours.ts
export interface BusinessHours {
  id: string
  barbershopId: string
  dayOfWeek: number
  openTime: string
  closeTime: string
}
