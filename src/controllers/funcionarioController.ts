import { API_BASE_URL } from '../config/api'
import Funcionario from '../models/Funcionario'

export const funcionarioController = {
  list: async (): Promise<Funcionario[]> => {
    const response = await fetch(`${API_BASE_URL}/funcionarios`)

    if (!response.ok) {
      throw new Error('Erro ao buscar funcionários.')
    }

    return response.json() as Promise<Funcionario[]>
  },

  create: async (payload: Omit<Funcionario, 'id'>) => {
    const response = await fetch(`${API_BASE_URL}/funcionarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    console.log(response);
    if (!response.ok) {
      throw new Error('Erro ao cadastrar funcionário.')
    }

    return response.json() as Promise<Funcionario>
  },

  update: async (id: number, payload: Partial<Funcionario>) => {
    const response = await fetch(`${API_BASE_URL}/funcionarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar funcionário.')
    }

    return response.json() as Promise<Funcionario>
  },

  remove: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/funcionarios/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Erro ao excluir funcionário.')
    }

    return true
  },
}
