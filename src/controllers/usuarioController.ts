import Usuario from '../models/Usuario'

const STORAGE_KEY = 'lab2-usuarios'
const AUTH_KEY = 'lab2-auth-user'

const ensureSeedUsers = () => {
  if (typeof window === 'undefined') {
    return [] as Usuario[]
  }

  const users = localStorage.getItem(STORAGE_KEY)

  if (!users) {
    const seedUsers = [new Usuario(1, 'Admin', 'admin@ifba.edu.br', '123456')]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers))
    return seedUsers
  }

  return JSON.parse(users) as Usuario[]
}

const getUsers = (): Usuario[] => {
  if (typeof window === 'undefined') {
    return []
  }

  const storedUsers = localStorage.getItem(STORAGE_KEY)

  if (!storedUsers) {
    return ensureSeedUsers()
  }

  return JSON.parse(storedUsers) as Usuario[]
}

export const usuarioController = {
  getCurrentUser: () => {
    if (typeof window === 'undefined') {
      return null
    }

    const currentUser = localStorage.getItem(AUTH_KEY)
    return currentUser ? (JSON.parse(currentUser) as Usuario) : null
  },

  login: ({ email, senha }: { email: string; senha: string }) => {
    const usuarios = getUsers()
    const user = usuarios?.find(
      (usuario) =>
        usuario?.email.trim().toLowerCase() === email?.trim().toLowerCase() &&
        usuario?.senha === senha,
    )

    if (!user) {
      throw new Error('E-mail ou senha inválidos.')
    }

    const safeUser = {
      id: user?.id,
      nome: user?.nome,
      email: user?.email,
      senha: user?.senha,
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser))
    return safeUser
  },

  register: ({ nome, email, senha }: { nome: string; email: string; senha: string }) => {
    const usuarios = getUsers()
    const alreadyExists = usuarios?.some(
      (usuario) => usuario?.email.trim().toLowerCase() === email.trim().toLowerCase(),
    )

    if (alreadyExists) {
      throw new Error('Este e-mail já está cadastrado.')
    }

    const newUser = new Usuario(
      Date.now(),
      nome?.trim(),
      email?.trim(),
      senha,
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...usuarios, newUser]))
    return newUser
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
    }
  },

  isAuthenticated: () => Boolean(usuarioController?.getCurrentUser()),
}

ensureSeedUsers()
