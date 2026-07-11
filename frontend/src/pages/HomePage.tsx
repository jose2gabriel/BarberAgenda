import { Link } from 'react-router-dom'
import { Button } from '../shared/ui/Button'
import { Card } from '../shared/ui/Card'
import { Logo } from '../shared/ui/Logo'

export function HomePage() {
  return (
    <div className="min-h-screen bg-primary">
      <header className="bg-dark">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="font-bold text-lg text-white">Barber Agenda</span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="secondary" size="sm">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary max-w-2xl">
          Agende seu horário na barbearia sem complicação
        </h1>
        <p className="text-text-secondary text-lg max-w-xl">
          Escolha o profissional, o serviço e o melhor horário — tudo em poucos cliques.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button size="lg">Começar agora</Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Já tenho conta
            </Button>
          </Link>
        </div>

        <Link to="/register-barbershop" className="text-accent text-sm font-medium hover:underline">
          É dono de uma barbearia? Cadastre-se aqui
        </Link>
      </main>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-3xl mb-3">✂️</div>
          <h3 className="font-semibold text-text-primary mb-1">Escolha o profissional</h3>
          <p className="text-text-secondary text-sm">
            Veja os barbeiros disponíveis em cada barbearia e escolha o de sua preferência.
          </p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="font-semibold text-text-primary mb-1">Agende na hora</h3>
          <p className="text-text-secondary text-sm">Veja os horários livres e marque em poucos segundos.</p>
        </Card>
        <Card className="text-center">
          <div className="text-3xl mb-3">🔔</div>
          <h3 className="font-semibold text-text-primary mb-1">Fique por dentro</h3>
          <p className="text-text-secondary text-sm">Acompanhe seus agendamentos e o histórico de atendimentos.</p>
        </Card>
      </section>
    </div>
  )
}
