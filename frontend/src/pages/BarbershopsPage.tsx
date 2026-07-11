import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        <h1 className="text-3xl font-bold text-text-primary mb-8">Barbearias</h1>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && barbearias.length === 0 && (
          <p className="text-text-secondary">Nenhuma barbearia cadastrada ainda.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbearias.map((barbearia) => (
            <Link key={barbearia.id} to={`/barbershops/${barbearia.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <h2 className="font-semibold text-text-primary mb-1">{barbearia.name}</h2>
                <p className="text-text-secondary text-sm">{barbearia.address}</p>
                <p className="text-text-secondary text-sm">{barbearia.phone}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
