import type { User } from 'firebase/auth'

export interface AuthContextType {
  token: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  image: string
}

export interface ApiResponse {
  results: Character[]
}

export interface CardItem {
  id: string
  characterId: number
  name: string
  image: string
  isFlipped: boolean
  isMatched: boolean
}

export type GamePhase = 'preview' | 'playing' | 'finished'
