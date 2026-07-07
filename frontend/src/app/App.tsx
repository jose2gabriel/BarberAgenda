import { useState } from 'react'
import { Button } from '../shared/ui/Button'
import { Input } from '../shared/ui/Input'
import { Card } from '../shared/ui/Card'

function App() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-sm flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Design System</h1>
          <p className="text-text-secondary text-sm">Barber Agenda — componentes base</p>
        </div>

        <Input
          label="E-mail"
          type="email"
          placeholder="voce@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input label="Senha" type="password" placeholder="••••••••" error="Senha obrigatória" />

        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Entrar</Button>
          <Button variant="secondary">Cadastrar</Button>
          <Button variant="danger">Excluir</Button>
          <Button variant="primary" loading>
            Enviando
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default App
