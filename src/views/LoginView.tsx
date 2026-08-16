import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { usuarioController } from '../controllers/usuarioController'

export default function LoginView() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@ifba.edu.br')
  const [senha, setSenha] = useState('123456')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      usuarioController.login({ email, senha })
      navigate('/home', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-400">IFBA</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Login</h1>
          <p className="mt-2 text-sm text-slate-400">Acesse o painel de funcionários</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            required
          />

          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Sua senha"
            required
          />

          {error ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
          <p className="font-medium text-slate-200">Usuário padrão</p>
          <p>E-mail: admin@ifba.edu.br</p>
          <p>Senha: 123456</p>
        </div>
      </div>
    </div>
  )
}
