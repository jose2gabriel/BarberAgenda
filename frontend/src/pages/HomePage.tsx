import { Link } from 'react-router-dom'
import { Scissors, CalendarCheck, BellRing, UserPlus, Search, CheckCircle2 } from 'lucide-react'
import { Button } from '../shared/ui/Button'
import { Card } from '../shared/ui/Card'
import { Logo } from '../shared/ui/Logo'

const FEATURES = [
  {
    icon: Scissors,
    title: 'Escolha o profissional',
    description: 'Veja os barbeiros disponíveis em cada barbearia e escolha o de sua preferência.',
  },
  {
    icon: CalendarCheck,
    title: 'Agende na hora',
    description: 'Veja os horários livres e marque em poucos segundos.',
  },
  {
    icon: BellRing,
    title: 'Fique por dentro',
    description: 'Acompanhe seus agendamentos e receba confirmação por e-mail.',
  },
]

const PASSOS = [
  { icon: UserPlus, title: 'Crie sua conta', description: 'Cadastro rápido, sem burocracia.' },
  { icon: Search, title: 'Encontre uma barbearia', description: 'Veja profissionais, serviços e preços.' },
  { icon: CheckCircle2, title: 'Confirme seu horário', description: 'Escolha o melhor horário disponível e pronto.' },
]

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

      {/* Hero */}
      <section className="bg-dark">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 bg-accent/15 text-accent text-sm font-semibold px-4 py-1.5 rounded-full border border-accent/30">
            <Scissors size={16} strokeWidth={2} />A forma mais simples de agendar seu corte
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight">
            Agende seu horário na barbearia <span className="text-accent">sem complicação</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Escolha o profissional, o serviço e o melhor horário — tudo em poucos cliques.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
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
        </div>
      </section>

      {/* Recursos */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Tudo o que você precisa</h2>
          <p className="text-text-secondary">Da escolha do profissional à confirmação, em um só lugar.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                <feature.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-secondary">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Como funciona</h2>
            <p className="text-text-secondary">Três passos e pronto.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PASSOS.map((passo, index) => (
              <div key={passo.title} className="flex flex-col items-center text-center gap-3">
                <div className="relative w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center">
                  <passo.icon size={24} strokeWidth={1.75} />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-dark text-white text-xs font-bold flex items-center justify-center border-2 border-secondary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-text-primary">{passo.title}</h3>
                <p className="text-text-secondary text-sm max-w-xs">{passo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Pronto pra agendar seu próximo corte?</h2>
        <Link to="/register">
          <Button size="lg">Criar conta grátis</Button>
        </Link>
      </section>
    </div>
  )
}
