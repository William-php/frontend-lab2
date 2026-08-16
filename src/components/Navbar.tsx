import { NavLink, useNavigate } from 'react-router-dom'
import { usuarioController } from '../controllers/usuarioController'

const navItems = [
  { to: '/home', label: 'Home' },
  { to: '/funcionarios', label: 'Funcionários' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const user = usuarioController.getCurrentUser()

  const handleLogout = () => {
    usuarioController.logout()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return null
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-blue-400">IFBA</p>
          <h1 className="text-xl font-bold text-white">Gestão de Funcionários</h1>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-lg px-4 py-2 text-sm font-medium transition',
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-300 sm:inline-flex">
            {user.nome}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-red-500 hover:text-red-300"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
