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
