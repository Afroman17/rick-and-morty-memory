import axios from 'axios'
import { auth } from '../lib/firebase'
import { Routes } from '../utils'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// Request interceptor: adjunta el Firebase JWT en cada petición
apiClient.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: redirige al login ante un 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = Routes.Login
    }
    return Promise.reject(error)
  }
)
