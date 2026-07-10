export function somarMinutos(horaHHmm: string, minutos: number): string {
  const [h, m] = horaHHmm.split(':').map(Number)
  const totalMin = h * 60 + m + minutos
  const novaHora = Math.floor(totalMin / 60) % 24
  const novoMinuto = totalMin % 60
  return `${String(novaHora).padStart(2, '0')}:${String(novoMinuto).padStart(2, '0')}`
}

export function dataNoPassado(date: string): boolean {
  const hoje = new Date().toISOString().slice(0, 10)
  return date < hoje
}

export function diaDaSemana(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay()
}

export function hhmmParaMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function minutosParaHHmm(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
