import { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { funcionarioController } from '../controllers/funcionarioController'
import type Funcionario from '../models/Funcionario'

const emptyForm = {
  nome: '',
  sobrenome: '',
  dataNascimento: '',
  dataContratacao: '',
  dataDemissao: '',
}

const normalizeDateTime = (value: string | null | undefined) => {
  if (!value) return null
  return value.includes('T') ? value : `${value}T00:00:00`
}

const normalizeInputDateTime = (value: string | null | undefined) => {
  if (!value) return ''
  return value.includes('T') ? value.slice(0, 16) : value
}

export default function FuncionariosView() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchFuncionarios = async () => {
    try {
      setIsLoading(true)
      const dados = await funcionarioController.list()
      setFuncionarios(dados)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFuncionarios()
  }, [])

  const handleChange = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      nome: form.nome.trim(),
      sobrenome: form.sobrenome.trim(),
      dataNascimento: form.dataNascimento,
      dataContratacao: normalizeDateTime(form.dataContratacao),
      dataDemissao: normalizeDateTime(form.dataDemissao),
    }

    if (!payload.nome || !payload.sobrenome || !payload.dataNascimento || !payload.dataContratacao) {
      return
    }

    try {
      if (editingId !== null) {
        const updated = await funcionarioController.update(editingId, payload)
        setFuncionarios((current) => current.map((item) => (item.id === editingId ? updated : item)))
        setEditingId(null)
      } else {
        const created = await funcionarioController.create(payload)
        setFuncionarios((current) => [created, ...current])
      }

      setForm(emptyForm)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (funcionario: Funcionario) => {
    setEditingId(funcionario.id)
    setForm({
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      dataNascimento: funcionario.dataNascimento,
      dataContratacao: normalizeInputDateTime(funcionario.dataContratacao),
      dataDemissao: normalizeInputDateTime(funcionario.dataDemissao),
    })
  }

  const handleDelete = async (id: number) => {
    try {
      await funcionarioController.remove(id)
      setFuncionarios((current) => current.filter((funcionario) => funcionario.id !== id))
      if (editingId === id) {
        setEditingId(null)
        setForm(emptyForm)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">Funcionários</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Cadastro e gestão</h2>
          </div>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input label="Nome" value={form.nome} onChange={(e) => handleChange('nome', e.target.value)} placeholder="Nome" />
          <Input label="Sobrenome" value={form.sobrenome} onChange={(e) => handleChange('sobrenome', e.target.value)} placeholder="Sobrenome" />
          <Input label="Data de nascimento" type="date" value={form.dataNascimento} onChange={(e) => handleChange('dataNascimento', e.target.value)} />
          <Input label="Data de contratação" type="datetime-local" value={form.dataContratacao} onChange={(e) => handleChange('dataContratacao', e.target.value)} />
          <Input label="Data de demissão" type="datetime-local" value={form.dataDemissao} onChange={(e) => handleChange('dataDemissao', e.target.value)} />

          <div className="md:col-span-2 flex gap-3 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : editingId !== null ? 'Salvar alterações' : 'Adicionar funcionário'}
            </Button>
            {editingId !== null ? (
              <Button variant="secondary" onClick={() => { setEditingId(null); setForm(emptyForm) }}>
                Cancelar
              </Button>
            ) : null}
          </div>
        </form>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Nascimento</th>
                <th className="px-4 py-3 font-medium">Contratação</th>
                <th className="px-4 py-3 font-medium">Demissão</th>
                <th className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    Nenhum funcionário cadastrado.
                  </td>
                </tr>
              ) : (
                funcionarios.map((funcionario) => (
                  <tr key={funcionario.id} className="border-t border-slate-800">
                    <td className="px-4 py-3 text-white">{funcionario.nome} {funcionario.sobrenome}</td>
                    <td className="px-4 py-3">{funcionario.dataNascimento || '-'}</td>
                    <td className="px-4 py-3">{normalizeInputDateTime(funcionario.dataContratacao) || '-'}</td>
                    <td className="px-4 py-3">{normalizeInputDateTime(funcionario.dataDemissao) || '-'}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => handleEdit(funcionario)}>
                          Editar
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(funcionario.id)}>
                          Excluir
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
