import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from '../components/ui/StatCard'
import { funcionarioController } from '../controllers/funcionarioController'
import type Funcionario from '../models/Funcionario'

export default function HomeView() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const dados = await funcionarioController.list()
        setFuncionarios(dados)
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error)
      }
    }

    fetchFuncionarios()
  }, [])

  const totalFuncionarios = funcionarios.length

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600/20 via-slate-900 to-slate-950 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Dashboard</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Bem-vindo ao painel</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Gerencie os funcionários, acompanhe os dados e mantenha as operações do sistema organizadas.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/funcionarios"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Ver funcionários
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total de funcionários" value={String(totalFuncionarios)} description="Funcionários cadastrados no sistema" />
        <StatCard title="API" value="Spring Boot" description="Conectada em http://localhost:8080" />
        <StatCard title="Status" value="Online" description="Sistema operando normalmente" />
      </div>
    </div>
  )
}
