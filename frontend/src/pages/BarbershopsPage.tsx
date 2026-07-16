import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Store, MapPin, Phone } from 'lucide-react'
import { useBarbeiro } from '../features/barbershop/model/useBarbeiro'
import { Card } from '../shared/ui/Card'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner'
import { ErrorMessage } from '../shared/ui/ErrorMessage'

export function BarbershopsPage() {
  const { barbearias, loading, error, listarBarbearias } = useBarbeiro()

  useEffect(() => {
    listarBarbearias()
  }, [listarBarbearias])

  return (
    <div className="min-h-screen bg-primary">
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Barbearias</h1>
        <p className="text-text-secondary mb-8">Escolha uma barbearia pra ver profissionais e serviços.</p>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && barbearias.length === 0 && (
          <div className="flex flex-col items-center text-center gap-3 py-16">
            <div className="w-14 h-14 rounded-full bg-secondary text-text-secondary flex items-center justify-center">
              <Store size={24} strokeWidth={1.75} />
            </div>
            <p className="text-text-secondary">Nenhuma barbearia cadastrada ainda.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbearias.map((barbearia) => (
            <Link key={barbearia.id} to={`/barbershops/${barbearia.id}`}>
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 hover:border-selected/30 transition-all">
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Store size={20} strokeWidth={1.75} />
                </div>
                <h2 className="font-semibold text-text-primary mb-2">{barbearia.name}</h2>
                <p className="text-text-secondary text-sm flex items-center gap-2 mb-1">
                  <MapPin size={14} strokeWidth={1.75} className="shrink-0" />
                  <span className="truncate">{barbearia.address}</span>
                </p>
                <p className="text-text-secondary text-sm flex items-center gap-2">
                  <Phone size={14} strokeWidth={1.75} className="shrink-0" />
                  {barbearia.phone}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
